<!--
  File: DropzoneBackground.vue

  About:
  This component wraps the Vue Flow canvas with a grid background and an overlay
  slot area. It's used to provide a visual structure and act as a drop target
  for drag-and-drop operations in the editor.
-->

<script lang="ts" setup>
// Import Vue Flow's background grid component
import { Background } from '@vue-flow/background'
</script>

<template>
  <!-- Main container for the dropzone background -->
  <div class="dropzone-background">
    <!-- Grid background with defined gap and color -->
    <Background :size="2" :gap="20" pattern-color="#BDBDBD" />

    <!-- Overlay slot for rendering children (e.g., controls or instructions) -->
    <div class="overlay">
      <slot />
    </div>
  </div>
</template>
