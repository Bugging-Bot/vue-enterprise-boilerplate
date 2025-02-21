<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="d-flex align-center">
        List of Deals
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="seeAllDeals">See all</v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-data-table
        :items="deals"
        :headers="headers as any"
        class="data-table"
        density="compact"
      ></v-data-table>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { format } from 'date-fns'

export interface Deal {
  id: number
  name: string
  amount: string
  status: string
  date: string
  owner: string
}

export interface DealHeader {
  title: string
  value: string
  align: 'start' | 'end' | 'center'
  sortable: boolean
  width?: string
}

const headers = [
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
}))

const seeAllDeals = () => {
  console.log('Navigate to full deals list or open modal')
}
</script>
