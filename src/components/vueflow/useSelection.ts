/*
  File: useSelection.ts

  About:
  This code defines a composable called `useSelection` that manages user selection of nodes and edges within a flow chart or diagram.
  The function keeps track of which nodes and edges are selected by the user and allows for toggling selection on and off.
  It exposes the selected nodes and edges as reactive references, as well as functions to handle the selection events.

  The composable is designed to be used in a Vue.js component where users can select or deselect nodes and edges from a flowchart-like UI.
*/

import { ref } from 'vue' // Importing ref from Vue for managing reactive state

/**
 * Composable to handle the selection of nodes and edges in a flow chart.
 *
 * @returns An object containing:
 *  - `selectedNodes`: Reactive reference to an array of selected node IDs.
 *  - `selectedEdges`: Reactive reference to an array of selected edge IDs.
 *  - `onNodeSelect`: Function to handle node selection events.
 *  - `onEdgeSelect`: Function to handle edge selection events.
 */
export function useSelection() {
  // Reactive arrays to store the IDs of selected nodes and edges
  const selectedNodes = ref<string[]>([]) // Holds the IDs of selected nodes
  const selectedEdges = ref<string[]>([]) // Holds the IDs of selected edges

  // Type for the node selection event
  type NodeSelectEvent = { node: { id: string } }

  /**
   * Handles node selection and toggles the node's selection state.
   * If the node is already selected, it will be deselected. Otherwise, it will be selected.
   *
   * @param event - The event triggered when a node is selected.
   */
  const onNodeSelect = (event: NodeSelectEvent) => {
    const nodeId = event.node.id // Get the ID of the selected node
    const index = selectedNodes.value.findIndex((id) => id === nodeId) // Check if the node is already selected

    if (index > -1) {
      // If the node is already selected, remove it from the selected nodes array
      selectedNodes.value.splice(index, 1)
    } else {
      // If the node is not selected, add it to the selected nodes array
      selectedNodes.value.push(nodeId)
    }
  }

  // Type for the edge selection event
  type EdgeSelectEvent = { edge: { id: string } }

  /**
   * Handles edge selection and toggles the edge's selection state.
   * If the edge is already selected, it will be deselected. Otherwise, it will be selected.
   *
   * @param event - The event triggered when an edge is selected.
   */
  const onEdgeSelect = (event: EdgeSelectEvent) => {
    const edgeId = event.edge.id // Get the ID of the selected edge
    const index = selectedEdges.value.findIndex((id) => id === edgeId) // Check if the edge is already selected

    if (index > -1) {
      // If the edge is already selected, remove it from the selected edges array
      selectedEdges.value.splice(index, 1)
    } else {
      // If the edge is not selected, add it to the selected edges array
      selectedEdges.value.push(edgeId)
    }
  }

  // Returning the reactive references and the functions for selection
  return {
    selectedNodes, // Array of selected node IDs
    selectedEdges, // Array of selected edge IDs
    onNodeSelect, // Function to handle node selection events
    onEdgeSelect // Function to handle edge selection events
  }
}
