<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { CreateLayout, CleanGraph } from '@/components/JointJs/composables/LayoutFactory'
import { createShapesInChart } from '@/components/JointJs/charts/MakeSourDoughLoaf/MakeSourDoughLoaf_Shapes'
import * as joint from '@joint/core'

//import { createShapesInChart } from '@/components/JointJs/charts/MakeSourDoughLoaf/MakeSourDoughLoaf_Shapes_simple'

const containerRef = ref<HTMLElement | null>(null)

let paper: joint.dia.Paper | null = null
let graph: joint.dia.Graph | null = null

onMounted(() => {
  if (!containerRef.value) return
  try {
    const layout = CreateLayout(containerRef.value, 1000, 800, 10)
    paper = layout.paper
    graph = layout.graph

    // Load your custom shapes
    createShapesInChart(graph)
  } catch (error) {
    console.error('Error initializing JointJS:', error)
    return
  }
})

onBeforeUnmount(() => {
  if (paper && graph) {
    CleanGraph(paper, graph)
  }
})
</script>

<template>
  <div ref="containerRef" class="diagram-container"></div>
</template>

<style scoped>
.diagram-container {
  width: 100%;
  height: 100vh;
  border: 1px solid #ccc;
}
</style>
