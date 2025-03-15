<template>
  <div>
    <AppBar @toggle-drawer="isDrawerOpen = !isDrawerOpen" />
    <NavigationDrawer v-model="isDrawerOpen" />
    <v-main>
      <v-container fluid>
        <LocalDrawer />
        <LocalBar :tabs="tabs" @tab-changed="handleTabChanged">
          <!-- This is first part-->
          <template #overview>
            <!-- <v-card> -->
            <!-- <v-card-title>Overview Section</v-card-title> -->
            <!-- <v-card-text style="padding: 0; width: 90%"> -->
            <DigCanvas />
            <!-- </v-card-text> -->
            <!-- </v-card> -->
          </template>
          <!-- This is second part-->
          <template #parts>
            <!-- <v-card> -->
            <v-card-title>Parts Section</v-card-title>
            <v-card-text>
              <v-data-table :headers="headers" :items="items"></v-data-table>
            </v-card-text>
            <!-- </v-card> -->
          </template>
        </LocalBar>
      </v-container>
    </v-main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppBar from '@/components/layout/AppBar.vue'
import NavigationDrawer from '@/components/layout/NavigationDrawer.vue'
import LocalBar from '@/components/layout/LocalBar.vue'
import LocalDrawer from '@/components/layout/LocalDrawer.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import DigCanvas from '@/components/JointJs/charts/GenericChart.vue'

//const activeTab = ref('overview')
const isDrawerOpen = ref(false)

interface Tab {
  value: string
  label: string
}

// tabs for local bar
const tabs: Tab[] = [
  { value: 'overview', label: 'Overview' },
  { value: 'parts', label: 'Parts' }
]
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

<style scoped>
.pa-4 {
  padding: 1rem;
}
</style>
