// since using keycloak for auth, this file is not needed now
// import { useAuth0 } from '@auth0/auth0-vue'

// export const authGuard = (to: any) => {
//   const { isAuthenticated, loginWithRedirect } = useAuth0()

//   if (to.meta.requiresAuth && !isAuthenticated.value) {
//     loginWithRedirect()
//     return false
//   }
//   return true
// }

// updated for keycloak
// src/router/guards.ts

// src/router/guards.ts

import { useKeycloak } from '@josempgon/vue-keycloak'
import type { RouteLocationNormalized } from 'vue-router'
import type { KeycloakInstance } from 'keycloak-js'

export const authGuard = (to: RouteLocationNormalized) => {
  // 1. Get the Keycloak Ref object
  const { keycloak } = useKeycloak()

  // 2. Get the actual Keycloak instance from the Ref's .value property
  // We cast it to KeycloakInstance to satisfy TypeScript, although it's often inferred.
  const keycloakInstance = keycloak.value as KeycloakInstance

  // 3. Use the keycloakInstance for checks and functions
  if (to.meta.requiresAuth && !keycloakInstance.authenticated) {
    // Call login() on the actual Keycloak instance
    keycloakInstance.login({
      redirectUri: window.location.origin + to.fullPath
    })

    return false
  }

  // Allow navigation
  return true
}
