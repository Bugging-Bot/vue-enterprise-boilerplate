<template>
  <div class="flow-container">
    <VueFlow
      v-model:elements="elements"
      :node-types="nodeTypes"
      fit-view-on-init
      class="vue-flow-theme"
    >
    </VueFlow>
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue'
import {
  VueFlow,
  type Elements, // This type is crucial now for `v-model:elements`
  type Edge, // Still useful if you want to define specific edge types
  type NodeTypesObject
} from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

import CustomSvgNode from './CustomSvgNode.vue'
// No need to import CustomNodeData here if not explicitly typing refs with it.
// import type { CustomNodeData } from './types';

console.log('Dummy_Chart loaded')

const defaultHousePath =
  'M 24.962891 1.0546875 A 1.0001 1.0001 0 0 0 24.384766 1.2636719 L 1.3847656 19.210938 A 1.0005659 1.0005659 0 0 0 2.6152344 20.789062 L 4 19.708984 L 4 46 A 1.0001 1.0001 0 0 0 5 47 L 18.832031 47 A 1.0001 1.0001 0 0 0 19.158203 47 L 30.832031 47 A 1.0001 1.0001 0 0 0 31.158203 47 L 45 47 A 1.0001 1.0001 0 0 0 46 46 L 46 19.708984 L 47.384766 20.789062 A 1.0005657 1.0005657 0 1 0 48.615234 19.210938 L 41 13.269531 L 41 6 L 35 6 L 35 8.5859375 L 25.615234 1.2636719 A 1.0001 1.0001 0 0 0 24.962891 1.0546875 z M 25 3.3222656 L 44 18.148438 L 44 45 L 32 45 L 32 26 L 18 26 L 18 45 L 6 45 L 6 18.148438 L 25 3.3222656 z M 37 8 L 39 8 L 39 11.708984 L 37 10.146484 L 37 8 z M 20 28 L 30 28 L 30 45 L 20 45 L 20 28 z'
const starSvgDPath =
  'M12 2 L14.72 8.28 L21.78 8.92 L16.4 13.78 L18.06 20.88 L12 17.5 L5.94 20.88 L7.6 13.78 L2.22 8.92 L9.28 8.28 Z'

// --- Combined Elements (Nodes and Edges) ---
// Renamed `nodes` to `elements` for clarity since it holds both
const elements = ref<Elements>([
  // Nodes
  {
    id: 'node-house-1',
    type: 'customSvgNode',
    position: { x: 100, y: 100 },
    data: {
      label: 'Main House',
      svgPath: defaultHousePath,
      viewBox: '0 0 50 50',
      width: 100,
      height: 100,
      svgWidth: 80,
      svgHeight: 70,
      settings: {
        color: 'lightblue',
        strokeColor: 'darkblue',
        strokeWidth: 2
      }
    }
  },
  {
    id: 'node-star-1',
    type: 'customSvgNode',
    position: { x: 300, y: 100 },
    data: {
      label: 'Feature Star',
      svgPath: starSvgDPath,
      viewBox: '0 0 24 24',
      width: 80,
      height: 80,
      svgWidth: 70,
      svgHeight: 70,
      settings: {
        color: 'gold',
        strokeColor: 'orange',
        strokeWidth: 1.5
      }
    }
  },
  {
    id: 'node-default-1',
    type: 'customSvgNode',
    position: { x: 200, y: 300 },
    data: {
      label: 'Default Shape',
      width: 120,
      height: 80,
      settings: {
        color: '#e0e0e0'
      }
    }
  },
  {
    id: 'node-standard-1',
    type: 'default',
    position: { x: 450, y: 300 },
    data: { label: 'Standard Flow Node' }
  },

  // Edges (Note: Edges don't have 'position' or 'data' or 'type' in the same way nodes do)
  {
    id: 'e1-2',
    source: 'node-house-1',
    target: 'node-star-1'
    // No 'type', 'position', or 'data' properties like nodes here.
    // If you need custom edge types, you'd define them with `edge-types` prop and use a `type` string.
  } as Edge, // <-- Explicitly cast to Edge to satisfy TypeScript and ESLint
  {
    id: 'e2-3',
    source: 'node-star-1',
    target: 'node-default-1'
  } as Edge,
  {
    id: 'e3-4',
    source: 'node-default-1',
    target: 'node-standard-1'
  } as Edge
])

// --- Register Custom Node Type ---
const nodeTypes: NodeTypesObject = {
  customSvgNode: markRaw(CustomSvgNode)
}
</script>

<style scoped>
.flow-container {
  height: 100vh;
  width: 100vw;
  display: flex;
}

.vue-flow__renderer {
  background-color: #f0f0f0;
  width: 100%;
  height: 100%;
}
</style>
