<template>
  <Layout>
    <template #default>
      <v-card class="pa-4">
        <div class="process-builder">Your message content here</div>
        <h1>Process Builder View</h1>
        <DiagramEditor />
      </v-card>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '@/components/layout/LayoutView.vue'
import DiagramEditor from '@/components/JointJs/DiagramEditor.vue'
</script>

<style scoped>
.pa-4 {
  padding: 1rem;
}
</style>
