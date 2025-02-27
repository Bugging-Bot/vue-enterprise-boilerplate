<template>
  <div class="diagram-editor">
    <div class="stencil-container" ref="stencilContainer"></div>
    <div class="paper-container" ref="paperContainer"></div>
  </div>
</template>

<!-- This code sets up a JointJS diagram editor with a stencil and a paper container.
 The `onMounted` hook is used to initialize the stencil and set up the drag and drop functionality.
The `initializeStencil` function creates a sample stencil element (a rectangle) and adds it to the stencil graph.
The `setupDragAndDrop` function sets up event listeners for dragging and dropping elements from the stencil to the paper container, as well as for dragging ports. -->

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as joint from 'jointjs'

const stencilContainer = ref<HTMLElement | null>(null)
const paperContainer = ref<HTMLElement | null>(null)

const graph = new joint.dia.Graph()
const paper = new joint.dia.Paper({
  width: 800,
  height: 600,
  model: graph,
  gridSize: 10,
  drawGrid: true,
  interactive: true
})

const stencilGraph = new joint.dia.Graph()
const stencilPaper = new joint.dia.Paper({
  width: 200,
  height: 600,
  model: stencilGraph,
  interactive: false
})

onMounted(() => {
  if (paperContainer.value && stencilContainer.value) {
    paperContainer.value.appendChild(paper.el)
    stencilContainer.value.appendChild(stencilPaper.el)
    initializeStencil()
    setupDragAndDrop()
  }
})

const initializeStencil = () => {
  // Create sample stencil elements
  const rect = new joint.shapes.standard.Rectangle({
    position: { x: 10, y: 10 },
    size: { width: 100, height: 60 },
    attrs: {
      body: { fill: '#ecf0f1', stroke: '#2c3e50' },
      label: { text: 'Rectangle', fill: '#2c3e50' }
    },
    ports: {
      groups: {
        input: {
          position: 'left',
          attrs: {
            circle: {
              fill: '#16a085',
              stroke: '#2c3e50',
              magnet: true
            }
          }
        },
        output: {
          position: 'right',
          attrs: {
            circle: {
              fill: '#e74c3c',
              stroke: '#2c3e50',
              magnet: true
            }
          }
        }
      }
    }
  })

  stencilGraph.addCell(rect)
}

const setupDragAndDrop = () => {
  stencilPaper.on('cell:pointerdown', (cellView, evt) => {
    const clone = cellView.model.clone()
    let pos = { x: 0, y: 0 } // Default position
    if (typeof evt.clientX === 'number' && typeof evt.clientY === 'number') {
      pos = paper.clientToLocalPoint({ x: evt.clientX, y: evt.clientY })
    }

    //const pos = paper.clientToLocalPoint({ x: evt.clientX, y: evt.clientY })
    clone.position()
    //clone.position(pos.x, pos.y) // Corrected: Pass x and y separately
    graph.addCell(clone)

    let moving = false

    paper.on('cell:pointerup', () => {
      if (!moving) {
        clone.remove()
      }
    })
  })

  // Enable port dragging
  paper.on('element:port:pointerdown', (elementView, port) => {
    const portNode = port.parentNode
    const bbox = portNode.getBBox()

    const clone = port.cloneNode(true)
    clone.setAttribute('transform', `translate(${bbox.x},${bbox.y})`)

    paper.el.appendChild(clone)

    const movePort = (event: MouseEvent) => {
      const pos = paper.clientToLocalPoint({ x: event.clientX, y: event.clientY })

      clone.setAttribute('transform', `translate(${pos.x || 0},${pos.y || 0})`)
    }

    document.addEventListener('mousemove', movePort)

    document.addEventListener(
      'mouseup',
      () => {
        clone.remove()
        document.removeEventListener('mousemove', movePort)
      },
      { once: true }
    )
  })
}
</script>
<style scoped>
.diagram-editor {
  display: flex;
  gap: 20px;
  padding: 20px;
}

.stencil-container {
  border: 1px solid #ccc;
  width: 200px;
}

.paper-container {
  border: 1px solid #ccc;
  flex-grow: 1;
}
</style>
