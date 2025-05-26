/** * LocalDrawer component for displaying shape properties in a collapsible side drawer * *
@description Renders a right-side navigation drawer with configurable header, content, and
description * Manages workflow name, drawer state, and handles item actions through event bus * *
@component * @example *
<LocalDrawer />
*/
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
    <!-- Header Section -->
    <DrawerHeader
      :title="currentConfig?.title"
      :description="currentConfig?.description"
      :show-workflow-name-input="currentConfig?.showWorkflowNameInput"
      v-model:workflow-name="workflowName"
      @workflow-name-change="handleWorkflowNameChange"
    />

    <!-- Content Section -->
    <DrawerContent :config="currentConfig" @item-action="handleItemAction" />

    <!-- Separator -->
    <v-divider></v-divider>

    <!-- Description Section -->
    <DrawerDescription :show-description="showDragDescription" />
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useEventBusStore } from '@/stores/eventBus'
import type { DrawerItemType } from '../configs'

// Import modular components
import { DrawerHeader, DrawerContent, DrawerDescription } from '.'

// Import modular composables
import { useLocalDrawer, useDrawerConfig, useDrawerEvents, useWorkflowName } from '../composables'

// Initialize composables
const { localDrawer, handleToggleLocalDrawer, emitIconChange } = useLocalDrawer()

const {
  activeView,
  activeTab,
  currentConfig,
  showDragDescription,
  handleTabChange,
  handleViewChange
} = useDrawerConfig()

const { workflowName, handleWorkflowNameChange } = useWorkflowName(activeView, activeTab)

// Setup event handling
useDrawerEvents(
  handleToggleLocalDrawer,
  handleTabChange,
  handleViewChange,
  emitIconChange,
  activeView
)

// Initialize event bus
const eventBus = useEventBusStore()

// Handle item actions
const handleItemAction = (action: string, item?: DrawerItemType) => {
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
    item: item,
    workflowName: workflowName.value
  })
}
</script>

<style scoped>
/* Main drawer styles - keeping minimal styles here since components have their own */
.v-navigation-drawer {
  border-left: 1px solid rgba(var(--v-border-color), 0.12);
}
</style>
