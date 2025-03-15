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
            <!-- <v-card> -->
            <!-- <v-card-title>Overview Section</v-card-title> -->
            <BabylonCanvas />
            <!-- <v-card-text>
                <p>This is the overview content. You can add any components here.</p>
                <v-btn color="primary">Do something</v-btn>
              </v-card-text> -->
            <!-- </v-card> -->
          </template>

          <template #parts>
            <!-- <v-card> -->
            <v-card-title>Parts Section</v-card-title>
            <v-card-text>
              <v-data-table :headers="headers" :items="items"></v-data-table>
            </v-card-text>
            <!-- </v-card> -->
          </template>

          <template #process>
            <!-- <v-card> -->
            <v-card-title>Process Section</v-card-title>
            <v-card-text>
              <v-progress-circular
                :size="70"
                :width="5"
                color="purple"
                indeterminate
              ></v-progress-circular>
            </v-card-text>
            <!-- </v-card> -->
          </template>

          <template #deals>
            <!-- <v-card> -->
            <v-card-title>Administration Section</v-card-title>
            <v-card-text>
              <v-text-field label="Admin Input"></v-text-field>
            </v-card-text>
            <DealsTable />
            <!-- </v-card> -->
          </template>
        </LocalBar>
      </v-container>
    </v-main>
    <!-- this for footer-->
    <!-- <AppFooter /> -->
    <!-- </v-app> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppBar from '@/components/layout/AppBar.vue'
import NavigationDrawer from '@/components/layout/NavigationDrawer.vue'
//import StatisticsCard from '@/components/dashboard/StatisticsCard.vue'
import DealsTable from '@/components/dashboard/DealsTable.vue'
// import AppFooter from '@/components/layout/AppFooter.vue'
import BabylonCanvas from '@/components/Babylon/BabylonCanvas.vue'
import LocalBar from '@/components/layout/LocalBar.vue'
import LocalDrawer from '@/components/layout/LocalDrawer.vue'
//import MoreOptions from '@/components/layout/MoreOptions.vue'
//import LocalBar from '@/components/layout/LocalBar.vue'

//const activeTab = ref('overview')
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

// const statistics = [
//   { title: 'Active Sales', value: '$45,231', trend: 12 },
//   { title: 'Product Revenue', value: '$21,389', trend: -8 },
//   { title: 'Customer Growth', value: '892', trend: 23 },
//   { title: 'Monthly Target', value: '68%', trend: 15 }
// ]

// const charts = [
//   { title: 'Average Ticket' },
//   { title: 'Revenue' },
//   { title: 'Sales' },
//   { title: 'Customers' },
//   { title: 'Orders' },
//   { title: 'Profit' }
// ]
</script>
