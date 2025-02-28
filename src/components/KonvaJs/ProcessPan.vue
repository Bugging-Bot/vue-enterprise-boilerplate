<template>
  <!-- this container hold everything stage, layer etc-->
  <div ref="container" style="width: 1500px; height: 800px; border: 1px solid #ccc">
    <!-- Stage is must for Konva -->
    <v-stage ref="stage" :config="stageConfig">
      <!-- Layer 1: Background – Static background (images, grid, layout). -->
      <v-layer ref="layer" :config="layer1Config"> </v-layer>

      <!-- Layer 2: Static Shapes – Represents equipment like tanks, valves, pipes, etc. -->
      <v-layer ref="layer" :config="layer2Config">
        <v-group ref="group">
          <v-shape ref="shape"> </v-shape>
        </v-group>
      </v-layer>

      <!-- Layer 3: Process Flow – Represents logical connections (e.g., pipes or flow arrows). -->
      <v-layer ref="layer" :config="layer3Config"> </v-layer>

      <!-- Layer 4: Real-Time Data/Status Indicators – Shows sensors, gauges, and real-time status of components (like ON/OFF status).. -->
      <v-layer ref="layer" :config="layer4Config"> </v-layer>

      <!--Layer 5: Labels/Annotations – Text labels, values, or tooltips for visual explanations.-->
      <v-layer ref="layer" :config="layer5Config"> </v-layer>

      <!--Layer 6: Control Buttons/Interactive Elements – Buttons for user controls (start/stop pumps, alarms, etc.).-->
      <v-layer ref="layer" :config="layer6Config"> </v-layer>

      <!-- Layer 7: Modals/Popups (Optional) – Displays modals for detailed information, alerts, or settings. -->
      <v-layer ref="layer" :config="layer7Config"> </v-layer>
    </v-stage>
  </div>
</template>

<!--Script section-->
<script>
export default {
  data() {
    return {
      // Stage configuration
      stageConfig: {
        width: 1000,
        height: 600
      },
      // Layer 1 configuration: Background
      layer1Config: {
        width: 1000,
        height: 600,
        backgroundImage: 'path/to/background.png',
        backgroundColor: '#f0f0f0'
      },
      // Layer 2 configuration: Static Shapes
      layer2Config: {
        width: 1000,
        height: 600,
        backgroundColor: '#ffffff'
      },
      // Layer 3 configuration: Process Flow
      layer3Config: {
        width: 1000,
        height: 600,
        backgroundColor: '#ffffff'
      },
      // Layer 4 configuration: Real-Time Data/Status Indicators
      layer4Config: {
        width: 1000,
        height: 600,
        backgroundColor: '#ffffff'
      },
      // Layer 5 configuration: Labels/Annotations
      layer5Config: {
        width: 1000,
        height: 600,
        backgroundColor: '#ffffff'
      },
      // Layer 6 configuration: Control Buttons/Interactive Elements
      layer6Config: {
        width: 1000,
        height: 600,
        backgroundColor: '#ffffff'
      },
      // Layer 7 configuration: Modals/Popups (Optional)
      layer7Config: {
        width: 1000,
        height: 600,
        backgroundColor: '#ffffff'
      }
    }
  }
}
</script>

<!--Style section-->
<style scoped></style>
