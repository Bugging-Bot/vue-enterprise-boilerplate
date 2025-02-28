<!-- Using JointJS -->
<script setup>
import { onMounted, ref } from 'vue'
import * as joint from 'jointjs'

const graph = ref(null)
const paper = ref(null)

onMounted(() => {
  graph.value = new joint.dia.Graph()
  paper.value = new joint.dia.Paper({
    el: document.getElementById('jointjs-container'),
    model: graph.value,
    width: 800,
    height: 500,
    gridSize: 10,
    drawGrid: true,
    interactive: { elementMove: true }
  })

  // Example: Adding a Rectangular Shape
  const rect = new joint.shapes.standard.Rectangle()
  rect.position(100, 100)
  rect.resize(100, 50)
  rect.attr({
    body: { fill: 'lightblue' },
    label: { text: 'Motor', fill: 'black' }
  })
  rect.addTo(graph.value)

  // Example: Adding a Circular Shape
  const circle = new joint.shapes.standard.Circle()
  circle.position(300, 100)
  circle.resize(50, 50)
  circle.attr({
    body: { fill: 'lightgreen' },
    label: { text: 'Valve', fill: 'black' }
  })
  circle.addTo(graph.value)

  // Example: Connecting Elements
  const link = new joint.shapes.standard.Link()
  link.source(rect)
  link.target(circle)
  link.addTo(graph.value)
})
</script>

<template>
  <div id="jointjs-container" class="border rounded shadow-md"></div>
</template>

<style scoped>
#jointjs-container {
  border: 1px solid #ddd;
}
</style>
