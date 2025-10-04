// This is the configuration file for Keycloak
// Optional: You can install the 'keycloak-js' types: npm install --save-dev @types/keycloak-js
import type Keycloak from 'keycloak-js'
// Recommended way to get the base URL dynamically
const appBaseUrl: string = window.location.origin

const keycloakServerBaseUrl = 'http://127.0.0.1:53551'

// ⚠️ Explicitly define the type for the config object
const keycloakConfig: Keycloak.KeycloakConfig = {
  // Note: 'http://127.0.0.1:53551' looks like a temporary Vite/Dev server address.
  // Ensure this is your actual Keycloak server URL/port.
  url: `${keycloakServerBaseUrl}`, // Use your confirmed server address + /auth
  realm: 'GherKaPata',
  clientId: 'VueApp'
}

const keycloakInitOptions = {
  // 'login-required' forces a login on app load. 'check-sso' attempts silent login.
  // commenting this for check 404 error
  onLoad: 'login-required',
  // 🔑 Crucial Fix: Set this to false to stop the adapter from attempting the
  // third-party cookie iframe check (3p-cookies/step1.html).
  // This resolves the 404 and the subsequent Timeout error.
  checkLoginIframe: false,
  redirectUri: `${appBaseUrl}/home`, // ✅ Redirect to /home (not /login)
  // This is optional but highly recommended for refreshing tokens silently in the background
  silentCheckSsoRedirectUri: `${appBaseUrl}/silent-check-sso.html`
}

export { keycloakConfig, keycloakInitOptions }
