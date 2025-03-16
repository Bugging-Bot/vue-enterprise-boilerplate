<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" icon variant="text" class="more-options-btn">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item v-for="(item, index) in menuItems" :key="index" @click="item.action">
        <v-list-item-title>
          <v-icon start>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
interface MenuItem {
  title: string
  icon: string
  action: () => void
}

withDefaults(
  defineProps<{
    menuItems: MenuItem[]
  }>(),
  {
    menuItems: () => [
      {
        title: 'Edit',
        icon: 'mdi-pencil',
        action: () => console.log('Edit clicked')
      },
      {
        title: 'Delete',
        icon: 'mdi-delete',
        action: () => console.log('Delete clicked')
      }
    ]
  }
)
</script>

<!-- <style scoped>
.more-options-btn {
  margin-left: 8px;
}
</style> -->
