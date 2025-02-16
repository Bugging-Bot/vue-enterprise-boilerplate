import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue'
import { createAuth0 } from '@auth0/auth0-vue'

import App from '@/App.vue'
import router from '@/router/index'
import { authConfig } from './auth/auth.config'

const app = createApp(App)

/** Pinia **/
/** https://pinia.vuejs.org/ **/
const pinia = createPinia()
app.use(pinia)

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

app.mount('#app')
