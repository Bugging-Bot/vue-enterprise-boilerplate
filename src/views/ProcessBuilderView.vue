<template>
  <Layout>
    <template #default>
      <v-card class="pa-4">
        <h1>Process Builder View</h1>
        <div>Your message content here</div>
      </v-card>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '@/components/layout/LayoutView.vue'
</script>

<style scoped>
.pa-4 {
  padding: 1rem;
}
</style>
