<template>
  <div>
    <div id="paper" style="width: 600px; height: 400px; border: 1px solid #ccc"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue'
import * as joint from '@joint/core'
const defaultScale: number = 0.75

interface CustomLink extends joint.dia.Link {
  customData: any
}

export default defineComponent({
  name: 'JointJsComponent',
  setup() {
    let paper: joint.dia.Paper | null = null
    let graph: joint.dia.Graph | null = null

    // buttons markup
    const buttonMarkup = [
      {
        tagName: 'circle',
        selector: 'button',
        attributes: {
          r: 7,
          fill: '#001DFF',
          cursor: 'pointer'
        }
      },
      {
        tagName: 'path',
        selector: 'icon',
        attributes: {
          d: 'M -2 4 2 4 M 0 3 0 0 M -2 -1 1 -1 M -1 -4 1 -4',
          fill: 'none',
          stroke: '#FFFFFF',
          'stroke-width': 2,
          'pointer-events': 'none'
        }
      }
    ]

    // Function to add interaction tools to an element
    function addElementTools(element: joint.dia.Element, scale: number) {
      const removeTool = new joint.elementTools.Remove({ scale })
      const button = new joint.elementTools.Button({
        scale,
        action: () => alert('Button pressed'),
        x: 'calc(w)',
        markup: buttonMarkup
      })
      const connectTool = new joint.elementTools.Connect({
        scale,
        x: 'calc(w)',
        y: 'calc(h)',
        magnet: 'body'
      })

      if (paper) {
        element.findView(paper).addTools(
          new joint.dia.ToolsView({
            tools: [removeTool, button, connectTool]
          })
        )
      }
    }

    function addLinkTools(link: joint.dia.Link, scale: number) {
      const verticesTool = new joint.linkTools.Vertices({ scale })
      const targetArrowheadTool = new joint.linkTools.TargetArrowhead({ scale })
      const targetAnchorTool = new joint.linkTools.TargetAnchor({ scale })
      const removeTool = new joint.linkTools.Remove({ scale })

      if (paper) {
        link.findView(paper).addTools(
          new joint.dia.ToolsView({
            tools: [verticesTool, targetArrowheadTool, targetAnchorTool, removeTool]
          })
        )
      }
    }

    function setScaleValue(value: number) {
      if (graph) {
        graph.getLinks().forEach((link) => addLinkTools(link, value))
        graph.getElements().forEach((element) => addElementTools(element, value))
      }
    }

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

      // Add interaction tools to rect1 and rect2
      addElementTools(rect1, 0.75)
      addElementTools(rect2, 0.75)

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
      console.log(customLink.customData)
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
      setScaleValue(defaultScale)
    })

    // onUnmounted hook to cleanup graph and paper
    onUnmounted(() => {
      cleanupGraph()
    })

    return {} // Return any functions or variables you want to expose to the template
  }
})
</script>
<style scoped>
/* Add any custom styles here */
</style>
