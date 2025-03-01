<template>
  <div ref="container" style="width: 100%; height: 100%; border: 5px solid #ccc">
    <v-stage ref="stage" :config="stageConfig">
      <!-- Layer 1: Background -->
      <v-layer ref="layer" :config="layer1Config">
        <v-image :config="backgroundConfig" />
      </v-layer>

      <!-- Layer 2: Static Shapes -->
      <v-layer :config="layer2Config" ref="layer">
        <v-group ref="group">
          <v-shape ref="shape"> </v-shape>
        </v-group>
      </v-layer>

      <!-- Layer 3: Process Flow -->
      <v-layer :config="layer3Config" ref="layer"> </v-layer>

      <!-- Layer 4: Real-Time Data -->
      <v-layer :config="layer4Config" ref="layer"> </v-layer>
    </v-stage>
  </div>
</template>
<script>
import Konva from 'konva'
import { Canvg } from 'canvg'

export default {
  data() {
    return {
      stage: null,
      konvaImage: null,
      padding: 30, // border all around the container
      prop: 0.8, /// 90% of the container size
      stageConfig: {
        width: window.innerWidth,
        height: window.innerHeight,
        padding: 10
      },
      layer1Config: {},
      layer2Config: {},
      layer3Config: {},
      layer4Config: {}
    }
  },
  methods: {
    fitStageIntoParentContainer() {
      const containerWidth = this.$refs.container.clientWidth - this.padding * 2
      const containerHeight = this.$refs.container.clientHeight - this.padding * 2

      // Set stage size with padding
      this.stage.width(containerWidth * this.prop + this.padding * 2)
      this.stage.height(containerHeight * this.prop + this.padding * 2)

      if (this.konvaImage) {
        // Set image size to 95% of container
        this.konvaImage.width(containerWidth * this.prop)
        this.konvaImage.height(containerHeight * this.prop)
        this.konvaImage.x(this.padding)
        this.konvaImage.y(this.padding)
      }

      this.stage.batchDraw()
    }
  },
  async mounted() {
    const containerWidth = this.$refs.container.clientWidth - this.padding * 2
    const containerHeight = this.$refs.container.clientHeight - this.padding * 2

    this.stage = new Konva.Stage({
      container: this.$refs.container,
      width: containerWidth * this.prop + this.padding * 2,
      height: containerHeight * this.prop + this.padding * 2
    })

    const layer1 = new Konva.Layer()
    this.stage.add(layer1)
    // const response = await fetch('/assets/process_flow_diagram_3.svg')
    const response = await fetch('/assets/process_flow_diagram.png')
    const svgContent = await response.text()

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const v = await Canvg.from(ctx, svgContent)
    await v.render()

    this.konvaImage = new Konva.Image({
      image: canvas,
      x: this.padding,
      y: this.padding,
      width: containerWidth * this.prop,
      height: containerHeight * this.prop
    })

    layer1.add(this.konvaImage)
    layer1.batchDraw()

    window.addEventListener('resize', this.fitStageIntoParentContainer)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.fitStageIntoParentContainer)
  }
}
</script>
<style scoped></style>
