<template>
  <AppBar @toggle-drawer="isDrawerOpen = !isDrawerOpen" />
  <NavigationDrawer v-model="isDrawerOpen" />
  <v-main style="height: 100vh; overflow: auto">
    <!-- Ensure v-main takes the full viewport height -->
    <v-container fluid style="height: 100%">
      <v-row>
        <v-col cols="12">
          <LocalBar />
          <LocalDrawer />
        </v-col>
      </v-row>
      <!-- Placeholder for content -->
      <slot></slot>
      <!-- This is where your child components will be inserted -->
    </v-container>
  </v-main>

  <!-- <AppFooter /> -->
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppBar from '@/components/layout/AppBar.vue'
import NavigationDrawer from '@/components/layout/NavigationDrawer.vue'
// import AppFooter from '@/components/layout/AppFooter.vue'
import LocalBar from './LocalBar.vue'
import LocalDrawer from './LocalDrawer.vue'

const isDrawerOpen = ref(false)
</script>
