<template>
  <v-card>
    <v-card-title>
      List of Deals
      <v-spacer></v-spacer>
      <v-btn variant="text">See all</v-btn>
    </v-card-title>
    <v-data-table :items="deals" :headers="headers" class="data-table"></v-data-table>
  </v-card>
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
</script>
