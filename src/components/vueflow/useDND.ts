/*
  File: useDND.ts

  About:
  This custom composition function `useDragAndDrop` is responsible for managing drag-and-drop functionality in a Vue Flow-based flow editor.
  It handles the logic for dragging nodes, handling drop events, updating node positions, and maintaining the state of the drag action.
  This function provides reactive state and methods for managing drag events, node creation, and UI behavior during drag interactions.
*/

import { useVueFlow, type Node, type XYPosition } from '@vue-flow/core' // Import Vue Flow hooks and types for managing the flow editor.
import { ref, watch, type Ref } from 'vue' // Import Vue’s `ref` for creating reactive state and `watch` for side-effects.

let id = 0

/**
 * Generates a unique ID for each node created during drag-and-drop.
 *
 * @returns {string} - A unique ID.
 */
function getId(): string {
  return `dndnode_${id++}`
}

/**
 * Interface representing the reactive state for drag-and-drop functionality.
 */
interface DragAndDropState {
  draggedType: Ref<string | null> // The type of the dragged node.
  isDragOver: Ref<boolean> // Boolean indicating whether the dragged node is over a drop target.
  isDragging: Ref<boolean> // Boolean indicating whether a drag operation is currently ongoing.
}

/**
 * Reactive state for tracking drag-and-drop behavior.
 */
const state: DragAndDropState = {
  draggedType: ref<string | null>(null), // Tracks the type of the dragged node.
  isDragOver: ref(false), // Tracks whether the dragged node is currently over a valid drop target.
  isDragging: ref(false) // Tracks whether the drag operation is active.
}

export default function useDragAndDrop() {
  const { draggedType, isDragOver, isDragging } = state
  const { addNodes, screenToFlowCoordinate, onNodesInitialized, updateNode } = useVueFlow() // Destructure Vue Flow hooks for node management.

  // Watcher to disable text selection when dragging is in progress.
  watch(isDragging, (dragging) => {
    document.body.style.userSelect = dragging ? 'none' : '' // Disable user selection to prevent unwanted selection during drag.
  })

  /**
   * Handles the start of a drag operation.
   *
   * @param {DragEvent} event - The drag event.
   * @param {string} type - The type of node being dragged.
   */
  function onDragStart(event: DragEvent, type: string) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('application/vueflow', type) // Store the node type in dataTransfer.
      event.dataTransfer.effectAllowed = 'move' // Allow moving the element.
    }

    draggedType.value = type // Set the dragged type.
    isDragging.value = true // Mark that dragging is in progress.

    // Add event listener for when the drag ends.
    document.addEventListener('drop', onDragEnd)
  }

  /**
   * Handles the drag over event.
   * This is triggered when the dragged item is over a potential drop target.
   *
   * @param {DragEvent} event - The drag event.
   */
  function onDragOver(event: DragEvent) {
    event.preventDefault() // Prevent default behavior to allow for dropping.

    if (draggedType.value) {
      isDragOver.value = true // Indicate that the dragged node is over a valid drop target.

      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move' // Set the drop effect to "move."
      }
    }
  }

  /**
   * Handles the drag leave event.
   * This is triggered when the dragged item leaves a potential drop target.
   */
  function onDragLeave() {
    isDragOver.value = false // Indicate that the dragged node is no longer over a drop target.
  }

  /**
   * Handles the end of a drag operation.
   * This is triggered when the drag operation is completed (whether dropped or cancelled).
   */
  function onDragEnd() {
    isDragging.value = false // Mark the drag operation as ended.
    isDragOver.value = false // Indicate that the dragged node is not over a drop target anymore.
    draggedType.value = null // Clear the dragged node type.
    document.removeEventListener('drop', onDragEnd) // Remove the event listener for drop.
  }

  /**
   * Handles the drop event.
   * This is triggered when the dragged item is dropped onto a valid target.
   *
   * @param {DragEvent} event - The drag event.
   */
  function onDrop(event: DragEvent) {
    const position: XYPosition = screenToFlowCoordinate({
      x: event.clientX, // Get the x-coordinate of the mouse at the drop location.
      y: event.clientY // Get the y-coordinate of the mouse at the drop location.
    })

    const nodeId = getId() // Generate a unique node ID for the new node.

    // Create the new node with the dragged type and the dropped position.
    const newNode: Node = {
      id: nodeId,
      type: draggedType.value ?? 'default', // Use the dragged type or default to 'default' if no type is set.
      position,
      data: { label: nodeId } // Set the node label as its ID for simplicity.
    }

    /**
     * Align the node's position after it has been added to the flow,
     * so that it is centered around the mouse's drop location.
     *
     * The event listener is removed after the node is initialized.
     */
    const { off } = onNodesInitialized(() => {
      updateNode(nodeId, (node) => ({
        position: {
          x: node.position.x - (node.dimensions?.width ?? 0) / 2, // Adjust the x-position based on node width.
          y: node.position.y - (node.dimensions?.height ?? 0) / 2 // Adjust the y-position based on node height.
        }
      }))

      off() // Remove the event listener after the update.
    })

    // Add the new node to the flow.
    addNodes(newNode)
  }

  // Return the reactive states and methods to be used in the component.
  return {
    draggedType,
    isDragOver,
    isDragging,
    onDragStart,
    onDragLeave,
    onDragOver,
    onDrop
  }
}
