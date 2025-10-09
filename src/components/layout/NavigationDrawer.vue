<template>
  <v-navigation-drawer
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <v-list>
      <v-list-item link to="/home" title="Home" prepend-icon="mdi-home"></v-list-item>
      <v-list-item link to="/dashboard" title="Dashboard" prepend-icon="mdi-view-dashboard">
      </v-list-item>
      <v-list-item
        link
        to="/processes"
        title="Processes"
        prepend-icon="mdi-vector-triangle"
      ></v-list-item>
      <v-list-item to="/simulation" title="Simulate" prepend-icon="mdi-stove"></v-list-item>
      <v-list-item
        link
        to="/configuration"
        title="Configuration"
        prepend-icon="mdi-cog-outline"
      ></v-list-item>
      <v-list-item link to="/update" title="Updates" prepend-icon="mdi-update"></v-list-item>
      <v-list-item link to="/messages" title="Messages" prepend-icon="mdi-message"></v-list-item>
      <!-- Added for Builder progress view -->
      <v-list-item
        link
        to="/progress"
        title="Progress"
        prepend-icon="mdi-progress-check"
      ></v-list-item>
      <v-list-item link to="/test" title="Test" prepend-icon="mdi-test-tube"></v-list-item>
      <!-- <v-list-item-title>Messages</v-list-item-title> -->
    </v-list>

    <v-list-group value="RECORDS">
      <v-list-item title="Sales" prepend-icon="mdi-sale"></v-list-item>
      <v-list-item title="Customers" prepend-icon="mdi-account-group"></v-list-item>
    </v-list-group>

    <v-list-group value="WORKSPACE">
      <v-list-item title="Tasks" prepend-icon="mdi-check-circle"></v-list-item>
      <v-list-item title="Analytics" prepend-icon="mdi-chart-bar"></v-list-item>
    </v-list-group>

    <template v-slot:append>
      <v-card class="ma-2">
        <v-card-text>Upgrade & unlock all features</v-card-text>
      </v-card>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean // Accept modelValue to manage the drawer's open/close state
}>()
defineEmits(['update:modelValue']) // Emit event when state changes
</script>

<!-- <style scoped>
.color-preview {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid #ddd;
}
</style> -->
