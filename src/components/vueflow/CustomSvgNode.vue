<template>
  <div
    class="custom-svg-node"
    :style="{
      width: `${nodeWidth}px`,
      height: `${nodeHeight}px`,
      border: '1px solid #ddd',
      borderRadius: '4px',
      background: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }"
  >
    <svg
      :width="nodeSvgContentWidth"
      :height="nodeSvgContentHeight"
      :viewBox="svgViewBox"
      class="node-svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        :d="data.svgPath || defaultHousePath"
        :fill="data.settings?.color || '#ffffff'"
        :stroke="data.settings?.strokeColor || '#000000'"
        :stroke-width="data.settings?.strokeWidth || 1"
      />
    </svg>

    <div class="node-label">
      {{ data.label }}
    </div>

    <Handle type="target" :position="Position.Top" />
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>

<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import { computed } from 'vue'
import type { CustomNodeData } from './types' // Make sure this path is correct

// Define the props interface for clarity and type safety
interface Props {
  data: CustomNodeData // The data object passed from your Vue Flow node definition
}

// Declare the props using defineProps
const props = defineProps<Props>()

// --- Constants and Computed Properties ---

// The default SVG path to use if no custom path is provided in node data.
// This is the house shape you provided.
const defaultHousePath =
  'M 24.962891 1.0546875 A 1.0001 1.0001 0 0 0 24.384766 1.2636719 L 1.3847656 19.210938 A 1.0005659 1.0005659 0 0 0 2.6152344 20.789062 L 4 19.708984 L 4 46 A 1.0001 1.0001 0 0 0 5 47 L 18.832031 47 A 1.0001 1.0001 0 0 0 19.158203 47 L 30.832031 47 A 1.0001 1.0001 0 0 0 31.158203 47 L 45 47 A 1.0001 1.0001 0 0 0 46 46 L 46 19.708984 L 47.384766 20.789062 A 1.0005657 1.0005657 0 1 0 48.615234 19.210938 L 41 13.269531 L 41 6 L 35 6 L 35 8.5859375 L 25.615234 1.2636719 A 1.0001 1.0001 0 0 0 24.962891 1.0546875 z M 25 3.3222656 L 44 18.148438 L 44 45 L 32 45 L 32 26 L 18 26 L 18 45 L 6 45 L 6 18.148438 L 25 3.3222656 z M 37 8 L 39 8 L 39 11.708984 L 37 10.146484 L 37 8 z M 20 28 L 30 28 L 30 45 L 20 45 L 20 28 z'

// Node's overall dimensions (the size of the entire div container for the node)
const nodeWidth = computed(() => props.data.width || 120)
const nodeHeight = computed(() => props.data.height || 80)

// Dimensions specifically for the SVG content area within the node.
// This allows you to have a node of a certain size, but the SVG graphic
// might only take up a portion of that space, leaving room for labels, padding, etc.
const nodeSvgContentWidth = computed(() => props.data.svgWidth || 80)
const nodeSvgContentHeight = computed(() => props.data.svgHeight || 50)

// Determines the SVG's internal coordinate system, crucial for correct path scaling.
const svgViewBox = computed(() => {
  // Always prioritize a viewBox explicitly provided in the node's data.
  if (props.data.viewBox) {
    return props.data.viewBox
  }
  // If a custom SVG path is provided but no specific viewBox, provide a common default.
  // '0 0 50 50' is a typical viewBox for many simple icon paths.
  if (props.data.svgPath) {
    return '0 0 50 50'
  }
  // This is the viewBox for the `defaultHousePath` if no custom path is given.
  return '0 0 50 50'
})
</script>

<style scoped>
/* Styles for the main node container */
.custom-svg-node {
  /* v-bind allows CSS properties to use reactive variables from <script setup> */
  width: v-bind(nodeWidth + 'px');
  height: v-bind(nodeHeight + 'px');
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative; /* Essential for positioning handles and labels accurately */
  padding: 5px; /* Adds space between the border/edge and the SVG/label */
  box-sizing: border-box; /* Ensures padding is included within the specified width/height */
}

/* Styles for the SVG element within the node */
.node-svg {
  /* The SVG will fill the content area allocated by nodeSvgContentWidth/Height */
  width: 100%;
  height: 100%;
  /* Optional: Remove the border if you don't need it for debugging anymore */
  /* border: 1px solid #ccc; */
}

/* Styles for the node's text label */
.node-label {
  font-size: 12px;
  text-align: center;
  margin-top: 5px; /* Space above the label */
  max-width: calc(100% - 10px); /* Ensures label doesn't exceed node width minus padding */
  overflow: hidden; /* Hides text that overflows max-width */
  text-overflow: ellipsis; /* Adds "..." for overflowed text */
  white-space: nowrap; /* Prevents text from wrapping */
  position: absolute; /* Positions the label relative to .custom-svg-node */
  bottom: 5px; /* Distance from the bottom edge of the node */
  left: 50%; /* Starts the label at 50% from the left */
  transform: translateX(-50%); /* Centers the label horizontally */
  z-index: 10; /* Ensures the label is visible above the SVG if overlapping */
}

/* Default styling for Vue Flow handles. You can override these if needed. */
.vue-flow__handle {
  background: #555;
  border: 1px solid #fff;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
</style>
