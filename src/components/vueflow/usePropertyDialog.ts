/*
  File: usePropertyDialog.ts

  About:
  This code defines a composable that handles the state and actions of a property dialog in a Vue application, specifically for nodes, edges, and the background in a flow diagram.
  The dialog can be opened with context-specific titles and content depending on the element being interacted with (node, edge, or background).

  The dialog's state includes properties such as whether the dialog is open, its title, the current item being edited, and more.
*/

import { ref, computed, watch } from 'vue' // Import Vue's ref and computed for reactive state management
import type { ComputedRef } from 'vue' // Import Vue's computed type for type checking
import type { CustomNode, CustomEdge, PropertyDialogState } from './types' // Import types for custom node, edge, and dialog state
import { setKeyboardScope } from '@/utils/keyboardManager'

// Initialize the state object that manages the dialog's state, such as whether it is open and what item is being edited.
const state = ref<PropertyDialogState>({
  isOpen: false, // Dialog is initially closed
  type: null, // Type of the item (node, edge, or background) being edited
  title: '', // Title for the dialog
  itemId: null, // ID of the current item (node/edge) being edited
  settings: {}, // Settings associated with the current item
  logic: { code: '', language: 'python', uploadedFiles: [] },
  localItem: null, // The actual item (node/edge) being edited
  output: null // Output associated with the current item
})

// This function handles opening the property dialog based on the item (node/edge) clicked by the user.
export function usePropertyDialog(): {
  openPropertyDialog: (event: any) => void
  closeDialog: () => void
  updateItem: (updates: Partial<CustomNode | CustomEdge>) => void
  isDialogOpen: ComputedRef<boolean>
  dialogTitle: ComputedRef<string>
  dialogType: ComputedRef<'node' | 'edge' | 'background' | null>
  currentItem: ComputedRef<CustomNode | CustomEdge | null>
} {
  /**
   * Opens the property dialog for either a node, edge, or background based on the event data.
   *
   * @param event - The event that triggered the dialog opening, containing either a node or edge object.
   */
  const openPropertyDialog = (event: any) => {
    // If a node is clicked, open the dialog with node-specific information
    if (event.node) {
      const node = event.node as CustomNode
      state.value.isOpen = true
      state.value.title = (node.data?.label || `Node ${node.id}`) as string
      state.value.type = 'node'
      state.value.localItem = node
    }
    // If an edge is clicked, open the dialog with edge-specific information
    else if (event.edge) {
      const edge = event.edge as CustomEdge
      state.value.isOpen = true
      state.value.title = (edge.data?.label || edge.label || `Edge ${edge.id}`) as string
      state.value.type = 'edge'
      state.value.localItem = edge
    }
    // If the background is clicked, open the dialog for the background
    else {
      state.value.isOpen = true
      state.value.title = 'Canvas Background'
      state.value.type = 'background'
      state.value.localItem = null
    }
    // Switch keyboard scope to dialog mode
    setKeyboardScope('dialog')
  }

  /**
   * Closes the property dialog by setting the `isOpen` state to false.
   */
  const closeDialog = () => {
    state.value.isOpen = false
    // Restore global keyboard shortcut scope
    setKeyboardScope('global')
  }

  /**
   * Updates the current item (node or edge) with the provided updates.
   *
   * @param updates - The updates to apply to the current item. This will be a partial object of either a node or edge.
   */
  const updateItem = (updates: Partial<CustomNode | CustomEdge>) => {
    if (state.value.localItem) {
      Object.assign(state.value.localItem, updates) // Update the item with the provided updates
    }
  }

  // Reactive computed properties for easier access to the dialog state
  const isDialogOpen = computed(() => state.value.isOpen) // Whether the dialog is open
  const dialogTitle = computed(() => state.value.title) // The title of the dialog
  const dialogType = computed(() => state.value.type) // The type of the item being edited (node, edge, or background)
  const currentItem = computed(() => state.value.localItem) // The current item (node/edge) being edited

  /**
   * Automatically update keyboard scope when dialog opens/closes
   */
  watch(
    () => state.value.isOpen,
    (isOpen) => {
      setKeyboardScope(isOpen ? 'dialog' : 'global')
    }
  )

  // Return all the methods and computed properties
  return {
    openPropertyDialog, // Function to open the dialog based on item type
    closeDialog, // Function to close the dialog
    updateItem, // Function to update the current item
    isDialogOpen, // Computed property for dialog open state
    dialogTitle, // Computed property for dialog title
    dialogType, // Computed property for the type of item being edited
    currentItem // Computed property for the current item being edited
  }
}
