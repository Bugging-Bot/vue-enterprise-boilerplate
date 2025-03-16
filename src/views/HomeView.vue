<template>
  <div>
    <!-- <v-app> -->
    <AppBar @toggle-drawer="isDrawerOpen = !isDrawerOpen" />
    <NavigationDrawer v-model="isDrawerOpen" />

    <v-main>
      <v-container fluid>
        <!-- <LocalBar /> -->
        <LocalDrawer />
        <LocalBar :tabs="tabs" @tab-changed="handleTabChanged">
          <template #overview>
            <BabylonCanvas />
          </template>

          <template #parts>
            <v-card-title>Parts Section</v-card-title>
            <v-card-text>
              <v-data-table :headers="headers" :items="items"></v-data-table>
            </v-card-text>
          </template>

          <template #process>
            <v-card-title>Process Section</v-card-title>
            <v-card-text>
              <v-progress-circular
                :size="70"
                :width="5"
                color="purple"
                indeterminate
              ></v-progress-circular>
            </v-card-text>
          </template>

          <template #deals>
            <v-card-title>Administration Section</v-card-title>
            <v-card-text>
              <v-text-field label="Admin Input"></v-text-field>
            </v-card-text>
            <DealsTable />
          </template>
        </LocalBar>
      </v-container>
    </v-main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AppBar from '@/components/layout/AppBar.vue'
import NavigationDrawer from '@/components/layout/NavigationDrawer.vue'
//import StatisticsCard from '@/components/dashboard/StatisticsCard.vue'
import DealsTable from '@/components/dashboard/DealsTable.vue'
// import AppFooter from '@/components/layout/AppFooter.vue'
import BabylonCanvas from '@/components/Babylon/BabylonCanvas.vue'
import LocalBar from '@/components/layout/LocalBar.vue'
import LocalDrawer from '@/components/layout/LocalDrawer.vue'
import { useEventBusStore } from '@/stores/eventBus'
//import MoreOptions from '@/components/layout/MoreOptions.vue'
//import LocalBar from '@/components/layout/LocalBar.vue'

//const activeTab = ref('overview')
const eventBus = useEventBusStore()
const isDrawerOpen = ref(false)

interface Tab {
  value: string
  label: string
}

// tabs for local bar
const tabs: Tab[] = [
  { value: 'overview', label: 'Overview' },
  { value: 'parts', label: 'Parts' },
  { value: 'process', label: 'Process' },
  { value: 'deals', label: 'Deals' }
]

// Notify the LocalDrawer which view is active when component mounts
onMounted(() => {
  eventBus.emit('view-changed', 'HomeView')
  console.log('HomeView mounted, emitted view-changed event')
})

// Clean up when component unmounts
onUnmounted(() => {
  console.log('HomeView unmounted')
})

const handleTabChanged = (tabValue: string) => {
  console.log('Tab changed to:', tabValue)
}

const headers = ref([
  { title: 'Name', key: 'name' },
  { title: 'Quantity', key: 'quantity' }
])

const items = ref([
  { name: 'Widget A', quantity: 10 },
  { name: 'Widget B', quantity: 25 }
])

// Define the slots type
defineSlots<{
  overview: () => any
  parts: () => any
  process: () => any
  adminstration: () => any
}>()
</script>
