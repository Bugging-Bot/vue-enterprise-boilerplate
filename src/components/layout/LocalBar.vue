<template>
  <v-card class="local-bar-container">
    <div class="local-bar" :class="{ collapsed: !localBarVisible }">
      <v-tabs v-model="activeTab">
        <v-tab v-for="tab in tabs" :key="tab.value" :value="tab.value">
          {{ tab.label }}
        </v-tab>
      </v-tabs>
    </div>
    <div class="tabs-content">
      <div v-for="tab in tabs" :key="tab.value" v-show="activeTab === tab.value">
        <slot :name="tab.value"></slot>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { useEventBusStore } from '@/stores/eventBus'
import type { PropType } from 'vue'
import { onMounted, ref, onUnmounted, watch, defineSlots } from 'vue'

// LocalBar.vue
interface Tab {
  value: string
  label: string
}

const props = defineProps({
  tabs: {
    type: Array as PropType<Tab[]>, // Explicitly define the type as an array of Tab objects
    required: true,
    default: () => []
  },
  initialActiveTab: {
    type: String,
    default: 'overview'
  },
  toggleEventName: {
    type: String,
    default: 'toggle-local-bar'
  }
})

const emit = defineEmits(['tab-changed'])

const eventBus = useEventBusStore()
const localBarVisible = ref(true)
const activeTab = ref(props.initialActiveTab)

const handleToggleLocalBar = (data: any) => {
  console.log('Received event:', data)
  if (data && data.message) {
    localBarVisible.value = !localBarVisible.value
    eventBus.emit(
      'local-bar-icon-change',
      localBarVisible.value ? 'mdi-arrow-collapse-up' : 'mdi-arrow-collapse-down'
    )
  }
}

// const localBarIcon = computed(() =>
//   localBarVisible.value ? 'mdi-arrow-collapse-up' : 'mdi-arrow-collapse-down'
// )

onMounted(() => {
  // eventBus.on(props.toggleEventName, handleToggleLocalBar)
  // eventBus.emit('local-bar-icon-change', localBarIcon.value)
  eventBus.on('toggle-local-bar', handleToggleLocalBar)
  // Emit initial icon state
  eventBus.emit(
    'local-bar-icon-change',
    localBarVisible.value ? 'mdi-arrow-collapse-up' : 'mdi-arrow-collapse-down'
  )
  console.log('OnMounted: Subscribed to event')
})

onUnmounted(() => {
  // eventBus.offSpecific(props.toggleEventName, handleToggleLocalBar)
  eventBus.offSpecific('toggle-local-bar', handleToggleLocalBar)
  console.log('OnUmounted: Unsubscribe to event')
})

watch(activeTab, (newValue) => {
  emit('tab-changed', newValue)
})

defineSlots<{
  [key: string]: () => any
}>()
</script>

<style scoped>
.local-bar {
  background-color: var(--v-surface-variant);
  border-bottom: 1px solid var(--v-border-color);
  transition: max-height 0.3s ease;
  overflow: hidden;
  max-height: 64px;
}

.local-bar.collapsed {
  max-height: 16px;
}

:deep(.v-toolbar-title) {
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.0125em;
}

.tabs-content {
  padding: 16px; /* Add padding for better visual spacing */
}
</style>
