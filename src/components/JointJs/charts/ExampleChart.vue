<template>
  <div>
    <div id="paper" style="width: 600px; height: 400px; border: 1px solid #ccc"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue'
import * as joint from '@joint/core'

interface CustomLink extends joint.dia.Link {
  customData: any
}

export default defineComponent({
  name: 'JointJsComponent',
  setup() {
    let paper: joint.dia.Paper | null = null
    let graph: joint.dia.Graph | null = null

    // Step 1: Create and initialize the graph and paper
    const initializeGraph = () => {
      graph = new joint.dia.Graph()

      paper = new joint.dia.Paper({
        el: document.getElementById('paper')!,
        model: graph,
        width: 600,
        height: 400,
        gridSize: 1
      })

      // Step 2: Create two basic elements (nodes)
      const rect1 = new joint.shapes.standard.Rectangle()
      rect1.position(100, 100)
      rect1.resize(100, 40)
      rect1.attr({
        body: {
          fill: 'lightblue'
        },
        label: {
          text: 'Node 1',
          fontSize: 14
        }
      })

      const rect2 = new joint.shapes.standard.Rectangle()
      rect2.position(300, 100)
      rect2.resize(100, 40)
      rect2.attr({
        body: {
          fill: 'lightgreen'
        },
        label: {
          text: 'Node 2',
          fontSize: 14
        }
      })

      // Add elements to the graph
      graph.addCells([rect1, rect2])

      // Step 3: Create a custom link with a 'customData' attribute
      const link = new joint.shapes.standard.Link()
      link.source(rect1)
      link.target(rect2)
      link.attr({
        line: {
          stroke: '#000',
          strokeWidth: 2
        }
      })

      // Add a custom 'customData' attribute to the link
      const customLink = link as CustomLink
      customLink.customData = {
        info: 'This is a custom link with extra data',
        sn: 'wire-001',
        events: [
          { event: 'Power', value: 0, color: 'red' },
          { event: 'Power', value: 1, color: 'green' },
          { event: 'Heat', value: 25, color: 'green' }
        ]
      }

      // Add the link to the graph
      graph.addCell(link)

      // Step 4: Accessing the custom data
      console.log(customLink.customData) // Output: { info: 'This is a custom link with extra data' }
    }

    // Cleanup when the component is unmounted
    const cleanupGraph = () => {
      if (paper) {
        paper.remove()
        paper = null
      }
      if (graph) {
        graph.clear()
        graph = null
      }
    }

    // onMounted hook to initialize graph and paper
    onMounted(() => {
      initializeGraph()
    })

    // onUnmounted hook to cleanup graph and paper
    onUnmounted(() => {
      cleanupGraph()
    })

    return {}
  }
})
</script>

<style scoped>
/* Add any custom styles here */
</style>
