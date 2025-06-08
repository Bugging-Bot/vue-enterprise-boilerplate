/**
 * @file useVueFlowState.ts
 * @description
 *   This composable manages local UI state for the VueFlow-based diagram editor.
 *   It encapsulates state and utility functions related to:
 *   - Currently selected or active item (node or edge)
 *   - Property dialog visibility and content
 *
 *   The state is designed to work with both `CustomNode` and `CustomEdge` entities,
 *   providing flexibility for editor interactions.
 */

import { ref, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import type { CustomNode, CustomEdge, PropertyDialogState } from './types'

/**
 * @function useVueFlowState
 * @returns Object containing reactive state and utility methods for managing VueFlow editor state.
 */
export function useVueFlowState(): {
  localItem: Ref<CustomNode | CustomEdge | null>
  dialogState: Ref<PropertyDialogState>
  hasLocalItem: ComputedRef<boolean>
  setLocalItem: (item: CustomNode | CustomEdge | null) => void
  clearLocalItem: () => void
} {
  /**
   * Reactive reference to the currently selected node or edge.
   * Used to temporarily store the item being edited or viewed.
   */
  const localItem = ref<CustomNode | CustomEdge | null>(null)

  /**
   * Reactive reference to the dialog state used for property panels.
   * Controls dialog visibility, content, and context such as type and ID.
   */
  const dialogState = ref<PropertyDialogState>({
    isOpen: false, // Whether the dialog is open
    type: null, // Type of item being edited (node, edge, background)
    title: '', // Dialog title
    itemId: null, // ID of the item being edited
    settings: {}, // Settings specific to the node/edge
    logic: {
      // Code or logic-related settings
      code: '',
      language: 'python',
      uploadedFiles: []
    },
    localItem: null, // Optional reference to a local item in the dialog
    output: null // Output result if any, possibly from node computation
  })

  /**
   * Computed boolean indicating whether a local item is currently selected.
   */
  const hasLocalItem = computed(() => localItem.value !== null)

  /**
   * Sets the local item state to the given node or edge.
   * @param item - A `CustomNode`, `CustomEdge`, or `null`
   */
  const setLocalItem = (item: CustomNode | CustomEdge | null) => {
    localItem.value = item
  }

  /**
   * Clears the local item state by setting it to null.
   */
  const clearLocalItem = () => {
    localItem.value = null
  }

  // Return the full API for consumers of this composable
  return {
    localItem, // Reactive reference to selected node/edge
    dialogState, // Reactive reference to the property dialog state
    hasLocalItem, // Computed property to check item presence
    setLocalItem, // Method to set the current item
    clearLocalItem // Method to clear the current item
  }
}
