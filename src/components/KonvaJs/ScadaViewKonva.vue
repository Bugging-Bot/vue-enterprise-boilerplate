<template>
  <!-- v-stage is the main canvas container -->
  <v-stage :config="configKonva">
    <!-- v-layer is a container for shapes like circles, rectangles, etc. -->
    <v-layer>
      <!-- v-circle is a circle shape component -->
      <v-circle :config="configCircle"></v-circle>
      <v-rect :config="configRect"></v-rect>
      <v-shape :config="configShape"></v-shape>
    </v-layer>
  </v-stage>
</template>

<script>
//import { config } from 'process'

//import { VStage, VLayer, VCircle } from 'vue-konva'

export default {
  data() {
    return {
      // Configuration for the Konva stage (Canvas container)
      configKonva: {
        width: 500,
        height: 500
      },
      // Configuration for the circle (shape inside the layer)
      configCircle: {
        x: 100,
        y: 100,
        radius: 25,
        fill: '#f785dd',
        stroke: 'black',
        strokeWidth: 0.5
      },
      configRect: {
        x: 150,
        y: 100,
        width: 50,
        height: 50,
        fill: '#f785dd',
        stroke: 'black',
        strokeWidth: 0.5
      },
      configShape: {
        width: 260,
        height: 170,
        sceneFunc: function (context, shape) {
          const width = shape.width()
          const height = shape.height()
          context.beginPath()
          context.moveTo(10, 10)
          context.lineTo(width - 40, height - 90)
          context.quadraticCurveTo(width - 110, height - 70, width, height)
          context.closePath()

          // (!) Konva specific method, it is very important
          context.fillStrokeShape(shape)
        }
      }
    }
  }
}
</script>
/* Add custom styles for your component if needed */
<style scoped></style>
