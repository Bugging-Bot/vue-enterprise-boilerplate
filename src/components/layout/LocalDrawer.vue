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
        :draggable="item.draggable || false"
        :class="getDraggableClass(item)"
        @click="handleItemAction(item.action)"
        @dragstart="handleDragStart($event, item)"
        @dragend="handleDragEnd"
      ></v-list-item>
    </v-list>

    <v-list v-else>
      <v-list-item title="Select a tab to view options"></v-list-item>
    </v-list>
    <!-- seperate list -->
    <v-divider></v-divider>

    <!-- Description for draggable items when in builder tab -->
    <div v-if="showDragDescription" class="pa-4">
      <v-alert type="info" variant="tonal" class="text-caption">
        You can drag workflow nodes to the canvas to build your workflow.
      </v-alert>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useEventBusStore } from '@/stores/eventBus'
import { LocalDrawerConfigs } from './LocalDrawerConfigs'
import { useRoute } from 'vue-router'
import useDragAndDrop from '@/components/vueflow/useDragAndDrop'

// Import drag and drop functionality
const { onDragStart, onDragEnd } = useDragAndDrop()

// defining localDrawer as a ref/reactive variable
const localDrawer = ref(false)
// Initialize the event bus store
const eventBus = useEventBusStore()
// Get current route to determine active view
const route = useRoute()
// local/initial state for local drawer visibility is set to hidden
const localDrawerVisible = ref(true)
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

// Check if we should show drag description
const showDragDescription = computed(() => {
  return (
    activeView.value === 'ProcessBuilderView' &&
    activeTab.value === 'builder' &&
    currentConfig.value?.items.some((item) => item.draggable)
  )
})

// Get CSS class for draggable items
const getDraggableClass = (item: { draggable?: boolean; nodeType?: string }) => {
  if (item.draggable) {
    return `vue-flow__node-${item.nodeType || 'default'} draggable-item`
  }
  return ''
}

// Handle drag start for draggable items
const handleDragStart = (event: DragEvent, item: { draggable?: boolean; nodeType?: string }) => {
  if (item.draggable && item.nodeType) {
    onDragStart(event, item.nodeType)
  }
}
// Handle drag end
const handleDragEnd = () => {
  onDragEnd()
}

// Define handleItemAction function
const handleItemAction = (action: string, item?: { draggable?: boolean }) => {
  console.log('Action triggered:', action)
  // Don't trigger click action for draggable items during drag
  if (item?.draggable && action === 'drag-node') {
    return
  }
  // Emit an event with the action to be handled by the appropriate component
  eventBus.emit('drawer-action', {
    action,
    view: activeView.value,
    tab: activeTab.value,
    item: item
  })
}
// Define handleToggleLocalDrawer function
const handleToggleLocalDrawer = (data: { message?: string }) => {
  console.log('Received event:', data)
  if (data?.message) {
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
<style scoped>
.draggable-item {
  cursor: grab;
  user-select: none;
}

.draggable-item:active {
  cursor: grabbing;
}

/* Vue Flow node styles */
.vue-flow__node-input {
  background: #e3f2fd;
  border: 2px solid #2196f3;
  border-radius: 4px;
  padding: 8px;
  margin: 2px 0;
}

.vue-flow__node-default {
  background: #f5f5f5;
  border: 2px solid #9e9e9e;
  border-radius: 4px;
  padding: 8px;
  margin: 2px 0;
}

.vue-flow__node-output {
  background: #e8f5e8;
  border: 2px solid #4caf50;
  border-radius: 4px;
  padding: 8px;
  margin: 2px 0;
}

/* Hover effects for draggable items */
.draggable-item:hover {
  opacity: 0.8;
  transform: translateY(-1px);
  transition: all 0.2s ease;
}

/* Visual feedback during drag */
.draggable-item.dragging {
  opacity: 0.5;
}
</style>
