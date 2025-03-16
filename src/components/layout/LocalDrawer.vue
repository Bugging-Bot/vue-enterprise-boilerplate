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
    <!-- seperate list -->
    <v-divider></v-divider>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useEventBusStore } from '@/stores/eventBus'
import { LocalDrawerConfigs } from './LocalDrawerConfigs'
import { useRoute } from 'vue-router'

// defining localDrawer as a ref/reactive variable
const localDrawer = ref(false)
// Initialize the event bus store
const eventBus = useEventBusStore()
// Get current route to determine active view
const route = useRoute()
// local/initial state for local drawer visibility is set to hidden const localDrawerVisible = ref(true)
// Track the active view
const activeView = ref(getViewNameFromRoute(route.name as string))
// Track the active tab, this is currently set to 'overview'
const activeTab = ref('overview')

// Function to extract view name from route
function getViewNameFromRoute(routeName: string): string {
  // Convert route name to view name (e.g., 'process-builder' -> 'ProcessBuilderView')
  if (!routeName) return 'HomeView' // Default to HomeView

  // Map route names to view names
  const routeToViewMap: Record<string, string> = {
    home: 'HomeView',
    'process-builder': 'ProcessBuilderView',
    messages: 'MessageView',
    simulation: 'SimulationView'
  }

  return routeToViewMap[routeName] || 'HomeView'
}

// Get the current configuration based on active view and tab
const currentConfig = computed(() => {
  const viewConfig = LocalDrawerConfigs[activeView.value]
  if (!viewConfig) return null

  // For views with a single 'default' configuration
  if (viewConfig.default) {
    return viewConfig.default
  }

  // For views with multiple tabs
  return viewConfig[activeTab.value] || null
})

// Define handleItemAction function
const handleItemAction = (action: string) => {
  console.log('Action triggered:', action)
  // Emit an event with the action to be handled by the appropriate component
  eventBus.emit('drawer-action', {
    action,
    view: activeView.value,
    tab: activeTab.value
  })
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

// Define handleViewChange function
const handleViewChange = (viewName: string) => {
  console.log('LocalDrawer received view change:', viewName)
  activeView.value = viewName
  // Reset to default tab when view changes
  activeTab.value = 'overview'
}

// Subscribe to the 'toggle-local-drawer-pub-sub' event when the component mounts
onMounted(() => {
  eventBus.on('toggle-local-drawer', handleToggleLocalDrawer)
  console.log('onMounted: Subscribe to event:toggle-local-drawer')

  // Listen for the correct event name from ProcessBuilderView
  // This handleTavChange to recive current tab value
  eventBus.on('ProcessBuilder-tab-changed', handleTabChange)
  eventBus.on('Home-tab-changed', handleTabChange) // #################################################################why this ?
  // Listen for view change events
  eventBus.on('view-changed', handleViewChange)
  console.log('LocalDrawer subscribed to events and table value is ')

  // Emit initial icon state
  eventBus.emit(
    'local-drawer-icon-change',
    localDrawer.value ? 'mdi-arrow-collapse-right' : 'mdi-arrow-collapse-left'
  )

  // Emit initial view
  eventBus.emit('view-changed', activeView.value)
})
// Unsubscribe from the event when the component unmounts
onUnmounted(() => {
  eventBus.offSpecific('toggle-local-drawer', handleToggleLocalDrawer)
  eventBus.offSpecific('ProcessBuilder-tab-changed', handleTabChange)
  eventBus.offSpecific('Home-tab-changed', handleTabChange)
  eventBus.offSpecific('view-changed', handleViewChange)
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
