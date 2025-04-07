<!-- This is charting for Make Sourdough Loaf -->

<template>
  <div ref="paperContainer"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { CreateShape } from '@/components/JointJs/composables/ShapeFactory'
import { CreateLink } from '../composables/LinkFactory'
import * as joint from '@joint/core'
import { CreateLayout, CleanGraph } from '../composables/LayoutFactory'

// Create a ref for the container
const paperContainer = ref<HTMLElement | null>(null)
let paper: joint.dia.Paper
let graph: joint.dia.Graph

let customAttributesOfShape = {
  SN: 'Mouldy'
}

let customAttributesOfLink = {
  SN: 'Mouldy'
}

// Initialize the Paper and add shapes once the component is mounted
onMounted(() => {
  if (paperContainer.value) {
    // Initialize the paper and graph using CreateLayout
    const result = CreateLayout(
      paperContainer.value, // Pass the DOM element reference
      800, // Default width if container width is not available
      600, // Default height if container height is not available
      10 // Grid size (10px)
    )

    // Store the paper and graph references
    paper = result.paper
    graph = result.graph

    // Add shapes to the graph
    const object1 = CreateShape(
      //const shape2 = CreateShape(
      { x: 250, y: 87 },
      { width: 120, height: 350 },
      'M11.5757 1.42426C11.81 1.18995 12.1899 1.18995 12.4243 1.42426L22.5757 11.5757C22.81 11.81 22.8101 12.1899 22.5757 12.4243L12.4243 22.5757C12.19 22.81 11.8101 22.8101 11.5757 22.5757L1.42426 12.4243C1.18995 12.19 1.18995 11.8101 1.42426 11.5757L11.5757 1.42426Z',
      'Shape 2',
      { x: 35, y: 45 },
      'transparent',
      customAttributesOfShape,
      graph
    )

    const object2 = CreateShape(
      //const shape2 = CreateShape(
      { x: 450, y: 87 },
      { width: 120, height: 350 },
      'M11.5757 1.42426C11.81 1.18995 12.1899 1.18995 12.4243 1.42426L22.5757 11.5757C22.81 11.81 22.8101 12.1899 22.5757 12.4243L12.4243 22.5757C12.19 22.81 11.8101 22.8101 11.5757 22.5757L1.42426 12.4243C1.18995 12.19 1.18995 11.8101 1.42426 11.5757L11.5757 1.42426Z',
      'Shape 2',
      { x: 35, y: 45 },
      'transparent',
      customAttributesOfShape,
      graph
    )

    CreateLink(object1, object2, 'Link', customAttributesOfLink, graph)
  }
})

onUnmounted(() => {
  // Clean up resources when component is unmounted
  if (paper && graph) {
    CleanGraph(paper, graph)
  }
})
</script>

<style scoped>
/* Ensure paperContainer has a well-defined size */
#paperContainer {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid black;
  right: 5px;
  top: 5px;
  left: 5px;
  bottom: 5px;
  overflow: auto;
}
</style>
