<template>
  <div class="auth-buttons">
    <button v-if="!isAuthenticated" @click="login">Log In</button>
    <button v-else @click="logout">Log Out</button>
  </div>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'

const { loginWithRedirect, logout, isAuthenticated } = useAuth0()

const login = () => loginWithRedirect()
</script>
