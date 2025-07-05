<template>
  <div class="custom-svg-node" :style="nodeStyle">
    <svg
      :width="data.svgWidth || 60"
      :height="data.svgHeight || 60"
      :viewBox="data.viewBox || '0 0 50 50'"
      class="node-svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        :d="data.svgPath || defaultPath"
        :fill="data.settings?.color || '#ffffff'"
        :stroke="data.settings?.strokeColor || '#000000'"
        :stroke-width="data.settings?.strokeWidth || 1"
      />
    </svg>

    <div class="node-label">{{ data.label }}</div>
    <!-- This is for connectors of nodes -->
    <Handle type="target" :position="Position.Top" />
    <Handle type="source" :position="Position.Bottom" />
    <Handle type="target" :position="Position.Left" />
    <Handle type="source" :position="Position.Right" />
  </div>
</template>

<script setup lang="ts">
import { Handle, Position, type NodeProps } from '@vue-flow/core'
import type { CSSProperties } from 'vue'

const props = defineProps<NodeProps<any>>() // Keep generic for flexibility

//const { data } = props

const defaultPath = 'M10 10L20 10L15 0Z' // Simple triangle

const nodeStyle: CSSProperties = {
  width: `${props.data.width || 100}px`,
  height: `${props.data.height || 80}px`,
  // border: '1px solid #ccc',
  borderRadius: '4px', // Adjust as needed 4px
  backgroundColor: 'transparent',
  display: 'flex',
  flexDirection: 'column', //column, row, row-column, row-reverse
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  padding: '1px',
  boxSizing: 'border-box'
}
</script>

<style scoped>
.node-svg {
  max-width: 100%;
  max-height: 100%;
}

.node-label {
  font-size: 10px;
  margin-top: 2px;
  text-align: center;
}

.vue-flow__handle {
  background: #8a888882;
  /* border: 1px solid #fff; */
  width: 5px;
  height: 5px;
  /* border-radius: 90%; */
}
</style>
