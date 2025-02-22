<template>
  <!-- <v-app> -->
  <AppBar @toggle-drawer="isDrawerOpen = !isDrawerOpen" />
  <NavigationDrawer v-model="isDrawerOpen" />

  <v-main>
    <v-container fluid>
      <!-- Single sheet for handling overflow -->
      <v-sheet>
        <v-card>
          <!-- Top bar with tabs and buttons -->
          <v-row>
            <v-col>
              <v-tabs v-model="activeTab">
                <v-tab value="overview">Overview</v-tab>
                <v-tab value="sales">Sales Order</v-tab>
              </v-tabs>
            </v-col>
            <v-col class="text-right">
              <v-btn>Filter</v-btn>
              <v-btn>Export</v-btn>
            </v-col>
          </v-row>

          <!--- This is second row--->
          <v-row v-if="activeTab === 'overview'">
            <v-col cols="1" v-for="stat in statistics" :key="stat.title">
              <StatisticsCard v-bind="stat" />
            </v-col>
          </v-row>
          <!-- This is the sales order tab -->
          <v-row>
            <v-col cols="1" v-for="chart in charts" :key="chart.title">
              <v-card :title="chart.title">
                <div>Chart Here</div>
              </v-card>
            </v-col>
          </v-row>

          <!-- This is the sales order table -->
          <!-- Renders a row with a single column that contains the `DealsTable` component. This component is likely responsible for displaying a table of sales deals or transactions. -->
          <v-row>
            <v-col cols="12">
              <DealsTable />
            </v-col>
          </v-row>
        </v-card>
      </v-sheet>
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
import MoreOptions from '@/components/layout/MoreOptions.vue'

const activeTab = ref('overview')
const isDrawerOpen = ref(false)

const statistics = [
  { title: 'Active Sales', value: '$45,231', trend: 12 },
  { title: 'Product Revenue', value: '$21,389', trend: -8 },
  { title: 'Customer Growth', value: '892', trend: 23 },
  { title: 'Monthly Target', value: '68%', trend: 15 }
]

const charts = [
  { title: 'Average Ticket' },
  { title: 'Revenue' },
  { title: 'Sales' },
  { title: 'Customers' },
  { title: 'Orders' },
  { title: 'Profit' }
]
</script>
