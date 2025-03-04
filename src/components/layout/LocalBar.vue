<!-- local bar listen the event (collapse & expand event) emit from the app bar. -->

<template>
  <v-toolbar title="Local Bar" class="local-bar" elevation="2" density="comfortable">
    <v-spacer></v-spacer>
  </v-toolbar>
</template>

<!-- <script setup lang="ts"> -->
<script lang="ts">
// Component logic can be added here
import { ref } from 'vue'
import { useEventBusStore } from '@/stores/eventBus'
//import { defineComponent } from 'vue'

export const LocalBar = {
  name: 'LocalBar'
  //setup():
}
</script>

<style scoped>
.local-bar {
  background-color: var(--v-surface-variant);
  border-bottom: 1px solid var(--v-border-color);
  transition: max-height 0.3s ease;
  overflow: hidden; /* Hide content when collapsed */
  max-height: 64px; /* Initial expanded height */
}
/* Adjust max-height when collapsed */
.local-bar.collapsed {
  max-height: 16px; /* Collapsed height */
}

/* Ensure consistent text styling */
:deep(.v-toolbar-title) {
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.0125em;
}
</style>
