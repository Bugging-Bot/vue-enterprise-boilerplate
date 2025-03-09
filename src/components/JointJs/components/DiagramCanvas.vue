<!--
This component will manage the JointJS Graph and Paper, along with the Libavoid integration.
It will handle the rendering of shapes and connectors.
It will provide the main drawing surface.
-->
<template>
  <div ref="diagramCanvas" class="diagram-canvas"></div>
</template>

<script>
import joint from 'jointjs'
// import Libvoid from 'libavoid'
//import Libavoid from 'libavoid-js'
import { route } from 'libavoid-js'
export const DiagramCanvas = {
  name: 'DiagramCanvas',
  props: {
    diagramData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      graph: null,
      paper: null,
      libavoid: null
    }
  },
  mounted() {
    this.initDiagram()
  },
  methods: {
    initDiagram() {
      if (!this.$refs.diagramCanvas) {
        console.error('DiagramCanvas ref is not available.')
        return // Exit if the ref is not found
      }
      this.graph = new joint.dia.Graph()
      this.paper = new joint.dia.Paper({
        el: this.$refs.diagramCanvas,
        width: 800,
        height: 600,
        model: this.graph,
        gridSize: 1,
        drawGrid: true,
        cellViewNamespace: joint.dia.Paper.defaultNamespace,
        async: true
      })
      this.paper.on('change:position and remove', () => {
        this.routeEdges()
      })
    },
    routeEdges() {
      if (route) {
        const graphData = this.graph.toJSON()
        route(graphData)
          .then((routedData) => {
            this.updateJointGraph(routedData)
          })
          .catch((error) => {
            console.error('Libavoid Error routing edges:', error)
          })
      } else {
        console.error('Libavoid route function not available.')
      }
      // Libavoid integration using the imported module:
      // if (Libavoid && Libavoid.route) {
      //   //check if module is loaded
      //   const graphData = this.graph.toJSON()
      //   Libavoid.route(graphData)
      //     .then((routerData) => {
      //       //update jointjs graph with routedData
      //       this.updateJointGraph(routedData)
      //     })
      //     .catch((error) => {
      //       console.error('Libavoid Error routing edges:', error)
      //     })
      // } else {
      //   console.error('Libavoid module not available.')
      // }
    },
    updateJointGraph(routedData) {
      //logic to update the jointjs graph with the new edge routes.
      routedData.cells.forEach((cell) => {
        if (cell.type == 'standard.Link') {
          const link = this.graph.getCell(cell.id)
          if (link) {
            link.vertices(cell.vertices || [])
          }
        }
      })
    },
    addShape(shapeData) {
      const shape = new joint.shapes.standard.Rectangle({
        position: { x: shapeData.x, y: shapeData.y },
        size: { width: shapeData.width, height: shapeData.height },
        attrs: { body: { fill: 'lightblue' } }
      })
      this.graph.addCell(shape)
      return shape
    },
    addConnector(source, target, connectorType) {
      let link
      if (connectorType === 'smooth') {
        link = new joint.shapes.standard.Link({
          source: { id: source.id },
          target: { id: target.id },
          router: { name: 'manhattan' },
          connector: { name: 'smooth' }
        })
      } else {
        link = new joint.shapes.standard.Link({
          source: { id: source.id },
          target: { id: target.id }
        })
      }
      this.graph.addCell(link)
    }
  }
}
</script>

<style>
.diagram-canvas {
  border: 1px solid #ccc;
}
</style>
