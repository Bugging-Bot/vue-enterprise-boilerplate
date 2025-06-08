<!--
  File: OutputTab.vue

  About:
  This component displays the output data of a given node or edge. It shows the `output` property of the `item` (which could be either a `CustomNode` or `CustomEdge`).
  The output data is formatted as a JSON string for easy readability.
-->

<template>
  <div class="pa-4">
    <!-- Section Header for Output -->
    <h3>Output</h3>

    <!-- Displaying the 'output' property as a formatted JSON string -->
    <pre>{{ JSON.stringify(item?.data?.output, null, 2) }}</pre>
    <!-- Using 'JSON.stringify' to format the output with indentation for readability -->
  </div>
</template>

<script setup lang="ts">
// Importing types for the node and edge
import type { CustomNode, CustomEdge } from './types'

// Define props that the component will receive (item can be a CustomNode, CustomEdge, or null)
defineProps<{
  item: CustomNode | CustomEdge | null // The item (node or edge) whose output will be displayed
}>()
</script>
