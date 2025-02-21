<template>
  <v-navigation-drawer
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <v-list>
      <v-list-item title="Dashboard" prepend-icon="mdi-view-dashboard"></v-list-item>
      <v-list-item title="Updates" prepend-icon="mdi-update"></v-list-item>
      <v-list-item title="Messages" prepend-icon="mdi-message"></v-list-item>
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
  modelValue: boolean
}>()
defineEmits(['update:modelValue'])
</script>
