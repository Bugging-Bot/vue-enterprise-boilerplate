<template>
  <v-container class="fill-height">
    <!-- Full height container for centering -->
    <v-row align="center" justify="center">
      <!-- Centers the login card -->
      <v-col cols="12" sm="8" md="6" lg="4">
        <!-- Responsive column sizing -->

        <v-card class="elevation-12 pa-8">
          <!-- Main login card with shadow -->
          <!-- Theme toggle button (dark/light mode) -->
          <div class="d-flex justify-end mb-2">
            <!-- <v-btn
              :icon="themePreference === 'dark' ? 'mdi-weather-night' : 'mdi-weather-sunny'"
              @click="toggleTheme"
            /> -->
          </div>

          <!-- Login form title -->
          <v-card-title class="text-h5 mb-4"> Login </v-card-title>

          <!-- Login form with email and password -->
          <v-form @submit.prevent="handleLogin">
            <!-- Email input field with icon -->
            <v-text-field
              v-model="email"
              label="Email"
              prepend-icon="mdi-email"
              type="email"
              required
            />

            <!-- Password input field with toggle visibility -->
            <v-text-field
              v-model="password"
              label="Password"
              prepend-icon="mdi-lock"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              required
            />

            <!-- Remember me checkbox -->
            <v-checkbox v-model="rememberMe" label="Remember me" class="mt-2" />

            <!-- Form actions container -->
            <div class="d-flex flex-column align-center mt-4">
              <!-- Sign in button with loading state -->
              <v-btn color="primary" type="submit" block :loading="loading"> Sign In </v-btn>

              <!-- Forgot password link -->
              <v-btn variant="text" color="primary" class="mt-2" @click="handleForgotPassword">
                Forgot Password?
              </v-btn>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useTheme from '@/composables/useTheme'

const router = useRouter()
const { themePreference, setTheme } = useTheme()
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const loading = ref(false)

const toggleTheme = () => {
  setTheme(themePreference.value === 'dark' ? 'light' : 'dark')
}
const handleLogin = async () => {
  loading.value = true
  // Simulate brief loading state
  await new Promise((resolve) => setTimeout(resolve, 500))
  loading.value = false
  // Direct navigation to dashboard
  router.push('/home')
}
const handleForgotPassword = () => {
  // Implement forgot password logic
  console.log('Forgot password clicked')
}
</script>
