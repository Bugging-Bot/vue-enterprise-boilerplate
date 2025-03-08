<!-- local bar listen the event (collapse & expand event) emit from the app bar. -->

<template>
  <v-card class="local-bar-container">
    <div class="local-bar" :class="{ collapsed: !localBarVisible }">
      <!-- Toggle 'collapsed' class based on state -->
      <v-tabs v-model="activeTab">
        <v-tab value="overview">Overview</v-tab>
        <v-tab value="parts">Parts</v-tab>
        <v-tab value="process">Process</v-tab>
        <v-tab value="adminstration">adminstration</v-tab>
      </v-tabs>
    </div>
    <v-card-text>
      <v-tabs-window v-model="activeTab">
        <v-tabs-window-item value="overview"> Overview </v-tabs-window-item>

        <v-tabs-window-item value="parts"> Parts </v-tabs-window-item>

        <v-tabs-window-item value="process"> Process </v-tabs-window-item>

        <v-tabs-window-item value="adminstration"> Adminstration </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useEventBusStore } from '@/stores/eventBus'
import { onMounted, ref, onUnmounted } from 'vue'

// Initialize the event bus store
const eventBus = useEventBusStore()

// Local/initial state for local bar visibility is set to hidden
const localBarVisible = ref(true)
const activeTab = ref('overview')
// data is the object { message: true }
// data.message: This accesses the message property of the data object. i.e value of message.
// Event handler for the toggle event
const handleToggleLocalBar = (data: any) => {
  console.log('Received event:', data)
  /*
  If the event payload (data) is defined and exists.
  If the message property within the event payload is truthy (not false, null, undefined, etc.)
  */
  if (data && data.message) {
    localBarVisible.value = !localBarVisible.value
    //localBarVisible.value = data.message // updated to use the message property for icon in app bar
    // Emit event to change icon in AppBar
    eventBus.emit(
      'local-bar-icon-change',
      localBarVisible.value ? 'mdi-arrow-collapse-up' : 'mdi-arrow-collapse-down'
    )
  }
}

// Subscribe to the 'toggle-local-bar-pub-sub' event when the component mounts
onMounted(() => {
  eventBus.on('toggle-local-bar', handleToggleLocalBar)
  // Emit initial icon state
  eventBus.emit(
    'local-bar-icon-change',
    localBarVisible.value ? 'mdi-arrow-collapse-up' : 'mdi-arrow-collapse-down'
  )
  console.log('OnMounted: Subscribed to event')
})

// Unsubscribe from the event when the component unmounts to prevent memory leaks
onUnmounted(() => {
  eventBus.offSpecific('toggle-local-bar', handleToggleLocalBar)
  console.log('OnUmounted: Unsubscribe to event')
})
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
