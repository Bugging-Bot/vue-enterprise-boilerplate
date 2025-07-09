import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue'
import { createAuth0 } from '@auth0/auth0-vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

import App from '@/App.vue'
import router from '@/router'
import { authConfig } from './components/auth/auth.config'
import VueKonva from 'vue-konva'
// Import your global CSS file here
import '@/assets/styles/main.scss' // Make sure the path is correct

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

app.use(pinia)
// app using konva
app.use(VueKonva)

/** Vue Router **/
/** https://router.vuejs.org/ **/
app.use(router)

/** Unhead **/
/** https://unhead.unjs.io/ **/
const head = createHead()
app.use(head)

/** Auth0 **/
app.use(
  createAuth0({
    domain: authConfig.domain,
    clientId: authConfig.clientId,
    authorizationParams: {
      redirect_uri: authConfig.redirectUri
    }
  })
)

app.use(vuetify)
app.mount('#app')
