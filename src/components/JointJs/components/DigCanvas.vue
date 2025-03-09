<!-- This going with tutorials-->
<template>
  <div
    ref="canvasRef"
    class="canvas"
    style="width: 600px; height: 400px; border: 1px solid black"
  ></div>
</template>

<script setup lang="ts">
//import { el } from 'date-fns/locale'
// used named import
import * as joint from 'jointjs'
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
console.log('DigCanvas mounted')
const canvasRef = ref<HTMLElement | null>(null) // Create a ref for the canvas element
let paper: joint.dia.Paper | null = null
let graph: joint.dia.Graph | null = null

onMounted(() => {
  console.log('DigCanvas component within Onmounted hook')
  // wait for the component to be mounted
  nextTick(() => {
    console.log('Inside nextTick callback')
    console.log('canvasRef.value:', canvasRef.value)
    // Ensure that the canvas element is available after the component mounts
    if (canvasRef.value) {
      console.log('DigCanvas component within cannvasRef.value')
      const namespace = joint.shapes
      graph = new joint.dia.Graph({}, { cellNamespace: namespace })
      paper = new joint.dia.Paper({
        el: canvasRef.value,
        model: graph,
        width: 600,
        height: 100,
        gridSize: 1,
        cellViewNamespace: namespace
      })

      const rect = new joint.shapes.standard.Rectangle()
      rect.position(100, 30)
      rect.resize(100, 40)
      rect.attr({
        body: {
          fill: 'blue'
        },
        label: {
          text: 'Hello',
          fill: 'white'
        }
      })
      rect.addTo(graph)
      const rect2 = rect.clone()
      rect2.translate(300, 0)
      rect2.attr('label/text', 'World!')
      rect2.addTo(graph)

      const link = new joint.shapes.standard.Link()
      link.source(rect)
      link.target(rect2)
      link.addTo(graph)

      // Fix the passive event listener warning
      canvasRef.value.addEventListener('touchstart', (e) => {}, { passive: true })
      canvasRef.value.addEventListener('wheel', (e) => {}, { passive: true })
    } else {
      console.error('Canvas element not found.')
    }
  })
})

onUnmounted(() => {
  // Cleanup when the component is unmounted
  if (paper) {
    paper.remove() // Destroy the paper instance
  }
  if (graph) {
    graph.clear() // Clear the graph to avoid memory leaks
  }
})
</script>

<style scoped></style>
