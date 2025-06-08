/*
  File: useDragAndDrop.ts

  About:
  This custom composition function `useDragAndDrop` handles basic drag-and-drop functionality. It allows for managing the drag start and drag end events,
  and tracks the type of the node being dragged. This function is primarily used in flow builders, where nodes or components can be dragged and dropped.

  The code is designed to work with the `dataTransfer` API to manage drag data and manage the state of the dragged node type.
*/

import { ref } from 'vue' // Import Vue's `ref` function to create reactive state.

export default function useDragAndDrop() {
  // Reactive state to hold the type of the node being dragged.
  // This value will be set during the drag start event and cleared when the drag ends.
  const draggedType = ref<string | null>(null)

  /**
   * Handles the start of the drag operation.
   * This function is triggered when the user starts dragging a node.
   * It stores the node type in the `dataTransfer` object and updates the reactive `draggedType` state.
   *
   * @param {DragEvent} event - The drag event triggered when the user starts dragging.
   * @param {string} nodeType - The type of the node being dragged (e.g., 'input', 'output', etc.).
   */
  const onDragStart = (event: DragEvent, nodeType: string) => {
    if (event.dataTransfer) {
      draggedType.value = nodeType // Set the node type that is being dragged.
      event.dataTransfer.setData('application/vueflow', nodeType) // Store the node type in the drag's dataTransfer.
      event.dataTransfer.effectAllowed = 'move' // Indicate that the move effect is allowed (node can be moved).
    }
  }

  /**
   * Handles the end of the drag operation.
   * This function is triggered when the user finishes dragging a node, either by dropping or cancelling the drag.
   * It clears the `draggedType` state, resetting the drag state.
   */
  const onDragEnd = () => {
    draggedType.value = null // Clear the dragged type after the drag operation ends.
  }

  // Return the reactive state and event handlers to be used in the component.
  return {
    draggedType, // The type of the node being dragged.
    onDragStart, // Method to handle the start of a drag operation.
    onDragEnd // Method to handle the end of a drag operation.
  }
}
