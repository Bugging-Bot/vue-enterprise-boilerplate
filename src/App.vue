<script setup lang="ts"></script>

<template>
  <nav>
    <LoginButton />
  </nav>
  <router-view></router-view>
  <RouterView />
</template>
<script setup lang="ts">
import LoginButton from '@/components/LoginButton.vue'
</script>

<style lang="scss"></style>
