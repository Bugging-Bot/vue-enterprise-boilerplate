<!--
  File: EditorSidebar.vue

  About:
  This component renders a list of draggable nodes (Input, Default, Output) that can be
  dragged onto the main canvas in a Vue Flow editor. It uses custom drag-and-drop logic.
-->

<script setup lang="ts">
// Import the custom drag-and-drop functionality
import useDragAndDrop from './useDragAndDrop'

// Destructure the onDragStart function for handling drag start events
const { onDragStart } = useDragAndDrop()
</script>

<template>
  <!-- Sidebar or container for draggable nodes -->
  <aside>
    <!-- Description text explaining the drag behavior -->
    <div class="description">You can drag these nodes to the pane.</div>

    <!-- Container for draggable nodes -->
    <div class="nodes">
      <!-- Input Node (draggable with custom drag handler) -->
      <div class="vue-flow__node-input" :draggable="true" @dragstart="onDragStart($event, 'input')">
        Input Node
      </div>

      <!-- Default Node (draggable with custom drag handler) -->
      <div
        class="vue-flow__node-default"
        :draggable="true"
        @dragstart="onDragStart($event, 'default')"
      >
        Default Node
      </div>

      <!-- Output Node (draggable with custom drag handler) -->
      <div
        class="vue-flow__node-output"
        :draggable="true"
        @dragstart="onDragStart($event, 'output')"
      >
        Output Node
      </div>
    </div>
  </aside>
</template>
