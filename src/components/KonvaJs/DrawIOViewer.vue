<template>
  <div ref="container" style="width: 800px; height: 600px; border: 1px solid #ccc"></div>
</template>

<script>
import Konva from 'konva'
import { decode } from 'js-base64'

export default {
  data() {
    return {
      stage: null,
      layer: null,
      diagramXml: null
    }
  },
  mounted() {
    this.initKonva()
    this.loadDiagramFromPath()
  },
  methods: {
    initKonva() {
      this.stage = new Konva.Stage({
        container: this.$refs.container,
        width: 800,
        height: 600
      })
      this.layer = new Konva.Layer()
      this.stage.add(this.layer)
    },
    async loadDiagramFromPath() {
      try {
        const response = await fetch('/process_flow_diagram.xml')
        const xmlContent = await response.text()
        this.diagramXml = xmlContent
        this.loadDrawIO()
      } catch (error) {
        console.error('Error loading diagram file:', error)
      }
    }
  }
}
</script>
