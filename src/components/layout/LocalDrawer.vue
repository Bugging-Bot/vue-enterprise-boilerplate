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
    <v-list v-if="currentConfig">
      <v-list-item
        v-for="(item, index) in currentConfig.items"
        :key="index"
        :title="item.title"
        :prepend-icon="item.icon"
        @click="handleItemAction(item.action)"
      ></v-list-item>
    </v-list>

    <v-list v-else>
      <v-list-item title="Select a tab to view options"></v-list-item>
    </v-list>

    <!-- <v-list>
      <v-list-item title="option 1"></v-list-item>
      <v-list-item title="option 2"></v-list-item>
      <v-list-item title="option 3"></v-list-item>
      <v-list-item title="option 4"></v-list-item> -->
    <!-- <v-list-item-title>Messages</v-list-item-title> -->
    <!-- </v-list> -->
    <!-- seperate list -->
    <v-divider></v-divider>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useEventBusStore } from '@/stores/eventBus'
import { LocalDrawerConfigs } from './LocalDrawerConfigs'

// defining localDrawer as a ref/reactive variable
const localDrawer = ref(false)
// Initialize the event bus store
const eventBus = useEventBusStore()
// local/initial state for local drawer visibility is set to hidden
//const localDrawerVisible = ref(true)
// Track the active tab, this is currently set to 'overview'
const activeTab = ref('overview')

const currentConfig = computed(() => {
  return LocalDrawerConfigs[activeTab.value as keyof typeof LocalDrawerConfigs]
})

// Add the missing handleItemAction function
const handleItemAction = (action: string) => {
  console.log('Action triggered:', action)
  // Emit an event with the action to be handled by the appropriate component
  eventBus.emit('drawer-action', { action, tab: activeTab.value })
}
// Define handleToggleLocalDrawer function
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

// Define handleTabChange function BEFORE it's used in onMounted
const handleTabChange = (tabValue: string) => {
  console.log('LocalDrawer received tab change:', tabValue)
  activeTab.value = tabValue
}

// Subscribe to the 'toggle-local-drawer-pub-sub' event when the component mounts
onMounted(() => {
  eventBus.on('toggle-local-drawer', handleToggleLocalDrawer)
  console.log('onMounted: Subscribe to event:toggle-local-drawer')

  // Listen for the correct event name from ProcessBuilderView
  // This handleTavChange to recive current tab value
  eventBus.on('ProcessBuilder-tab-changed', handleTabChange)
  console.log('LocalDrawer subscribed to events and table value is ')

  // Emit initial icon state
  eventBus.emit(
    'local-drawer-icon-change',
    localDrawer.value ? 'mdi-arrow-collapse-right' : 'mdi-arrow-collapse-left'
  )
})
// Unsubscribe from the event when the component unmounts
onUnmounted(() => {
  eventBus.offSpecific('toggle-local-drawer', handleToggleLocalDrawer)
  eventBus.offSpecific('ProcessBuilder-tab-changed', handleTabChange)
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
