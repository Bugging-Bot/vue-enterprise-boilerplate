<template>
  <AppBar @toggle-drawer="isDrawerOpen = !isDrawerOpen" />
  <NavigationDrawer v-model="isDrawerOpen" />

  <v-main style="height: 100vh; overflow: auto">
    <LocalBar />

    <!-- Ensure v-main takes the full viewport height -->
    <v-container fluid style="height: 100%">
      <slot> </slot>
      <!-- Placeholder for content -->
    </v-container>
  </v-main>

  <AppFooter />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppBar from '@/components/layout/AppBar.vue'
import NavigationDrawer from '@/components/layout/NavigationDrawer.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import LocalBar from './LocalBar.vue'

const isDrawerOpen = ref(false)
</script>
