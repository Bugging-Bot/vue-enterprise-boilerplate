<template>
  <v-app-bar class="d-flex align-center">
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')"></v-app-bar-nav-icon>
    <v-app-bar-title>My Application</v-app-bar-title>

    <v-btn v-if="!isSearchActive" icon @click="toggleSearch">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-text-field
      v-if="isSearchActive"
      density="compact"
      variant="solo"
      label="Search"
      :append-inner-icon="isSearchActive ? 'mdi-magnify' : ''"
      single-line
      hide-details
      class="flex-grow-1"
      @click:append-inner="toggleSearch"
    ></v-text-field>

    <v-spacer v-if="isSearchActive"></v-spacer>

    <v-btn icon>
      <v-icon>mdi-account</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>

    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="settings">Settings</v-list-item>
        <v-list-item @click="profile">Profile</v-list-item>
        <v-list-item @click="logout">Logout</v-list-item>
      </v-list>
    </v-menu>

    <PlanMenu />
    <SettingsMenu />
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineEmits(['toggle-drawer'])
const isSearchActive = ref(false)
const toggleSearch = () => {
  isSearchActive.value = !isSearchActive.value
}

const settings = () => {
  alert('Settings clicked')
}

const profile = () => {
  alert('Profile clicked')
}

const logout = () => {
  alert('Logout clicked')
}
</script>
