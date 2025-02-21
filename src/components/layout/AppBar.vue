<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')"></v-app-bar-nav-icon>
    <v-app-bar-title>Uxerflow Inc.</v-app-bar-title>

    <v-text-field
      density="compact"
      variant="solo"
      label="Search"
      append-inner-icon="mdi-magnify"
      single-line
      hide-details
      class="mt-2 search-field"
      style="max-width: 300px"
    ></v-text-field>

    <v-spacer></v-spacer>
    <v-btn>Share</v-btn>
    <PlanMenu />
    <SettingsMenu />
  </v-app-bar>
</template>

<script setup lang="ts">
defineEmits(['toggle-drawer'])
</script>
