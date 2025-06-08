<template>
  <div class="vue-flow-editor">
    <div v-if="localItem">
      <!-- Display local item data -->
      {{ localItem.data?.label }}
    </div>
    <!-- Your Vue Flow content -->
  </div>
</template>

<script setup lang="ts">
import { VueFlow } from '@vue-flow/core'
import { useVueFlowState } from './useVueFlowState'
import type { CustomNode, CustomEdge } from './types'

// Use the composable
const { localItem, setLocalItem, clearLocalItem } = useVueFlowState()

// Node types based on your existing pattern
const nodeTypes = ['input', 'output', 'default', 'custom']

// Handle node selection
const onNodeClick = (event: any) => {
  const node = event.node as CustomNode
  setLocalItem(node)
}

// Handle edge selection
const onEdgeClick = (event: any) => {
  const edge = event.edge as CustomEdge
  setLocalItem(edge)
}
</script>
