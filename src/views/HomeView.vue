<template>
  <!-- <v-app> -->
  <AppBar @toggle-drawer="isDrawerOpen = !isDrawerOpen" />
  <NavigationDrawer v-model="isDrawerOpen" />

  <v-main>
    <v-container fluid>
      <LocalBar />
      <LocalDrawer />
      <BabylonCanvas />
      <DealsTable />
    </v-container>
  </v-main>
  <!-- this for footer-->
  <AppFooter />
  <!-- </v-app> -->
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppBar from '@/components/layout/AppBar.vue'
import NavigationDrawer from '@/components/layout/NavigationDrawer.vue'
import StatisticsCard from '@/components/dashboard/StatisticsCard.vue'
import DealsTable from '@/components/dashboard/DealsTable.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import BabylonCanvas from '@/components/Babylon/BabylonCanvas.vue'
import LocalBar from '@/components/layout/LocalBar.vue'
import LocalDrawer from '@/components/layout/LocalDrawer.vue'
//import MoreOptions from '@/components/layout/MoreOptions.vue'

const activeTab = ref('overview')
const isDrawerOpen = ref(false)

const statistics = [
  { title: 'Active Sales', value: '$45,231', trend: 12 },
  { title: 'Product Revenue', value: '$21,389', trend: -8 },
  { title: 'Customer Growth', value: '892', trend: 23 },
  { title: 'Monthly Target', value: '68%', trend: 15 }
]

// const charts = [
//   { title: 'Average Ticket' },
//   { title: 'Revenue' },
//   { title: 'Sales' },
//   { title: 'Customers' },
//   { title: 'Orders' },
//   { title: 'Profit' }
// ]
</script>
