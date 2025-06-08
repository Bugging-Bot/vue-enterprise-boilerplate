<!--
  File: EdgeSettings.vue

  About:
  This component renders a settings panel for customizing an edge in the workflow editor.
  It allows editing the edge's label using a text field input.
-->

<template>
  <!-- Container with padding -->
  <div class="pa-4">
    <!-- Section title -->
    <h3>Edge Settings</h3>

    <!-- Editable text field bound to the edge's label -->
    <v-text-field
      v-if="localLabel !== null"
      v-model="localLabel"
      label="Edge Label"
      outlined
      @blur="emitLabelUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
// Import the type definition for a custom edge
import type { CustomEdge } from './types'

// Accepts a possibly-null CustomEdge
const props = defineProps<{
  item: CustomEdge | null
}>()

// Emit an event to update the label
const emit = defineEmits<{
  (event: 'update-label', label: string): void
}>()

// Internal state for label editing
const localLabel = ref<string | null>(null)

// When the prop changes, sync label
watch(
  () => props.item,
  (newItem) => {
    localLabel.value = newItem?.data?.label ?? ''
  },
  { immediate: true }
)

// Emit event on blur to inform parent
function emitLabelUpdate() {
  if (localLabel.value !== null) {
    emit('update-label', localLabel.value)
  }
}
</script>
