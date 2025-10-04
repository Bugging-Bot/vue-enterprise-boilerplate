import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue'
// switching to KeyCloak
//import { createAuth0 } from '@auth0/auth0-vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import App from '@/App.vue'
import router from '@/router'
// We won't need this config file if Keycloak settings are inline or in environment variables
// import { authConfig } from './components/auth/auth.config'
import VueKonva from 'vue-konva'
// Import your global CSS file here
import '@/assets/styles/main.scss' // Make sure the path is correct
// adding this for KeyCloak
// Initialize the Keycloak plugin
import { vueKeycloak } from '@josempgon/vue-keycloak'
// 🆕 Import the configuration from the new file
import { keycloakConfig, keycloakInitOptions } from './components/auth/keycloak.config'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    sets: {
      mdi
    }
  }
})

console.log('Running in mode:', import.meta.env.MODE)
console.log('Simulate NATS:', import.meta.env.VITE_USE_SIMULATED_NATS)

// create pinia
/** Pinia **/
/** https://pinia.vuejs.org/ **/

const pinia = createPinia()
console.log('Pinia initialized/created:', pinia)

const app = createApp(App)
console.log('app initialized/app:', app)

// Wrap the app setup in an async function to await Keycloak initialization
const startApp = async () => {
  try {
    // 1. Use primary plugins before Keycloak initialization
    app.use(pinia)
    app.use(VueKonva)
    app.use(createHead()) // Use the Head plugin here
    app.use(vuetify) // Use Vuetify here
    // 2. Wait for Keycloak to initialize (must be awaited before mounting)
    // 🔑 CORRECT USAGE: Use app.use() with the imported plugin (renamed to KeycloakPlugin)
    await app.use(vueKeycloak, {
      // ❌ Note: Changed from vueKeycloak.install
      config: keycloakConfig,
      initOptions: keycloakInitOptions
    })
    // 3. Use Vue Router. **Only call app.use(router) once.**
    app.use(router)
    // 4. Mount the app
    app.mount('#app')
  } catch (error) {
    console.error('Application failed to start due to Keycloak error:', error)
  }
}
// Start the application
startApp()
