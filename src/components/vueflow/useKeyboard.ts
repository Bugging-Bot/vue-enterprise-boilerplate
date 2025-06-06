/*
This code handel all the keyboard events for chart like
1: Deleting selected nodes and edges in the VueFlow component.
*/
import { onMounted, onUnmounted } from 'vue'
import { useVueFlow } from '@vue-flow/core'
import type { Node, Edge } from '@vue-flow/core'

/**
 * Composable for handling keyboard deletion of selected VueFlow nodes and edges
 * Listens for Delete and Backspace key presses to remove selected elements
 */
export function keyboardListener() {
  const { removeNodes, removeEdges, getSelectedNodes, getSelectedEdges } = useVueFlow()

  /**
   * Handles keyboard events for deleting selected nodes and edges
   * @param event - KeyboardEvent from keydown listener
   */
  const handleKeyDown = (event: KeyboardEvent) => {
    // Check if Delete or Backspace key is pressed
    if (event.key === 'Delete' || event.key === 'Backspace') {
      // Prevent default browser behavior (like going back in history for Backspace)
      event.preventDefault()

      // Get currently selected nodes and edges
      const selectedNodes = getSelectedNodes.value
      const selectedEdges = getSelectedEdges.value

      // Delete selected nodes if any
      if (selectedNodes.length > 0) {
        const nodeIds = selectedNodes.map((node: Node) => node.id)
        removeNodes(nodeIds)
        console.log(`Deleted ${nodeIds.length} node(s):`, nodeIds)
      }

      // Delete selected edges if any
      if (selectedEdges.length > 0) {
        const edgeIds = selectedEdges.map((edge: Edge) => edge.id)
        removeEdges(edgeIds)
        console.log(`Deleted ${edgeIds.length} edge(s):`, edgeIds)
      }

      // Log if nothing was selected
      if (selectedNodes.length === 0 && selectedEdges.length === 0) {
        console.log('No nodes or edges selected for deletion')
      }
    }
  }

  /**
   * Adds keyboard event listener when component is mounted
   */
  onMounted(() => {
    document.addEventListener('keydown', handleKeyDown)
  })

  /**
   * Removes keyboard event listener when component is unmounted
   */
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown)
  })

  /**
   * Manual deletion function that can be called programmatically
   * @returns Object with methods to delete selected elements
   */
  const deleteSelected = () => {
    const selectedNodes = getSelectedNodes.value
    const selectedEdges = getSelectedEdges.value

    const deletedItems = {
      nodes: 0,
      edges: 0
    }

    if (selectedNodes.length > 0) {
      const nodeIds = selectedNodes.map((node: Node) => node.id)
      removeNodes(nodeIds)
      deletedItems.nodes = nodeIds.length
    }

    if (selectedEdges.length > 0) {
      const edgeIds = selectedEdges.map((edge: Edge) => edge.id)
      removeEdges(edgeIds)
      deletedItems.edges = edgeIds.length
    }

    return deletedItems
  }

  /**
   * Check if there are any selected elements that can be deleted
   * @returns boolean indicating if deletion is possible
   */
  const canDelete = () => {
    const selectedNodes = getSelectedNodes.value
    const selectedEdges = getSelectedEdges.value
    return selectedNodes.length > 0 || selectedEdges.length > 0
  }

  return {
    deleteSelected,
    canDelete,
    handleKeyDown
  }
}
