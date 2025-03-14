<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import * as joint from 'jointjs'

// Refs for power and DOM elements
const powerLevel = ref(50) // Initial power level
const paperContainer = ref<HTMLDivElement | null>(null) // Vue ref for the container

// JointJS elements
let graph: joint.dia.Graph
let paper: joint.dia.Paper
let generator: joint.dia.Element
let bulb: joint.dia.Element
let wire: joint.dia.Link
let animationInterval: number | null = null

// Function to update animations
const updateAnimations = () => {
  if (!generator || !bulb) return

  // Adjust generator speed
  const speed = powerLevel.value * 2 // Speed factor
  generator.attr('body/style', {
    animation: `spin ${100 / speed}s linear infinite`
  })

  // Adjust bulb brightness
  const brightness = Math.min(powerLevel.value / 100, 1)
  bulb.attr('body/fill', `rgba(255, 255, 0, ${brightness})`)
}

// Function to initialize JointJS
const initializeJointJS = () => {
  if (!paperContainer.value) return // Ensure element exists

  graph = new joint.dia.Graph()

  paper = new joint.dia.Paper({
    el: paperContainer.value, // Use Vue ref
    model: graph,
    width: 600,
    height: 400,
    gridSize: 10
  })

  // Create Generator
  generator = new joint.shapes.standard.Circle()
  generator.position(100, 150)
  generator.resize(100, 100)
  generator.attr({
    body: { fill: '#3498db', stroke: '#2980b9', 'stroke-width': 3 },
    label: { text: 'Generator', fill: 'white' }
  })
  graph.addCell(generator)

  // Create Bulb
  bulb = new joint.shapes.standard.Circle()
  bulb.position(400, 150)
  bulb.resize(60, 60)
  bulb.attr({
    body: { fill: 'rgba(255, 255, 0, 0.2)', stroke: '#f39c12', 'stroke-width': 2 },
    label: { text: 'Bulb', fill: 'black' }
  })
  graph.addCell(bulb)

  // Create Wire
  wire = new joint.shapes.standard.Link()
  wire.source(generator)
  wire.target(bulb)
  wire.attr({
    line: { stroke: '#333', 'stroke-width': 3, 'stroke-dasharray': '5,5' }
  })
  graph.addCell(wire)

  // Start animation loop
  animationInterval = window.setInterval(updateAnimations, 100)
}

// Cleanup on unmount
onUnmounted(() => {
  if (animationInterval) clearInterval(animationInterval)
  if (graph) graph.clear()
})

// Initialize when mounted
onMounted(() => {
  initializeJointJS()
})
</script>

<template>
  <div class="electric-generator">
    <h2>Electric Generator Simulation</h2>
    <div class="control-panel">
      <label>Power Level: {{ powerLevel }}</label>
      <input type="range" v-model="powerLevel" min="0" max="100" @input="updateAnimations" />
    </div>

    <!-- Vue ref for paper container -->
    <div ref="paperContainer" id="paper-container"></div>
  </div>
</template>

<style scoped>
.electric-generator {
  text-align: center;
}

#paper-container {
  width: 600px;
  height: 400px;
  margin: 20px auto;
  border: 1px solid #ccc;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
