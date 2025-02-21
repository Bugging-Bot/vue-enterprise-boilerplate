<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      {{ value }}
      <span :class="trend > 0 ? 'success' : 'error'">{{ trend }}%</span>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  value: string
  trend: number
}>()
</script>
