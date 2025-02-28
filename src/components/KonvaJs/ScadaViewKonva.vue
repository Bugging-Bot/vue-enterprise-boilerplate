<template>
  <!-- v-stage is the main canvas container -->
  <v-stage :config="configKonva">
    <!-- v-layer is a container for shapes like circles, rectangles, etc. -->
    <v-layer>
      <!-- v-circle is a circle shape component -->
      <v-circle :config="configCircle"></v-circle>
    </v-layer>
  </v-stage>
</template>

<script>
//import { VStage, VLayer, VCircle } from 'vue-konva'

export default {
  data() {
    return {
      // Configuration for the Konva stage (Canvas container)
      configKonva: {
        width: 200,
        height: 200
      },
      // Configuration for the circle (shape inside the layer)
      configCircle: {
        x: 100,
        y: 100,
        radius: 70,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 4
      }
    }
  }
}
</script>
/* Add custom styles for your component if needed */
<style scoped></style>
