<!--
  File: CustomSvgNode.vue

  About:
  This Vue component dynamically renders a custom node in a Vue Flow diagram using an SVG shape.
  In which user provide SVG information in run time.
  It supports dynamic SVG path rendering, customizable styling via props, and connection handles for diagram linking.

  Features:
  - Dynamically renders SVG shapes based on props.
  - Supports customizable color, stroke, and size.
  - Displays a label.
  - Provides multiple connection handles (top, bottom, left, right).
-->

<template>
  <div class="custom-svg-node" :style="nodeStyle">
    <svg
      :width="svgWidth"
      :height="svgHeight"
      :viewBox="viewBox"
      class="node-svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <path :d="svgPath" :fill="fillColor" :stroke="strokeColor" :stroke-width="strokeWidth" />
    </svg>

    <div class="node-label">{{ nodeLabel }}</div>

    <!-- Node connection handles for Vue Flow linking -->
    <Handle type="target" :position="Position.Top" />
    <Handle type="source" :position="Position.Bottom" />
    <Handle type="target" :position="Position.Left" />
    <Handle type="source" :position="Position.Right" />
  </div>
</template>

<script setup lang="ts">
/*
  Imports:
  - Handle & Position from @vue-flow/core for node connections.
  - NodeProps for typing the node props.
  - CSSProperties from Vue for inline styling.
*/
import { computed } from 'vue'
import { Handle, Position, type NodeProps } from '@vue-flow/core'
import type { CSSProperties } from 'vue'
import type { CustomNodeData } from './types'

// Define props with generic NodeProps to support any custom data structure
const props = defineProps<NodeProps<CustomNodeData>>()

// Computed properties with fallback values
const nodeLabel = computed(() => props.data?.label || 'Custom Node')
const svgPath = computed(
  () => props.data?.svgPath || 'M12 2L14 8H20L15 12L17 18L12 14L7 18L9 12L4 8H10Z'
)
const svgWidth = computed(() => props.data?.svgWidth || 60)
const svgHeight = computed(() => props.data?.svgHeight || 60)
const viewBox = computed(() => props.data?.viewBox || '0 0 24 24')

// Handle settings with proper typing, since fillcolor, strokecolor, strokewidth are not explicitly defined in the type, Considering it as part of json object.
const fillColor = computed(() => {
  if (props.data?.settings?.color) return props.data.settings.color
  return '#3b82f6'
})

const strokeColor = computed(() => {
  if (props.data?.settings?.strokeColor) return props.data.settings.strokeColor
  return '#1e40af'
})

const strokeWidth = computed(() => {
  if (props.data?.settings?.strokeWidth !== undefined) return props.data.settings.strokeWidth
  return 0.5
})

// Default SVG path: a simple upward-pointing triangle, not required for this example
// const defaultPath = 'M10 10L20 10L15 0Z'

// Compute inline styles for the SVG node container
const nodeStyle = computed(
  (): CSSProperties => ({
    width: `${svgWidth.value + 20}px`,
    height: `${svgHeight.value + 30}px`,
    borderRadius: '4px',
    backgroundColor: 'transparent',
    border: '1px solid #e5e7eb',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: '4px',
    boxSizing: 'border-box',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    cursor: 'grab'
  })
)
</script>

<style scoped>
.custom-svg-node {
  transition: all 0.2s ease;
}

.custom-svg-node:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15) !important;
  transform: translateY(-1px);
}

.custom-svg-node:active {
  cursor: grabbing !important;
}

.custom-svg-node.selected {
  border-color: #3b82f6 !important;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
}

/* Style for the SVG element */
.node-svg {
  max-width: 100%;
  max-height: 100%;
}

/* Style for the label displayed below the SVG */
.node-label {
  font-size: 11px;
  font-weight: 500;
  text-align: center;
  color: #374151;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.2;
}

.node-handle {
  width: 8px;
  height: 8px;
  background: #6b7280;
  border: 2px solid white;
  border-radius: 50%;
}

.node-handle:hover {
  background: #3b82f6;
  transform: scale(1.2);
}

/* Style overrides for the Vue Flow connection handles */
.vue-flow__handle {
  background: #8a888882;
  width: 5px;
  height: 5px;
}
</style>
