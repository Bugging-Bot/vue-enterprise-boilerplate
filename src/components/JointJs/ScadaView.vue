<!--
  SCADA View Component
  Provides a visual interface for industrial process control using JointJS
  Displays interactive elements like tanks, pumps, and valves with real-time updates
-->

<script setup lang="ts">
import { onMounted } from 'vue'
import { usePaper } from './composables/usePaper'
import { Tank } from './shapes'
import { addShapeToGraph } from './utils/shapeUtils'
import { setupPaperEvents } from './utils/eventHandlers'

// Initialize paper setup composable
const { setupPaper } = usePaper()

onMounted(() => {
  // Create JointJS paper and graph instances
  const { graph, paper } = setupPaper('jointjs-container')

  // Initialize tank shape and add to graph
  const tank = new Tank()
  addShapeToGraph(tank, graph, { x: 100, y: 200 })

  // Setup paper-level event handlers
  setupPaperEvents(paper)
})
</script>

<template>
  <div id="jointjs-container" class="border rounded shadow-md"></div>
</template>

<style scoped>
#jointjs-container {
  border: 1px solid #ddd;
  width: 800px;
  height: 500px;
}
</style>
