<template>
  <AppBar @toggle-drawer="isDrawerOpen = !isDrawerOpen" />
  <NavigationDrawer v-model="isDrawerOpen" />

  <v-main>
    <v-container fluid>
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

const isDrawerOpen = ref(false)
</script>
