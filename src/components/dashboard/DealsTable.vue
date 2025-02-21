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
        :headers="headers"
        class="data-table"
        density="compact"
      ></v-data-table>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
interface Deal {
  id: number
  name: string
  amount: string
  status: string
  date: string
  owner: string
}

defineProps<{
  deals: Deal[]
  headers: Array<{
    title: string
    value: string
    align: 'start' | 'end' | 'center'
    sortable: boolean
    width?: string
  }>
}>()

const seeAllDeals = () => {
  console.log('Navigate to full deals list or open modal')
  // You can replace this with actual navigation logic
}
</script>
