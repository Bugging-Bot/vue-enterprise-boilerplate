<!--
  Shape Information Drawer Component
  Displays selected shape properties in a collapsible side drawer
-->
<template>
  <div style="position: relative">
    <v-navigation-drawer
      v-if="modelValue"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      location="right"
      width="200"
    >
      <v-card flat>
        <v-card-title class="text-h6 py-2 d-flex align-center">
          Shape Properties
          <v-spacer></v-spacer>
          <v-btn
            icon
            size="small"
            @click="$emit('update:modelValue', false)"
            plain
            style="
              position: absolute;
              top: 10px;
              right: 0;
              z-index: 100;
              border: none !important; /* Add this */
              background: transparent !important; /* Add this */
              box-shadow: none !important; /* Add this */
              outline: none !important; /* Add this */
            "
          >
            <v-icon>mdi-arrow-collapse-right</v-icon>
          </v-btn>
        </v-card-title>

        <!-- seperate list -->
        <v-divider></v-divider>

        <v-card-text v-if="shapeInfo" class="py-2">
          <!-- List of shape properties -->
          <v-list>
            <v-list-item>
              <v-list-item-title>ID</v-list-item-title>
              <!-- <v-list-item-subtitle>{{ shapeInfo.id }}</v-list-item-subtitle> -->
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Type</v-list-item-title>
              <!-- <v-list-item-subtitle>{{ shapeInfo.type }}</v-list-item-subtitle> -->
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Position</v-list-item-title>
              <!-- <v-list-item-subtitle>{{ shapeInfo.position }}</v-list-item-subtitle> -->
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Size</v-list-item-title>
              <!-- <v-list-item-subtitle>{{ shapeInfo.size }}</v-list-item-subtitle> -->
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Color</v-list-item-title>
              <!-- <v-list-item-subtitle class="d-flex align-center">
                {{ shapeInfo.color }}
                <div
                  v-if="shapeInfo.color !== 'None'"
                  class="color-preview ml-2"
                  :style="{ backgroundColor: shapeInfo.color }"
                ></div>
              </v-list-item-subtitle> -->
            </v-list-item>
          </v-list>

          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn color="primary" @click="$emit('action', 'edit')"> Edit </v-btn>
            <v-btn color="error" @click="$emit('action', 'delete')"> Delete </v-btn> -->
          </v-card-actions>
        </v-card-text>

        <v-card-text v-else class="text-center py-4">
          Select a shape to view its properties
        </v-card-text>
      </v-card>
    </v-navigation-drawer>
    <v-btn
      v-else
      icon
      size="small"
      @click="$emit('update:modelValue', true)"
      style="position: absolute; top: 10px; right: 0; z-index: 100"
    >
      <v-icon>mdi-arrow-collapse-left</v-icon>
    </v-btn>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { dia } from 'jointjs'

interface Props {
  selectedShape: dia.Element | null
  modelValue: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'action'])

const shapeInfo = computed(() => {
  if (!props.selectedShape) return null

  const position = props.selectedShape.position()
  const size = props.selectedShape.size()
  const attrs = props.selectedShape.attr()

  return {
    id: props.selectedShape.id,
    type: props.selectedShape.get('type'),
    position: `(${position.x}, ${position.y})`,
    size: `${size.width} x ${size.height}`,
    color: attrs?.body?.fill || 'None',
    zIndex: props.selectedShape.get('z') || 0
  }
})
</script>

<style scoped>
.color-preview {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid #ddd;
}
.close-button,
.open-button {
  position: absolute;
  top: 10px;
  right: 0;
  z-index: 100;
  border: none !important;
  background: transparent !important;
  box-shadow: none !important;
  outline: none !important;
}
</style>
