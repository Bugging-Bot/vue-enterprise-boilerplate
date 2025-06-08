<!--
  File: LogicCodeEditor.vue

  About:
  This component allows users to define the logic (code) of a node or edge in a flow editor.
  Users can select the programming language (JavaScript, Python, Golang, Temporal) and enter their code.
-->

<template>
  <div class="pa-4">
    <!-- Section Header for Logic Code Editor -->
    <h3>Logic Code</h3>

    <!-- Dropdown to select programming language (Javascript, Python, Golang, Temporal)
     v-model="logicType": Binds the selected language type to the logicType variable
      :items="['javascript', 'python', 'golang', 'temporal']" : Available language options
      label="Code Type"  : Label for the dropdown
      outlined  : Makes the dropdown outlined
     -->
    <v-select
      v-model="logicType"
      :items="['javascript', 'python', 'golang', 'temporal']"
      label="Code Type"
      outlined
    />

    <!-- Textarea for the user to input their code
     v-model="code"  : Binds the code text input to the code variable
     label="Code"  :Label for the textarea
      rows="10"  : Sets the number of visible rows in the textarea
      outlined  :Makes the textarea outlined
     -->
    <v-textarea v-model="code" label="Code" rows="10" outlined />
  </div>
</template>

<script setup lang="ts">
// Import necessary functions and types
import { ref, watch } from 'vue'
import type { CustomNode, CustomEdge, DialogType } from './types'

// Define the props that the component will receive
const props = defineProps<{
  item: CustomNode | CustomEdge | null // The item (node or edge) being edited
  type: DialogType // Type of dialog (node, edge, or background)
}>()

// Reactive references to manage logic type and code content
const logicType = ref('javascript') // Default language is JavaScript
const code = ref('') // Default empty code content

// Watch for changes in the item prop to update logicType and code
watch(
  () => props.item, // Watch the 'item' prop for changes
  (newItem) => {
    if (newItem?.data) {
      // If the item has data
      // Update logicType and code based on the item data
      logicType.value = newItem.data.logicType || 'javascript' // Set the language type
      code.value = newItem.data.code || '' // Set the code content
    }
  },
  { immediate: true } // Run the watcher immediately upon component mount
)
</script>
