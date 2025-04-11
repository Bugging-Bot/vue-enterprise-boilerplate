<!--
  Shape Context Menu Component
  Displays a popup menu with detailed shape properties and actions
  Provides interactive options for shape manipulation
-->
<script setup lang="ts">
import { computed } from 'vue'
import { dia } from '@joint/core'

interface Props {
  position: { x: number; y: number }
  shape: dia.Element | null
  isVisible: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'action', 'update:isVisible'])

// Computed shape properties for display
const shapeInfo = computed(() => {
  if (!props.shape) return null

  const position = props.shape.position()
  const size = props.shape.size()
  const attrs = props.shape.attr()

  return {
    id: props.shape.id,
    type: props.shape.get('type'),
    position: `(${position.x}, ${position.y})`,
    size: `${size.width} x ${size.height}`,
    color: attrs?.body?.fill || 'None',
    zIndex: props.shape.get('z') || 0
  }
})

const handleAction = (action: string) => {
  emit('action', { action, shapeId: props.shape?.id })
}
</script>

<template>
  <v-dialog
    :model-value="isVisible"
    @update:model-value="$emit('update:isVisible', $event)"
    max-width="400"
  >
    <v-card>
      <v-card-title class="headline"> Shape Properties </v-card-title>

      <v-card-text v-if="shapeInfo">
        <v-list dense>
          <v-list-item>
            <v-list-item-title>ID:</v-list-item-title>
            <v-list-item-subtitle>{{ shapeInfo.id }}</v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Type:</v-list-item-title>
            <v-list-item-subtitle>{{ shapeInfo.type }}</v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Position:</v-list-item-title>
            <v-list-item-subtitle>{{ shapeInfo.position }}</v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Size:</v-list-item-title>
            <v-list-item-subtitle>{{ shapeInfo.size }}</v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Color:</v-list-item-title>
            <v-list-item-subtitle>
              <div class="d-flex align-center">
                {{ shapeInfo.color }}
                <div
                  v-if="shapeInfo.color !== 'None'"
                  class="color-preview ml-2"
                  :style="{ backgroundColor: shapeInfo.color }"
                />
              </div>
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="handleAction('edit')"> Edit </v-btn>
        <v-btn color="error" @click="handleAction('delete')"> Delete </v-btn>
        <v-btn color="grey" @click="$emit('close')"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.color-preview {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid #ddd;
}
</style>
