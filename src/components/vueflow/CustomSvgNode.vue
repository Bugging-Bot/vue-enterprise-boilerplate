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
import { Handle, Position, type NodeProps } from '@vue-flow/core' // <--- IMPORT NodeProps HERE
import { computed, onMounted } from 'vue' // Import onMounted for lifecycle logs
import type { CustomNodeData } from './types'

console.log('CustomSvgNode.vue: Initializing')
// Define the props interface for clarity and type safety
// It MUST extend NodeProps from @vue-flow/core
// The generic <CustomNodeData> tells NodeProps that its 'data' property will be of this type.
interface Props extends NodeProps<CustomNodeData> {
  // You don't need to explicitly declare 'data' here, as it's part of NodeProps<CustomNodeData>
}

// Declare the props using defineProps
const props = defineProps<Props>()

// Add a log for when this component is instantiated, using props.id which comes from NodeProps
console.log(
  `CustomSvgNode.vue: Initializing node with ID: ${props.id} and label: ${props.data.label}`
)

onMounted(() => {
  console.log(`CustomSvgNode.vue: Node mounted. ID: ${props.id}`)
})

// --- Constants and Computed Properties ---

const defaultHousePath =
  'M 24.962891 1.0546875 A 1.0001 1.0001 0 0 0 24.384766 1.2636719 L 1.3847656 19.210938 A 1.0005659 1.0005659 0 0 0 2.6152344 20.789062 L 4 19.708984 L 4 46 A 1.0001 1.0001 0 0 0 5 47 L 18.832031 47 A 1.0001 1.0001 0 0 0 19.158203 47 L 30.832031 47 A 1.0001 1.0001 0 0 0 31.158203 47 L 45 47 A 1.0001 1.0001 0 0 0 46 46 L 46 19.708984 L 47.384766 20.789062 A 1.0005657 1.0005657 0 1 0 48.615234 19.210938 L 41 13.269531 L 41 6 L 35 6 L 35 8.5859375 L 25.615234 1.2636719 A 1.0001 1.0001 0 0 0 24.962891 1.0546875 z M 25 3.3222656 L 44 18.148438 L 44 45 L 32 45 L 32 26 L 18 26 L 18 45 L 6 45 L 6 18.148438 L 25 3.3222656 z M 37 8 L 39 8 L 39 11.708984 L 37 10.146484 L 37 8 z M 20 28 L 30 28 L 30 45 L 20 45 L 20 28 z'

const nodeWidth = computed(() => props.data.width || 120)
const nodeHeight = computed(() => props.data.height || 80)

const nodeSvgContentWidth = computed(() => props.data.svgWidth || 80)
const nodeSvgContentHeight = computed(() => props.data.svgHeight || 50)

const svgViewBox = computed(() => {
  if (props.data.viewBox) {
    return props.data.viewBox
  }
  if (props.data.svgPath) {
    return '0 0 50 50'
  }
  return '0 0 50 50'
})
</script>

<style scoped>
.custom-svg-node {
  width: v-bind(nodeWidth + 'px');
  height: v-bind(nodeHeight + 'px');
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 5px;
  box-sizing: border-box;
  background-color: #fff9e6;
  border: 2px solid #ffcc00;
}

.node-svg {
  width: 100%;
  height: 100%;
}

.node-label {
  font-size: 12px;
  text-align: center;
  margin-top: 5px;
  max-width: calc(100% - 10px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.vue-flow__handle {
  background: #555;
  border: 1px solid #fff;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
</style>
