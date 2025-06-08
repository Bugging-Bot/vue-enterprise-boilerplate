/*
  File: useControls.ts

  About:
  This custom composition function `useControls` is designed to manage various controls and actions in a Vue Flow-based flow editor.
  It provides functions to manage zoom, view transformations, dark mode toggling, node positioning, and logging the state of the flow editor.
  It is responsible for interacting with the Vue Flow API and handling common user actions.

  It returns a set of utility functions and reactive state that can be used within the Vue components.
*/

import { useVueFlow } from '@vue-flow/core' // Import Vue Flow hooks to interact with the flow editor.
import { ref } from 'vue' // Import Vue's `ref` to create reactive state.

export function useControls() {
  // Destructure necessary functions from Vue Flow API.
  const { toObject, fitView, zoomIn, zoomOut } = useVueFlow()

  // Reactive state for dark mode.
  const dark = ref(false)

  // Toggle dark mode on or off and update the body's class list accordingly.
  const toggleDarkMode = () => {
    dark.value = !dark.value
    document.body.classList.toggle('dark-mode', dark.value)
  }

  // Reset the view to fit all elements inside the viewport.
  const resetTransform = () => {
    fitView() // Fit the view to show all nodes and edges.
  }

  // Dummy function to simulate updating positions of nodes (e.g., shuffle nodes).
  const updatePos = () => {
    console.log('Updating node positions...') // Placeholder functionality.
  }

  // Log the current state of the flow editor to the console as an object.
  const logToObject = () => {
    console.log(toObject()) // Log the entire flow state.
  }

  // Return the methods and reactive state for use in components.
  return {
    toObject,
    fitView,
    zoomIn,
    zoomOut,
    logToObject,
    resetTransform,
    toggleDarkMode,
    updatePos,
    dark
  }
}
