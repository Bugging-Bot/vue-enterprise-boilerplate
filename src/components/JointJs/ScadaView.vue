<!--
  SCADA View Component
  Provides a visual interface for industrial process control using JointJS
  Displays interactive elements like tanks, pumps, and valves with real-time updates
-->

<template>
  <div ref="paperContainer" style="width: 100%; height: 100%; border: 2px solid red"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CreateLayout } from './composables/LayoutFactory'
import { LinkFactory } from './shape/LinkFactory'
import { Tank, Pump } from './shapes'
import { addShapeToGraph } from './utils/shapeUtils'
import ShapeInfoDrawer from './components/ShapeInfoDrawer.vue'
import * as joint from '@joint/core'

const width = 800 // Set the desired width
const height = 600 // Set the desired height
const gridSize = 20 // Set the desired grid size (use 0 or negative to disable grid)
let customAttributes = {
  sn: '',
  assetid: '',
  location: '',
  description: ''
}

onMounted(() => {
  const { paper, graph } = CreateLayout(width, height, gridSize)
  // Add shapes to the graph (example)
  const tank = new Tank() // Assuming Tank is a valid JointJS shape
  const pump = new Pump() // Assuming Pump is a valid JointJS shape

  // Add shapes to the graph (example)
  addShapeToGraph(tank, graph, { x: 100, y: 100 })
  addShapeToGraph(pump, graph, { x: 300, y: 100 })

  paper.on('element:pointerclick', (elementView) => {
    selectedShape.value = elementView.model as joint.dia.Element<
      joint.dia.Element.Attributes,
      joint.dia.ModelSetOptions
    >
    showDrawer.value = true
  })
})
const handleShapeAction = (action: any) => {
  // Handle shape actions
  if (action === 'delete' && selectedShape.value) {
    selectedShape.value.remove()
    showDrawer.value = false
    selectedShape.value = null
  }
}
</script>

<style scoped></style>
