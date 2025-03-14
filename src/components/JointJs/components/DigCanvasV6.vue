<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import * as joint from 'jointjs'

// Refs for power and JointJS elements
const powerLevel = ref(50) // Initial power level
const paperContainer = ref<HTMLDivElement | null>(null) // Vue ref for the container


let graph: joint.dia.Graph
let paper: joint.dia.Paper
let generator: joint.dia.Element
let bulb: joint.dia.Element
let wire: joint.dia.Link
let animationInterval: number | null = null

// Function to update animations based on power level
const updateAnimations = () => {
  if (!generator || !bulb) return

  // Calculate rotation speed based on power level
  const speed = powerLevel.value * 2 // Adjust speed factor
  generator.attr('body/style', {
    animation: `spin ${100 / speed}s linear infinite`
  })

  // Adjust bulb brightness
  const brightness = Math.min(powerLevel.value / 100, 1)
  bulb.attr('body/fill', `rgba(255, 255, 0, ${brightness})`) // Yellow glow effect
}

// Function to initialize JointJS elements
const initializeJointJS = () => {
  graph = new joint.dia.Graph()

  paper = new joint.dia.Paper({
    el: document.getElementById('paper-container'),
    model: graph,
    width: 600,
    height: 400,
    gridSize: 10
  })

  // Create Generator Element
  generator = new joint.shapes.standard.Circle()
  generator.position(100, 150)
  generator.resize(100, 100)
  generator.attr({
    body: {
      fill: '#3498db',
      stroke: '#2980b9',
      'stroke-width': 3,
      style: { animation: 'spin 2s linear infinite' } // Initial spin animation
    },
    label: { text: 'Generator', fill: 'white' }
  })
  graph.addCell(generator)

  // Create Bulb Element
  bulb = new joint.shapes.standard.Circle()
  bulb.position(400, 150)
  bulb.resize(60, 60)
  bulb.attr({
    body: {
      fill: 'rgba(255, 255, 0, 0.2)', // Dim by default
      stroke: '#f39c12',
      'stroke-width': 2
    },
    label: { text: 'Bulb', fill: 'black' }
  })
  graph.addCell(bulb)

  // Create Wire Connection
  wire = new joint.shapes.standard.Link()
  wire.source(generator)
  wire.target(bulb)
  wire.attr({
    line: { stroke: '#333', 'stroke-width': 3, 'stroke-dasharray': '5,5' } // Dashed line for wire
  })
  graph.addCell(wire)

  // Start animation loop
  animationInterval = window.setInterval(updateAnimations, 100)
}

// Cleanup function on unmount
onUnmounted(() => {
  if (animationInterval) {
    clearInterval(animationInterval)
    animationInterval = null
  }
  if (graph) graph.clear()
})

// Initialize JointJS when component mounts
onMounted(() => {
  initializeJointJS()
})
</script>

<template>
  <div class="electric-generator">
    <h2>Electric Generator Simulation</h2>

    <!-- Power Control Slider -->
    <div class="control-panel">
      <label>Power Level: {{ powerLevel }}</label>
      <input type="range" v-model="powerLevel" min="0" max="100" @input="updateAnimations" />
    </div>

    <!-- JointJS Canvas -->
    <div id="paper-container"></div>
  </div>
</template>

<style scoped>
.electric-generator {
  text-align: center;
  font-family: Arial, sans-serif;
}

#paper-container {
  width: 600px;
  height: 400px;
  margin: 20px auto;
  border: 1px solid #ccc;
}

/* Generator spinning animation */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
