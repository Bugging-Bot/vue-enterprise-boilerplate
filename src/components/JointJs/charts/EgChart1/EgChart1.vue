<!-- This is charting is template for creating multiple charts in jointjs

Handling the Vue component lifecycle

-->

<template>
  <div ref="paperContainer"></div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  onUnmounted //, reactive
} from 'vue'
import * as joint from '@joint/core'
import { CreateLayout, CleanGraph } from '@/components/JointJs/composables/LayoutFactory'
import { createShapesandLinks } from './LocalShapes'
import { localCleanup, localSubscriber } from './LocalSubscriber'

// // Define props for configuration for chart
// const props = defineProps({
//   chartConfig: {
//     type: Object,
//     required: false,
//     default: () => ({
//       // Default chart configuration
//       title: 'Default Chart',
//       description: 'Auto-configured chart'
//     })
//   },
//   width: { type: Number, default: 800 },
//   height: { type: Number, default: 600 },
//   gridSize: { type: Number, default: 10 }
// })

// Computed styles
// const containerStyle = computed(() => ({
//   width: `${props.width}px`,
//   height: `${props.height}px`
// }))

// Create a ref for the container
const paperContainer = ref<HTMLElement | null>(null)
let paper: joint.dia.Paper
let graph: joint.dia.Graph
const default_width = 800
const default_height = 600
const default_gridSize = 10

// Initialize the Paper and add shapes once the component is mounted
onMounted(async () => {
  if (paperContainer.value) {
    // Get container dimensions
    const containerWidth =
      default_width > paperContainer.value.clientWidth
        ? default_width
        : paperContainer.value.clientWidth
    const containerHeight =
      default_height > paperContainer.value.clientHeight
        ? default_height
        : paperContainer.value.clientHeight

    // Initialize the paper and graph using CreateLayout
    const result = CreateLayout(
      paperContainer.value, // Pass the DOM element reference
      containerWidth, // Default width if container width is not available
      containerHeight, // Default height if container height is not available
      default_gridSize // Grid size (10px)
    )

    // Store the paper and graph references
    paper = result.paper
    graph = result.graph

    // Create shapes and links from configuration
    //const { shapes, links } = createShapesandLinks(graph)
    const { shapes } = createShapesandLinks(graph)
    // Initialize NATS subscriber for each shape with its array of topics
    // Pass the shapes object to the subscriber

    await localSubscriber(shapes)
  }
})

onUnmounted(() => {
  // Clean up resources when component is unmounted
  if (paper && graph) {
    CleanGraph(paper, graph)
  }
  localCleanup()
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
