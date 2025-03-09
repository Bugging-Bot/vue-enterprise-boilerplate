<template>
  <Layout>
    <template #default>
      <v-card class="pa-4">
        <DigCanvas />
        <!-- <DummyView /> -->
      </v-card>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import DigCanvas from '@/components/JointJs/components/DigCanvas.vue'
import Layout from '@/components/layout/LayoutView.vue'
// import DummyView from '@/components/JointJs/components/DummyView.vue'

console.log('TestView loaded')
</script>
