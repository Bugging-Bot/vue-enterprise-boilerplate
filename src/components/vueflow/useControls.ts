import { useVueFlow } from '@vue-flow/core'
// to manage controls and actions on selected nodes and edges.
export function useControls() {
  const { toObject, fitView, zoomIn, zoomOut } = useVueFlow()

  const logToObject = () => {
    console.log(toObject())
  }

  return {
    toObject,
    fitView,
    zoomIn,
    zoomOut,
    logToObject
  }
}
