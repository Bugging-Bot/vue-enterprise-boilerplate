<template>
  <v-card flat>
    <v-footer class="d-flex flex-column">
      <v-row justify="center" no-gutters>
        <!-- <v-btn v-for="link in links" :key="link" variant="text" class="mx-2" rounded="xl">
          {{ link }}
        </v-btn> -->
      </v-row>

      <v-divider></v-divider>

      <div class="px-4 py-2 text-center w-100">
        {{ currentYear }} — <strong>Powered by DataKrit</strong>
      </div>
    </v-footer>
  </v-card>
</template>

<script setup lang="ts">
// const links = ['Home', 'About', 'Services', 'Blog', 'Contact Us']
const currentYear = new Date().getFullYear()
</script>
