<!-- This going with tutorials-->
<template>
  <div ref="canvasRef" class="canvas"></div>
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
        width: window.innerWidth, // Width of the window
        height: window.innerHeight, // Height of the window
        gridSize: 1,
        cellViewNamespace: namespace
      })

      // Define a custom shape with an SVG path

      // Define your SVG path data
      var myPathData = 'M 10 10 L 100 50 C 150 100 50 150 10 100 Z'

      // Create a custom shape using joint.shapes.basic.Path
      var jar = new joint.shapes.basic.Path({
        position: { x: 100, y: 100 },
        attrs: {
          d: {
            d: myPathData,
            fill: 'lightblue',
            stroke: 'blue',
            'stroke-width': 2
          }
        }
      })

      // const jar = joint.dia.Element.define('custom.Shape', {
      //   markup: '<g class="rotatable"><g class="scalable"><path class="body" /></g></g>',
      //   // Define the default attributes for the shape
      //   attrs: {
      //     body: {
      //       // SVG path data for a star shape
      //       //d: 'M 34.33 1 C 34.33 10.28 26.87 17.8 17.67 17.8 C 8.46 17.8 1 10.28 1 1 L 126 1 C 126 10.28 118.54 17.8 109.33 17.8 C 100.13 17.8 92.67 10.28 92.67 1 Z M 63.5 1.42 L 76 22 L 51 22 Z',
      //       refD: 'M 10 10 L 190 10 L 190 190 L 10 190 Z',
      //       fill: 'lightblue',
      //       stroke: 'black',
      //       strokeWidth: 2,
      //       refWidth: '100%',
      //       refHeight: '100%'
      //     },
      //     label: {
      //       text: 'Jar',
      //       fill: 'Red'
      //       // ref: 'body',
      //       // refX: '50%',
      //       // refY: '50%',
      //       // fontSize: 14,
      //       // textAnchor: 'middle',
      //       // yAlignment: 'middle'
      //     }
      //   }
      // })

      // Add a standard rectangle shape to the graph
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
      // old code
      rect.addTo(graph)
      graph.addCell(jar)

      // Create and add an instance of the "jar" custom shape to the graph
      //const jarShape = new jar()
      jarShape.position(500, 500)
      jarShape.resize(200, 200)
      jarShape.addTo(graph)

      // Check if the custom shape is added successfully
      console.log('Custom jar shape added:', jarShape)

      // Add a second rectangle, and connect it to the first one
      const rect2 = rect.clone()
      rect2.translate(300, 0)
      rect2.attr('label/text', 'World!')
      rect2.addTo(graph)

      const link = new joint.shapes.standard.Link()
      link.source(rect)
      link.target(rect2)
      link.addTo(graph)

      // Fix the passive event listener warning
      // canvasRef.value.addEventListener('touchstart', (e) => {}, { passive: true })
      // canvasRef.value.addEventListener('wheel', (e) => {}, { passive: true })
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

<style scoped>
.canvas {
  width: 100vw;
  height: 100vh;
  border: 1px solid black;
  background-color: lightgray; /* Optional: for visibility */
}
</style>
