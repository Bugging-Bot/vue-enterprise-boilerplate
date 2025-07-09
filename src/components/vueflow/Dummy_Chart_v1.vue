<!--
  File: FlowCanvas.vue

  About:
  This file defines a Vue component that renders a Vue Flow canvas using custom SVG nodes.
  - Uses `createCustomNode` and `createCustomEdge` from `nodeFactory.ts` for clean node and edge creation.
  - Registers a custom SVG node component (`CustomSvgNode.vue`) with Vue Flow.
-->

<template>
  <div class="flow-container">
    <!-- VueFlow canvas with bound elements and custom node types -->
    <VueFlow v-model="elements" :node-types="nodeTypes" fit-view-on-init />
  </div>
</template>

<script setup lang="ts">
/*
  Section: Imports
  - Vue composition API utilities (`ref`, `markRaw`)
  - Vue Flow core components and styles
  - Custom node component and factory functions
*/
import { ref, markRaw } from 'vue'
import { VueFlow } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

import CustomSvgNode from './CustomSvgNode.vue'
import { createCustomNode, createCustomEdge } from './nodeFactory'

/*
  Section: Custom Node Registration
  - `markRaw` prevents Vue from making the component reactive
  - Node type name must match the `type` used in `createCustomNode`
*/
const nodeTypes = {
  customSvgNode: markRaw(CustomSvgNode)
}

/*
  Section: Node & Edge Definitions
  - Use factory functions to create two custom nodes and one connecting edge
  - Assign custom IDs so the edge can link them correctly
*/
const node1 = createCustomNode(
  'customSvgNode',
  { x: 100, y: 100 },
  {
    label: 'House Node',
    svgPath:
      'M 24.962891 1.0546875 A 1.0001 1.0001 0 0 0 24.384766 1.2636719 L 1.3847656 19.210938 A 1.0005659 1.0005659 0 0 0 2.6152344 20.789062 L 4 19.708984 L 4 46 A 1.0001 1.0001 0 0 0 5 47 L 18.832031 47 A 1.0001 1.0001 0 0 0 19.158203 47 L 30.832031 47 A 1.0001 1.0001 0 0 0 31.158203 47 L 45 47 A 1.0001 1.0001 0 0 0 46 46 L 46 19.708984 L 47.384766 20.789062 A 1.0005657 1.0005657 0 1 0 48.615234 19.210938 L 41 13.269531 L 41 6 L 35 6 L 35 8.5859375 L 25.615234 1.2636719 A 1.0001 1.0001 0 0 0 24.962891 1.0546875 z M 25 3.3222656 L 44 18.148438 L 44 45 L 32 45 L 32 26 L 18 26 L 18 45 L 6 45 L 6 18.148438 L 25 3.3222656 z M 37 8 L 39 8 L 39 11.708984 L 37 10.146484 L 37 8 z M 20 28 L 30 28 L 30 45 L 20 45 L 20 28 z',
    settings: {
      color: 'lightblue',
      strokeColor: 'black',
      strokeWidth: 0.25
    }
  }
  //'node-1' // custom ID
)

const node2 = createCustomNode(
  'customSvgNode',
  { x: 300, y: 100 },
  {
    label: 'Star Node',
    svgPath: 'M12 2L14 8H20L15 12L17 18L12 14L7 18L9 12L4 8H10Z',
    settings: {
      color: 'gold',
      strokeColor: 'orange',
      strokeWidth: 0.25
    }
  }
  //'node-2'
)

const edge1 = createCustomEdge('node1', 'node2')

/*
  Section: Reactive Elements Array
  - Combines all nodes and edges into one reactive array bound to VueFlow
*/
const elements = ref([node1, node2, edge1])
</script>

<style scoped>
/*
  Section: Styles
  - Makes the canvas fill the full viewport
*/
.flow-container {
  width: 100vw;
  height: 100vh;
}
</style>
