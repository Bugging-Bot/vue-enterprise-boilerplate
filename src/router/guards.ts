import { useAuth0 } from '@auth0/auth0-vue'

export const authGuard = (to: any) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0()

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    loginWithRedirect()
    return false
  }
  return true
}
