<!--
  File: DragandDrop.vue

  About:
  This component defines the main visual editor for a workflow canvas using Vue Flow.
  It includes features like drag-and-drop, node/edge selection, keyboard shortcuts,
  dark mode toggle, and a custom property dialog.
-->

<script setup lang="ts">
// Vue and VueFlow imports
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Controls, ControlButton } from '@vue-flow/controls'

// Local components and utilities
import DropzoneBackground from './DropzoneBackground.vue'
import PropertyDialog from './PropertyDialog.vue'
import Sidebar from './EditorSidebar.vue'
import useDragAndDrop from '@/components/vueflow/useDND'
import { useSelection } from '@/components/vueflow/useSelection'
import { useControls } from '@/components/vueflow/useControls'
import { keyboardListener } from './useKeyboard'
import { usePropertyDialog } from './usePropertyDialog'
import { CustomNode, CustomEdge } from './types'
import './editor-sidebar.css'
import Icon from './EditorViewIcons.vue'

// VueFlow API: connecting edges
const { onConnect, addEdges } = useVueFlow()

// Drag and drop behavior handlers
const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop()

// Node and edge selection logic
const { selectedNodes, selectedEdges, onNodeSelect, onEdgeSelect } = useSelection()

// Custom editor controls (reset, dark mode, shuffle, etc.)
const { resetTransform, updatePos, dark, toggleDarkMode, logToObject } = useControls()

// Keyboard shortcut handlers
const { deleteSelected, canDelete } = keyboardListener()

// Dialog management for node/edge/background properties
const { openPropertyDialog } = usePropertyDialog()

// Reactive node and edge lists
const nodes = ref<CustomNode[]>([])
const edges = ref<CustomEdge[]>([])

// Register the connect handler
onConnect(addEdges)

// Optional: Manual delete handler (commented out for now)
// const handleManualDelete = () => {
//   const result = deleteSelected()
//   console.log(`Manually deleted ${result.nodes} nodes and ${result.edges} edges`)
// }
</script>

<template>
  <!-- Main container for drag-and-drop flow editor -->
  <div class="dnd-flow" @drop="onDrop">
    <VueFlow
      :nodes="nodes"
      :edges="edges"
      :selected-nodes="selectedNodes"
      :selected-edges="selectedEdges"
      @node-click="onNodeSelect"
      @edge-click="onEdgeSelect"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @node-double-click="openPropertyDialog"
      @edge-double-click="openPropertyDialog"
      @pane-double-click="openPropertyDialog"
    >
      <!-- Custom background dropzone with drag indicator -->
      <DropzoneBackground
        :style="{
          backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',
          transition: 'background-color 0.2s ease'
        }"
      >
        <!-- Text shown during file drag -->
        <p v-if="isDragOver">Drop here</p>

        <!-- Canvas controls (top-left corner) -->
        <Controls position="top-left">
          <!-- Reset view transformation -->
          <ControlButton title="Reset Transform" @click="resetTransform">
            <Icon name="reset" />
          </ControlButton>

          <!-- Shuffle node positions randomly -->
          <ControlButton title="Shuffle Node Positions" @click="updatePos">
            <Icon name="update" />
          </ControlButton>

          <!-- Toggle dark/light mode -->
          <ControlButton title="Toggle Dark Mode" @click="toggleDarkMode">
            <Icon v-if="dark" name="sun" />
            <Icon v-else name="moon" />
          </ControlButton>

          <!-- Log current canvas state to console -->
          <ControlButton title="Log `toObject`" @click="logToObject">
            <Icon name="log" />
          </ControlButton>

          <!-- Optional: Delete selected elements via button -->
          <!--
          <ControlButton
            title="Delete Selected (Del/Backspace)"
            @click="handleManualDelete"
            :disabled="!canDelete()"
          >
            <Icon name="delete" />
          </ControlButton>
          -->
        </Controls>
      </DropzoneBackground>
    </VueFlow>

    <!-- Sidebar component (currently commented out) -->
    <!-- <Sidebar /> -->

    <!-- Property dialog for node/edge/background editing -->
    <PropertyDialog />
  </div>
</template>

<style scoped>
/*
.dnd-flow {
  height: 100%;
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  z-index: 1000;
  background: white;
}
*/
</style>
