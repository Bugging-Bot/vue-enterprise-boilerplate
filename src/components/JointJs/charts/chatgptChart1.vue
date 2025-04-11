<template>
  <div>
    <div id="paper" style="width: 600px; height: 400px; border: 1px solid #ccc"></div>
  </div>
</template>

<script lang="ts">
import { dia, shapes } from '@joint/core'

// Create JointJS graph and paper
const graph = new dia.Graph()
const paper = new dia.Paper({
  el: document.getElementById('paper-container') as HTMLElement,
  model: graph,
  width: 800,
  height: 600,
  gridSize: 10,
  interactive: true
})

// Define basic rectangle shape
const createStep = (x: number, y: number, label: string): dia.Element =>
  new shapes.standard.Rectangle({
    position: { x, y },
    size: { width: 120, height: 50 },
    attrs: {
      body: { fill: '#E6E6E6', stroke: 'none', rx: 5, ry: 5 },
      label: { text: label, fill: '#333', fontSize: 12, fontFamily: 'Helvetica' }
    }
  })

// Define basic link shape
const createLink = (source: dia.Element, target: dia.Element): dia.Link =>
  new dia.Link({
    source: { id: source.id },
    target: { id: target.id },
    attrs: {
      line: {
        stroke: '#000',
        strokeWidth: 2,
        targetMarker: { type: 'path', d: 'M 10 -5 0 0 10 5 z' }
      }
    }
  })

// Create elements based on extracted Draw.io data
const step1 = createStep(100, 50, 'Mix flour & water')
const step2 = createStep(100, 150, 'Wait 24 hours')
const step3 = createStep(100, 250, 'Feed with flour & water')
const step4 = createStep(100, 350, 'Repeat daily for 7 days')
const step5 = createStep(100, 450, 'Starter ready!')

// Add elements to the graph
graph.addCells([step1, step2, step3, step4, step5])

// Create and add links
graph.addCell(createLink(step1, step2))
graph.addCell(createLink(step2, step3))
graph.addCell(createLink(step3, step4))
graph.addCell(createLink(step4, step5))

// Append paper to the document body
document.body.appendChild(paper.el)
</script>

<style scoped>
/* Add any custom styles here */
</style>
