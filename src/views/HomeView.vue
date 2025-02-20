<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Uxerflow Inc.</v-app-bar-title>

      <v-text-field
        density="compact"
        variant="solo"
        label="Search"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        class="mt-2"
        style="max-width: 300px"
      ></v-text-field>

      <v-spacer></v-spacer>
      <v-btn>Share</v-btn>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props">Free Plan</v-btn>
        </template>
        <v-list>
          <v-list-item>Upgrade Plan</v-list-item>
        </v-list>
      </v-menu>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item title="Settings"></v-list-item>
          <v-list-item title="Help"></v-list-item>
          <v-list-item title="Feedback"></v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item title="Dashboard" prepend-icon="mdi-view-dashboard"></v-list-item>
        <v-list-item title="Updates" prepend-icon="mdi-update"></v-list-item>
        <v-list-item title="Messages" prepend-icon="mdi-message"></v-list-item>
      </v-list>

      <v-list-group value="RECORDS">
        <v-list-item title="Sales" prepend-icon="mdi-sale"></v-list-item>
        <v-list-item title="Customers" prepend-icon="mdi-account-group"></v-list-item>
      </v-list-group>

      <v-list-group value="WORKSPACE">
        <v-list-item title="Tasks" prepend-icon="mdi-check-circle"></v-list-item>
        <v-list-item title="Analytics" prepend-icon="mdi-chart-bar"></v-list-item>
      </v-list-group>

      <template v-slot:append>
        <v-card class="ma-2">
          <v-card-text>Upgrade & unlock all features</v-card-text>
        </v-card>
      </template>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
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
              <v-card>
                <v-card-title>{{ stat.title }}</v-card-title>
                <v-card-text>
                  {{ stat.value }}
                  <span :class="stat.trend > 0 ? 'success' : 'error'">{{ stat.trend }}%</span>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-card title="Average Ticket">
                <!-- Chart Component -->
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card title="Revenue">
                <!-- Chart Component -->
              </v-card>
            </v-col>
          </v-row>
        </v-card>

        <v-row>
          <v-col cols="8">
            <v-card>
              <v-card-title>
                List of Deals
                <v-spacer></v-spacer>
                <v-btn variant="text">See all</v-btn>
              </v-card-title>
              <v-data-table :items="deals" :headers="dealHeaders"></v-data-table>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card>
              <v-card-title>Sales Pipeline</v-card-title>
              <!-- Pipeline Visualization -->
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import type { D } from 'vitest/dist/reporters-w_64AS5f.js'
import { ref } from 'vue'

const drawer = ref(false)
const activeTab = ref('overview')

const statistics = [
  { title: 'Active Sales', value: '$45,231', trend: 12 },
  { title: 'Product Revenue', value: '$21,389', trend: -8 },
  { title: 'Customer Growth', value: '892', trend: 23 },
  { title: 'Monthly Target', value: '68%', trend: 15 }
]

interface Deal {
  id: number
  name: string
  amount: number
  status: string
}

interface DealHeader {
  text: string
  value: string
}

const deals = [] as Deal[]
const dealHeaders = [] as DealHeader[]
</script>
