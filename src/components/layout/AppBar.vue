<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')"></v-app-bar-nav-icon>
    <v-app-bar-title>My Application</v-app-bar-title>

    <!-- custom text field added for search -->
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
    <!-- <v-spacer></v-spacer> -->

    <!-- <v-spacer></v-spacer> -->
    <!-- <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn> -->
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

    <!-- <v-btn>Share</v-btn> -->
    <PlanMenu />
    <SettingsMenu />
  </v-app-bar>
</template>

<script setup lang="ts">
defineEmits(['toggle-drawer'])

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
