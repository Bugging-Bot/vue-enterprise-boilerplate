<!--
This component will represent a single connector (edge/link).
It will handle the rendering of the connector and its style.
-->
<template>
  <div>
    <!-- <DiagramCanvas ref="diagramCanvas" />

    <button @click="addShape">Add Shape</button>
    <button @click="addConnector">Add Connector</button> -->
  </div>
</template>

<script>
import { DiagramCanvas } from './DiagramCanvas.vue'
import DiagramShape from './DiagramShape.vue'
//import DiagramConnector from './DiagramConnector.vue'
//import joint from 'jointjs'

export const DiagramConnector = {
  components: {
    DiagramCanvas,
    DiagramShape,
    DiagramConnector
  },
  mounted() {
    this.canvas = this.$refs.diagramCanvas
    this.shape1 = this.canvas.addShape({ x: 50, y: 50, width: 100, height: 80 })
    this.shape2 = this.canvas.addShape({ x: 300, y: 150, width: 120, height: 90 })
  },
  methods: {
    addShape() {
      this.canvas.addShape({ x: 200, y: 100, width: 80, height: 60 })
    },
    addConnector() {
      this.canvas.addConnector(this.shape1, this.shape2, 'smooth')
    }
  }
}
</script>
