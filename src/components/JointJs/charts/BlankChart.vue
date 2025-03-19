<script setup>
import { onMounted, ref } from 'vue'
import * as joint from '@joint/core'

const paperContainer = ref(null)
const paperInstance = ref(null)

onMounted(() => {
  const graph = new joint.dia.Graph()

  paperInstance.value = new joint.dia.Paper({
    el: paperContainer.value,
    model: graph,
    width: 800,
    height: 600,
    gridSize: 10, // REQUIRED for grid to render
    background: { color: '#f8f9fa' }, // Optional: Set background color
    drawGrid: {
      name: 'doubleMesh', // Available options: 'mesh', 'doubleMesh'
      args: [
        { color: 'rgba(0, 255, 0, 0.3)', thickness: 1 }, // Small grid
        { color: 'rgba(255, 0, 0, 0.3)', scaleFactor: 5, thickness: 2 } // Larger grid
      ]
    }
  })

  // Ensure the grid is drawn
  paperInstance.value.drawGrid()
})
</script>

<template>
  <div ref="paperContainer" style="width: 800px; height: 600px; border: 1px solid #ccc"></div>
</template>
