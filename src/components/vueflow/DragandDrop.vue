<script setup>
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Controls, ControlButton } from '@vue-flow/controls'
import DropzoneBackground from './DropzoneBackground.vue'
// import Sidebar from './EditorSidebar.vue'
import useDragAndDrop from './useDND.ts'
import { useSelection } from './useSelection.ts'
import { useControls } from './useControls'
import { keyboardListener } from './useKeyboard'
import './editor-sidebar.css'
import Icon from './EditorViewIcons.vue'

const { onConnect, addEdges } = useVueFlow()
const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop()
const { selectedNodes, selectedEdges, onNodeSelect, onEdgeSelect } = useSelection()
const { resetTransform, updatePos, dark, toggleDarkMode, logToObject } = useControls()
const { deleteSelected, canDelete } = keyboardListener()

const nodes = ref([])
onConnect(addEdges)

// Optional: Add a manual delete button handler
// const handleManualDelete = () => {
//   const result = deleteSelected()
//   console.log(`Manually deleted ${result.nodes} nodes and ${result.edges} edges`)
// }
</script>

<template>
  <div class="dnd-flow" @drop="onDrop">
    <VueFlow
      :nodes="nodes"
      :selected-nodes="selectedNodes"
      :selected-edges="selectedEdges"
      @node-click="onNodeSelect"
      @edge-click="onEdgeSelect"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
    >
      <DropzoneBackground
        :style="{
          backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',
          transition: 'background-color 0.2s ease'
        }"
      >
        <p v-if="isDragOver">Drop here</p>
        <!-- Controls Component directly inside without wrapping it in a div -->
        <Controls position="top-left">
          <ControlButton title="Reset Transform" @click="resetTransform">
            <Icon name="reset" />
          </ControlButton>

          <ControlButton title="Shuffle Node Positions" @click="updatePos">
            <Icon name="update" />
          </ControlButton>

          <ControlButton title="Toggle Dark Mode" @click="toggleDarkMode">
            <Icon v-if="dark" name="sun" />
            <Icon v-else name="moon" />
          </ControlButton>

          <ControlButton title="Log `toObject`" @click="logToObject">
            <Icon name="log" />
          </ControlButton>

          <!-- Optional: Add manual delete button -->
          <!-- <ControlButton
            title="Delete Selected (Del/Backspace)"
            @click="handleManualDelete"
            :disabled="!canDelete()"
          >
            <Icon name="delete" />
          </ControlButton> -->
        </Controls>
      </DropzoneBackground>
    </VueFlow>
    <!-- <Sidebar /> -->
  </div>
</template>

<style scoped>
/* .dnd-flow {
  height: 100%;
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  z-index: 1000;
  background: white;
} */
</style>
