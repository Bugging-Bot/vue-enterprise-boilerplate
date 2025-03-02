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

  // Define custom shape namespace
  joint.shapes.custom = {}

  // Define the Tank shape
  joint.shapes.custom.Tank = joint.dia.Element.extend({
    defaults: joint.util.defaultsDeep(
      {
        type: 'custom.Tank',
        size: { width: 100, height: 100 },
        markup: [
          {
            tagName: 'image',
            selector: 'image'
          }
        ],
        attrs: {
          image: {
            'xlink:href': '/assets/Tank.svg',
            width: 100,
            height: 100
          }
        }
      },
      joint.dia.Element.prototype.defaults
    )
  })

  // Define the Pump shape
  joint.shapes.custom.Pump = joint.dia.Element.extend({
    defaults: joint.util.defaultsDeep(
      {
        type: 'custom.Pump',
        size: { width: 100, height: 100 },
        markup: [
          {
            tagName: 'image',
            selector: 'image'
          }
        ],
        attrs: {
          image: {
            'xlink:href': '/assets/pump.svg',
            width: 20,
            height: 20
          }
        }
      },
      joint.dia.Element.prototype.defaults
    )
  })

  // Create tank instance
  const tank = new joint.shapes.custom.Tank()
  tank.position(100, 200)
  tank.resize(100, 100)
  tank.addTo(graph.value)

  // Create pump instance
  const pump = new joint.shapes.custom.Pump()
  pump.position(300, 200)
  pump.resize(10, 10)
  pump.addTo(graph.value)

  // Example: Connecting Elements
  const link = new joint.shapes.standard.Link()
  link.source(rect)
  link.target(circle)
  link.addTo(graph.value)

  // Connecting volve to pump
  const volveLink = new joint.shapes.standard.Link()
  volveLink.source(circle)
  volveLink.target(pump)
  volveLink.addTo(graph.value)

  // Connecting the pump to the tank
  const pumpLink = new joint.shapes.standard.Link()
  pumpLink.source(pump)
  pumpLink.target(tank)
  pumpLink.addTo(graph.value)
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
