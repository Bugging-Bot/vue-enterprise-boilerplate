<!--
  File: NodeSettings.vue

  About:
  This component allows users to configure settings for a node in the flow editor.
  Users can modify the node's label and type (e.g., default, input, output, custom).
-->

<template>
  <div class="pa-4" v-if="item">
    <!-- Section Header for Node Settings -->
    <!-- Input field for setting the node label -->
    <!-- Binds to the 'label' property of the node's data -->
    <!-- Label for the text field -->
    <!-- Makes the text field outlined -->
    <h3>Node Settings</h3>
    <v-text-field v-model="localLabel" label="Node Label" outlined />

    <!-- Dropdown for selecting the node type -->
    <!-- Binds to the 'type' of the node -->
    <!-- Array of available node types -->
    <!-- Label for the dropdown -->
    <!-- Makes the dropdown outlined -->
    <v-select v-model="localType" :items="nodeTypes" label="Node Type" outlined />
    <v-select v-model="localSvgPath" :items="svgPath" label="Svg d Path" outlined />
    <v-select v-model="localSvgWidth" :items="svgWidth" label="Svg Width" outlined />
    <v-select v-model="localSvgHeight" :items="svgHeight" label="Svg Height" outlined />
    <v-select v-model="localViewBox" :items="svgViewBox" label="View Box" outlined />
    <v-select
      v-model="localSettings"
      :items="Object.entries(svgSettings)"
      label="Settings"
      outlined
    />
    <!-- <v-select v-model="localSvgPath" :items="svgPath" label="Svg d Path" outlined /> update this -->
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
// Importing the CustomNode type from types
import type { CustomNode, JSONObject } from './types'

const props = defineProps<{
  item: CustomNode | null
}>()

const emit = defineEmits<{
  (e: 'update:item', updatedNode: CustomNode): void
}>()

const nodeTypes = ['default', 'input', 'output', 'custom']
const svgPath = ['M12 2L14 8H20L15 12L17 18L12 15L7 18L9 12L4 8H10L12 2Z']
const svgWidth = ['60']
const svgHeight = ['60']
const svgViewBox = ['0 0 60 60']
const svgSettings: JSONObject = {
  name: 'John',
  age: 30,
  active: true,
  items: ['a', 'b', 'c'],
  metadata: { created: '2023-01-01' }
}

// Local copies of label and type for editing
const localLabel = ref('')
const localType = ref('default')
const localSvgPath = ref('')
const localSvgWidth = ref('')
const localSvgHeight = ref('')
const localViewBox = ref('')
const localSettings = ref('')

// Watch for changes to props.item and update local refs
watch(
  () => props.item,
  (newItem) => {
    if (newItem) {
      localLabel.value = newItem.data?.label || ''
      localType.value = newItem.type || 'default'
    }
  },
  { immediate: true }
)

// Watch localLabel and localType, emit update event with updated node
watch([localLabel, localType], () => {
  if (!props.item) return

  // Create updated node object
  const updatedNode: CustomNode = {
    ...props.item,
    type: localType.value,
    data: {
      ...props.item.data,
      label: localLabel.value,
      localItem: props.item.data?.localItem ?? null // force it to be null if undefined
    }
  }
  emit('update:item', updatedNode)
})
</script>
