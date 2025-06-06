import { ref } from 'vue'
/*
Exporting a function named useSelection() which is responsible for managing user selection of nodes and edges in a flow chart. This function will be used by other components to get access to these selections.
*/
export function useSelection() {
  // to store arrays that hold ids of selected nodes/edges respectively.
  const selectedNodes = ref<string[]>([])
  const selectedEdges = ref<string[]>([])
  // defining type of node selection events
  type NodeSelectEvent = { node: { id: string } }
  // function responsible for handling node selection events
  const onNodeSelect = (event: NodeSelectEvent) => {
    const nodeId = event.node.id
    const index = selectedNodes.value.findIndex((id) => id === nodeId)
    if (index > -1) {
      selectedNodes.value.splice(index, 1)
    } else {
      selectedNodes.value.push(nodeId)
    }
  }
  // defining type of edge selection events
  type EdgeSelectEvent = { edge: { id: string } }
  // function responsible for handling edge selection events
  const onEdgeSelect = (event: EdgeSelectEvent) => {
    const edgeId = event.edge.id
    const index = selectedEdges.value.findIndex((id) => id === edgeId)
    if (index > -1) {
      selectedEdges.value.splice(index, 1)
    } else {
      selectedEdges.value.push(edgeId)
    }
  }

  return {
    selectedNodes,
    selectedEdges,
    onNodeSelect,
    onEdgeSelect
  }
}
