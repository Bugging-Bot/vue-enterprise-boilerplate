<template>
  <DigCanvas :chartConfig="chartConfig" />
</template>

<script setup lang="ts">
// this linked with power slider and adjustment bulb light, these control have to be with vue control
//import DigCanvas from '@/components/JointJs/components/DigCanvasV6.vue'
// Genric chart template
//import DigCanvas from '@/components/JointJs/charts/GenericChart.vue'
//import DigCanvas from '@/components/JointJs/charts/MakeSourdoughLoaf.vue'
// this is just a dummy component
//import DigCanvas from '@/components/JointJs/components/DummyView.vue'
//import Layout from '@/components/layout/LayoutView.vue'
//import DigCanvas from '@/components/JointJs/charts/blankChart.vue'
//import DigCanvas from '@/components/JointJs/charts/EgChart1/EgChart1.vue'
import DigCanvas from '@/components/JointJs/editor/WorkFlowEditor.vue'
//import DigCanvas from '@/components/JointJs/charts/TestChart/testChart.vue'

import { ref } from 'vue'
// Define a chartConfig object
const chartConfig = ref({
  // Add necessary configuration properties here
  // This is a placeholder - adjust based on what EgChart1 expects
  title: 'Example Chart',
  description: 'This is an example chart'
  // Add other required properties
})
console.log('TestView loaded')
</script>

<style scoped></style>
