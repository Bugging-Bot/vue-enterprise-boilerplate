/** * Drawer content component that renders a list of draggable items based on configuration. * *
@component * @prop {DrawerConfigType | null} config - Configuration object containing items to
display * @emits itemAction Triggered when an item action is performed, passing the action and item
details */
<template>
  <div>
    <v-list v-if="config">
      <DraggableListItem
        v-for="(item, index) in config.items"
        :key="index"
        :item="item"
        @item-action="$emit('itemAction', $event, item)"
      />
    </v-list>

    <v-list v-else>
      <v-list-item title="Select a tab to view options"></v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import type { DrawerConfigType, DrawerItemType } from '../configs'
import DraggableListItem from './DraggableListItem.vue'

interface Props {
  config: DrawerConfigType | null
}

interface Emits {
  (e: 'itemAction', action: string, item: DrawerItemType): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>
