<!--
  Shape Information Drawer Component
  Displays selected shape properties in a collapsible side drawer
-->
<template>
  <v-navigation-drawer
    v-model="localDrawer"
    :location="'right'"
    :title="'local navigation bar'"
    permanent
  >
    <v-list-item title="local navigat bar"></v-list-item>
    <v-divider></v-divider>
    <v-list>
      <v-list-item title="option 1"></v-list-item>
      <v-list-item title="option 2"></v-list-item>
      <v-list-item title="option 3"></v-list-item>
      <v-list-item title="option 4"></v-list-item>
      <!-- <v-list-item-title>Messages</v-list-item-title> -->
    </v-list>
    <!-- seperate list -->
    <v-divider></v-divider>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useEventBusStore } from '@/stores/eventBus'
// defining localDrawer as a ref/reactive variable
const localDrawer = ref(false)
// Initialize the event bus store
const eventBus = useEventBusStore()
// local/initial state for local drawer visibility is set to hidden
//const localDrawerVisible = ref(true)

const handleToggleLocalDrawer = (data: any) => {
  console.log('Received event:', data)
  if (data && data.message) {
    localDrawer.value = !localDrawer.value
    // Emit event to change icon in AppBar
    eventBus.emit(
      'local-drawer-icon-change',
      localDrawer.value ? 'mdi-arrow-collapse-right' : 'mdi-arrow-collapse-left'
    )
  }
}
// Subscribe to the 'toggle-local-drawer-pub-sub' event when the component mounts
onMounted(() => {
  eventBus.on('toggle-local-drawer', handleToggleLocalDrawer)
  console.log('onMounted: Subscribe to event:toggle-local-drawer')
  // Emit initial icon state
  eventBus.emit(
    'local-drawer-icon-change',
    localDrawer.value ? 'mdi-arrow-collapse-right' : 'mdi-arrow-collapse-left'
  )
})
// Unsubscribe from the event when the component unmounts
onUnmounted(() => {
  eventBus.offSpecific('toggle-local-drawer', handleToggleLocalDrawer)
  console.log('onUnmounted: Unsubscribe from event:toggle-local-drawer')
})
</script>

<!-- <style scoped>
.color-preview {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid #ddd;
}
</style> -->
