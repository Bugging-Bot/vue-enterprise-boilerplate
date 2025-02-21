<template>
  <v-app>
    <AppBar @toggle-drawer="isDrawerOpen = !isDrawerOpen" />
    <!-- <NavigationDrawer v-model="isDrawerOpen" /> -->
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
                <DealsTable :deals="deals" :headers="dealHeaders" />
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
import { format } from 'date-fns'
import AppBar from '@/components/layout/AppBar.vue'
import NavigationDrawer from '@/components/layout/NavigationDrawer.vue'
import StatisticsCard from '@/components/dashboard/StatisticsCard.vue'
import DealsTable from '@/components/dashboard/DealsTable.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const activeTab = ref('overview')
const isDrawerOpen = ref(false) // Declare isDrawerOpen
const statistics = [
  { title: 'Active Sales', value: '$45,231', trend: 12 },
  { title: 'Product Revenue', value: '$21,389', trend: -8 },
  { title: 'Customer Growth', value: '892', trend: 23 },
  { title: 'Monthly Target', value: '68%', trend: 15 }
]

interface Deal {
  id: number
  name: string
  amount: string
  status: string
  date: string
  owner: string
}

interface DealHeader {
  title: string
  value: string
  align: 'start' | 'end' | 'center'
  sortable: boolean
  width?: string
}

const dealHeaders: DealHeader[] = [
  { title: 'Deal ID', value: 'id', align: 'start', sortable: true, width: '100px' },
  { title: 'Customer Name', value: 'name', align: 'start', sortable: true },
  { title: 'Deal Value', value: 'amount', align: 'end', sortable: true },
  { title: 'Status', value: 'status', align: 'center', sortable: true },
  { title: 'Created Date', value: 'date', align: 'center', sortable: true },
  { title: 'Owner', value: 'owner', align: 'start', sortable: true }
]

const deals = Array.from({ length: 25 }, (_, index) => ({
  id: index + 1,
  name: `Customer ${index + 1}`,
  amount: `${(Math.floor(Math.random() * 50000) + 5000).toLocaleString()}`,
  status: ['Pending', 'In Progress', 'Completed', 'Cancelled'][Math.floor(Math.random() * 4)],
  date: format(
    new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    'yyyy-MM-dd'
  ),
  owner: ['John Smith', 'Sarah Johnson', 'Mike Brown', 'Lisa Davis'][Math.floor(Math.random() * 4)]
})) as Deal[]

const charts = [{ title: 'Average Ticket' }, { title: 'Revenue' }]
</script>
