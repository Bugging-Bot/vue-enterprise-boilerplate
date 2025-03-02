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
      padding: 20,
      prop: 0.95,
      imageUrl: '/assets/process_flow_diagram.png', // or .png
      shapes: {
        valve1: {
          type: 'Circle',
          config: {
            x: 100,
            y: 100,
            radius: 20,
            fill: 'red',
            draggable: true
          },
          events: {
            click: (e) => this.handleValveClick(e, 'valve1'),
            mouseover: (e) => this.handleMouseOver(e, 'valve1')
          }
        },
        pump1: {
          type: 'Rect',
          config: {
            x: 200,
            y: 200,
            width: 40,
            height: 40,
            fill: 'blue',
            draggable: true
          },
          events: {
            click: (e) => this.handlePumpClick(e, 'pump1'),
            mouseover: (e) => this.handleMouseOver(e, 'pump1')
          }
        }
      }
    }
  },
  methods: {
    fitStageIntoParentContainer() {
      const containerWidth = this.$refs.container.clientWidth - this.padding * 2
      const containerHeight = this.$refs.container.clientHeight - this.padding * 2

      this.stage.width(containerWidth * this.prop + this.padding * 2)
      this.stage.height(containerHeight * this.prop + this.padding * 2)

      if (this.konvaImage) {
        this.konvaImage.width(containerWidth * this.prop)
        this.konvaImage.height(containerHeight * this.prop)
        this.konvaImage.x(this.padding)
        this.konvaImage.y(this.padding)
      }

      this.stage.batchDraw()
    },
    async loadImage() {
      const containerWidth = this.$refs.container.clientWidth - this.padding * 2
      const containerHeight = this.$refs.container.clientHeight - this.padding * 2

      if (this.imageUrl.endsWith('.svg')) {
        const response = await fetch(this.imageUrl)
        const svgContent = await response.text()
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const v = await Canvg.from(ctx, svgContent)
        await v.render()
        return canvas
      } else {
        return new Promise((resolve) => {
          const img = new Image()
          img.onload = () => resolve(img)
          img.src = this.imageUrl
        })
      }
    },
    createShape(shapeConfig, layer) {
      const ShapeClass = Konva[shapeConfig.type]
      const shape = new ShapeClass(shapeConfig.config)

      Object.entries(shapeConfig.events).forEach(([event, handler]) => {
        shape.on(event, handler)
      })

      layer.add(shape)
      return shape
    },

    handleValveClick(e, id) {
      const shape = e.target
      // Valve animation example
      shape.to({
        fill: shape.fill() === 'red' ? 'green' : 'red',
        duration: 0.5
      })
    },

    handlePumpClick(e, id) {
      const shape = e.target
      // Pump animation example
      shape.to({
        rotation: shape.rotation() + 360,
        duration: 1
      })
    },

    handleMouseOver(e, id) {
      const shape = e.target
      shape.scale({ x: 1.2, y: 1.2 })
      this.stage.batchDraw()
    },

    initializeShapes() {
      const layer2 = new Konva.Layer()
      this.stage.add(layer2)

      // Create all shapes from config
      Object.entries(this.shapes).forEach(([id, shapeConfig]) => {
        this.createShape(shapeConfig, layer2)
      })

      layer2.batchDraw()
    }
  },
  async mounted() {
    this.stage = new Konva.Stage({
      container: this.$refs.container,
      width: window.innerWidth,
      height: window.innerHeight
    })

    const layer1 = new Konva.Layer()
    this.stage.add(layer1)

    const imageElement = await this.loadImage()

    this.konvaImage = new Konva.Image({
      image: imageElement,
      x: this.padding,
      y: this.padding
    })

    layer1.add(this.konvaImage)
    this.fitStageIntoParentContainer()

    window.addEventListener('resize', this.fitStageIntoParentContainer)

    // Add shapes after background is loaded
    this.initializeShapes()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.fitStageIntoParentContainer)
  }
}
</script>
<style scoped></style>
