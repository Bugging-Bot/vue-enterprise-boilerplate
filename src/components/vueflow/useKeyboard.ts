/*
  File: useKeyboard.ts

  About:
  This code provides a composable that listens for keyboard events (Delete and Backspace) and handles the deletion of selected nodes and edges in a VueFlow graph.
  The functionality is implemented using the `@vue-flow/core` library to manipulate the nodes and edges in the flow builder environment.
*/

import { onMounted, onUnmounted } from 'vue' // Import lifecycle hooks from Vue
import { registerShortcut, unregisterShortcut, setKeyboardScope } from '@/utils/keyboardManager'
import { useVueFlow } from '@vue-flow/core' // Import VueFlow core functions
import type { Node, Edge } from '@vue-flow/core' // Import types for Node and Edge

/**
 * Composable for handling keyboard deletion of selected VueFlow nodes and edges using scoped hotkeys.
 */
export function useKeyboard() {
  const { removeNodes, removeEdges, getSelectedNodes, getSelectedEdges } = useVueFlow()

  // Core deletion logic extracted into a reusable function
  const deleteSelected = () => {
    const selectedNodes = getSelectedNodes.value
    const selectedEdges = getSelectedEdges.value

    const nodeIds = selectedNodes.map((node) => node.id)
    const edgeIds = selectedEdges.map((edge) => edge.id)

    if (nodeIds.length > 0) {
      removeNodes(nodeIds)
      console.log(`Deleted ${nodeIds.length} node(s):`, nodeIds)
    }

    if (edgeIds.length > 0) {
      removeEdges(edgeIds)
      console.log(`Deleted ${edgeIds.length} edge(s):`, edgeIds)
    }

    if (nodeIds.length === 0 && edgeIds.length === 0) {
      console.log('No nodes or edges selected for deletion')
    }
  }
  const canDelete = () => getSelectedNodes.value.length > 0 || getSelectedEdges.value.length > 0

  onMounted(() => {
    // Set global keyboard shortcut scope
    setKeyboardScope('global')

    // Register Delete and Backspace in the global scope
    registerShortcut(
      'del, backspace',
      (event) => {
        event.preventDefault()
        deleteSelected()
      },
      'global'
    )
  })

  onUnmounted(() => {
    unregisterShortcut('del, backspace', 'global')
  })

  return {
    deleteSelected,
    canDelete
  }
}
// /*
//  * @returns An object with methods for handling keydown events, deleting selected elements, and checking if deletion is possible.
//  */
// export function keyboardListener() {
//   // Extract necessary functions from VueFlow to manage nodes and edges
//   const { removeNodes, removeEdges, getSelectedNodes, getSelectedEdges } = useVueFlow()

//   /**
//    * Handles keyboard events (Delete and Backspace keys) for deleting selected nodes and edges.
//    * When the Delete or Backspace key is pressed, it deletes any selected nodes or edges.
//    *
//    * @param {KeyboardEvent} event - The keyboard event triggered by a key press.
//    */
//   const handleKeyDown = (event: KeyboardEvent) => {
//     // Check if Delete or Backspace key is pressed
//     if (event.key === 'Delete' || event.key === 'Backspace') {
//       // Prevent default behavior (e.g., prevent back navigation on Backspace)
//       event.preventDefault()

//       // Get the currently selected nodes and edges
//       const selectedNodes = getSelectedNodes.value
//       const selectedEdges = getSelectedEdges.value

//       // If there are selected nodes, delete them
//       if (selectedNodes.length > 0) {
//         const nodeIds = selectedNodes.map((node: Node) => node.id) // Map node objects to their ids
//         removeNodes(nodeIds) // Remove nodes by id
//         console.log(`Deleted ${nodeIds.length} node(s):`, nodeIds) // Log deleted nodes
//       }

//       // If there are selected edges, delete them
//       if (selectedEdges.length > 0) {
//         const edgeIds = selectedEdges.map((edge: Edge) => edge.id) // Map edge objects to their ids
//         removeEdges(edgeIds) // Remove edges by id
//         console.log(`Deleted ${edgeIds.length} edge(s):`, edgeIds) // Log deleted edges
//       }

//       // Log a message if no nodes or edges were selected
//       if (selectedNodes.length === 0 && selectedEdges.length === 0) {
//         console.log('No nodes or edges selected for deletion') // Log if nothing is selected
//       }
//     }
//   }

//   /**
//    * Adds a keydown event listener when the component is mounted.
//    * The listener will trigger the `handleKeyDown` function when a key is pressed.
//    */
//   onMounted(() => {
//     document.addEventListener('keydown', handleKeyDown)
//   })

//   /**
//    * Removes the keydown event listener when the component is unmounted.
//    * This helps clean up the event listener to avoid memory leaks.
//    */
//   onUnmounted(() => {
//     document.removeEventListener('keydown', handleKeyDown)
//   })

//   /**
//    * Manually delete selected nodes and edges.
//    * This function can be called programmatically to delete selected items.
//    *
//    * @returns An object containing the count of deleted nodes and edges.
//    */
//   const deleteSelected = () => {
//     // Get the currently selected nodes and edges
//     const selectedNodes = getSelectedNodes.value
//     const selectedEdges = getSelectedEdges.value

//     const deletedItems = {
//       nodes: 0,
//       edges: 0
//     }

//     // Delete selected nodes if any
//     if (selectedNodes.length > 0) {
//       const nodeIds = selectedNodes.map((node: Node) => node.id) // Extract node ids
//       removeNodes(nodeIds) // Remove nodes by id
//       deletedItems.nodes = nodeIds.length // Update the count of deleted nodes
//     }

//     // Delete selected edges if any
//     if (selectedEdges.length > 0) {
//       const edgeIds = selectedEdges.map((edge: Edge) => edge.id) // Extract edge ids
//       removeEdges(edgeIds) // Remove edges by id
//       deletedItems.edges = edgeIds.length // Update the count of deleted edges
//     }

//     return deletedItems // Return an object with the count of deleted nodes and edges
//   }

//   /**
//    * Checks if there are any selected nodes or edges that can be deleted.
//    * This method is useful for determining if the deletion actions can be triggered.
//    *
//    * @returns {boolean} - True if there are selected nodes or edges, otherwise false.
//    */
//   const canDelete = () => {
//     // Check if there are any selected nodes or edges
//     const selectedNodes = getSelectedNodes.value
//     const selectedEdges = getSelectedEdges.value
//     return selectedNodes.length > 0 || selectedEdges.length > 0
//   }

//   // Return the functions that allow deletion and check for deletable elements
//   return {
//     deleteSelected, // Function to delete selected nodes and edges
//     canDelete, // Function to check if deletion is possible
//     handleKeyDown // Function to handle keydown events for deletion
//   }
// }
