<template>
  <!-- this container hold everything stage, layer etc-->
  <div ref="container" style="width: 1800px; height: 800px; border: 1px solid #ccc">
    <!-- Stage is must for Konva -->
    <v-stage ref="stage" :config="stageConfig">
      <!-- Layer 1: Background – Static background (images, grid, layout). -->
      <v-layer ref="layer" :config="layer1Config">
        <v-image v-if="image" :config="backgroundConfig" />
      </v-layer>

      <!-- Layer 2: Static Shapes – Represents equipment like tanks, valves, pipes, etc. -->
      <v-layer :config="layer2Config" ref="layer">
        <v-group ref="group">
          <v-shape ref="shape"> </v-shape>
        </v-group>
      </v-layer>

      <!-- Layer 3:
       Process Flow – Represents logical connections (e.g., pipes or flow arrows).
      Real-Time Data/Status Indicators – Shows sensors, gauges, and real-time status of components (like ON/OFF status)..
      Labels/Annotations – Text labels, values, or tooltips for visual explanations.-->
      <v-layer :config="layer3Config" ref="layer"> </v-layer>

      <!-- Layer 4:
       Real-Time Data/Status Indicators – Shows sensors, gauges, and real-time status of components (like ON/OFF status).
      Control Buttons/Interactive Elements – Buttons for user controls (start/stop pumps, alarms, etc.).
      Modals/Popups (Optional) – Displays modals for detailed information, alerts, or settings. -->
      <v-layer :config="layer4Config" ref="layer"> </v-layer>
    </v-stage>
  </div>
</template>

<script>
import VueKonva from 'vue-konva'
import backgroundImage from '@/assets/process_flow_diagram.png'

export default {
  name: 'ProcessPan',
  components: {
    VStage: VueKonva.Stage,
    VLayer: VueKonva.Layer,
    VImage: VueKonva.Image,
    VGroup: VueKonva.Group,
    VShape: VueKonva.Shape
  },
  data() {
    return {
      stageConfig: {
        width: 1500,
        height: 800
      },
      layer1Config: {},
      backgroundConfig: {
        x: 11,
        y: 20,
        width: 1500,
        height: 700
      },
      image: null,
      // Layer 2 configuration: Static Shapes
      layer2Config: {},
      // Layer 3 configuration: Process Flow
      layer3Config: {},
      // Layer 4 configuration: Real-Time Data/Status Indicators
      layer4Config: {}
    }
  },

  mounted() {
    const img = new Image()
    img.onload = () => {
      // Wait for image to load
      this.image = img
      this.backgroundConfig.image = img
      this.$refs.layer.batchDraw()
    }
    img.onerror = (error) => {
      console.log('image load error', error)
    }
    img.src = backgroundImage
  }
}
</script>
<!--Style section-->
<style scoped></style>
