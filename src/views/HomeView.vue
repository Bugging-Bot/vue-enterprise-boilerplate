<template>
  <v-app>
    <AppBar @toggle-drawer="isDrawerOpen = !isDrawerOpen" />
    <NavigationDrawer v-model="isDrawerOpen" />

    <v-main>
      <v-container fluid>
        <v-sheet class="overflow-y-auto">
          <v-sheet class="overflow-x-auto">
            <v-card>
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

              <v-row v-if="activeTab === 'overview'">
                <v-col cols="3" v-for="stat in statistics" :key="stat.title">
                  <StatisticsCard v-bind="stat" />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6" v-for="chart in charts" :key="chart.title">
                  <v-card :title="chart.title">
                    <div>Chart Here</div>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>

            <v-row>
              <v-col cols="12">
                <DealsTable />
              </v-col>
            </v-row>
          </v-sheet>
        </v-sheet>
      </v-container>
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppBar from '@/components/layout/AppBar.vue'
import NavigationDrawer from '@/components/layout/NavigationDrawer.vue'
import StatisticsCard from '@/components/dashboard/StatisticsCard.vue'
import DealsTable from '@/components/dashboard/DealsTable.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const activeTab = ref('overview')
const isDrawerOpen = ref(false)

const statistics = [
  { title: 'Active Sales', value: '$45,231', trend: 12 },
  { title: 'Product Revenue', value: '$21,389', trend: -8 },
  { title: 'Customer Growth', value: '892', trend: 23 },
  { title: 'Monthly Target', value: '68%', trend: 15 }
]

const charts = [{ title: 'Average Ticket' }, { title: 'Revenue' }]
</script>
