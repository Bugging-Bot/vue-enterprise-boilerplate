/** * A draggable list item component for Vue Flow nodes * * @component * @description Renders a
list item that can be dragged to create nodes in a Vue Flow diagram * @prop {DrawerItemType} item -
Configuration for the draggable list item * @emits itemAction - Triggered when the item is clicked,
with the item's action and details */
<template>
  <v-list-item
    :title="item.title"
    :prepend-icon="item.icon"
    :draggable="item.draggable || false"
    :class="draggableClass"
    @click="handleClick"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  ></v-list-item>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DrawerItemType } from '../configs'
import useDragAndDrop from '@/components/vueflow/useDragAndDrop'

interface Props {
  item: DrawerItemType
}

type EmitFn = (event: 'itemAction', action: string, item: DrawerItemType) => void

const emit = defineEmits<EmitFn>()

const props = defineProps<Props>()

const { onDragStart, onDragEnd } = useDragAndDrop()

const draggableClass = computed(() => {
  if (props.item.draggable) {
    return `vue-flow__node-${props.item.nodeType || 'default'} draggable-item`
  }
  return ''
})

const handleClick = () => {
  // Don't trigger click action for draggable items during drag
  if (props.item.draggable && props.item.action === 'drag-node') {
    return
  }
  emit('itemAction', props.item.action, props.item)
}
const handleDragStart = (event: DragEvent) => {
  if (props.item.draggable && props.item.nodeType) {
    onDragStart(event, props.item.nodeType)
  }
}

const handleDragEnd = () => {
  onDragEnd()
}
</script>

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
