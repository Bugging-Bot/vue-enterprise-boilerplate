<template>
  <Layout>
    <template #default>
      <v-card class="pa-4">
        <h1>Messages</h1>
        <div>Your message content here</div>
      </v-card>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Layout from '@/components/layout/LayoutView.vue'
import { useEventBusStore } from '@/stores/eventBus'

const eventBus = useEventBusStore()

// Notify the LocalDrawer which view is active when component mounts
onMounted(() => {
  eventBus.emit('view-changed', 'MessageView')
  console.log('MessageView mounted, emitted view-changed event')
})

// Clean up when component unmounts
onUnmounted(() => {
  console.log('MessageView unmounted')
})
</script>

<style scoped>
.pa-4 {
  padding: 1rem;
}
</style>
