<script setup>
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import DropzoneBackground from '@/components/vueflow/DropzoneBackground.vue'
import Sidebar from '@/components/vueflow/EditorSidebar.vue'
import useDragAndDrop from '@/components/vueflow/useDnD.ts'
import '@/components/vueflow/editor-sidebar.css'
import Icon from '@/components/vueflow/EditorViewIcons.vue'

const { onConnect, addEdges } = useVueFlow()

const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop()

const nodes = ref([])

onConnect(addEdges)
</script>

<template>
  <div class="dnd-flow" @drop="onDrop">
    <VueFlow :nodes="nodes" @dragover="onDragOver" @dragleave="onDragLeave">
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
        </Controls>
      </DropzoneBackground>
    </VueFlow>
    <Sidebar />
  </div>
</template>
