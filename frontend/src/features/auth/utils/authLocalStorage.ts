import type { AuthState } from '../store/authSlice'

/**
 * Store the given authState in the local storage
 * @param authState
 */
export const setAuthStorage = (authState: AuthState) => {
  localStorage.setItem('auth', JSON.stringify(authState))
}

/**
 * Returns the authState stored in local storage or an empty authState if the local storage doesn't contain the authState
 * @returns {AuthState}
 */
export const getAuthStorage: () => AuthState = () => {
  const authItem = localStorage.getItem('auth')

  if (authItem !== null) {
    try {
      const authStorage = JSON.parse(authItem)
      if (authStorage !== null) {
        return authStorage
      }
    } catch (e) {
      console.error(e)
    }
  }

  return {
    isLoggedIn: false,
    user: null
  }
}

/**
 * Clears the user data from the local storage and sets isLogged in to false
 */
export const clearAuthStorage = () => {
  localStorage.setItem(
    'auth',
    JSON.stringify({
      isLoggedIn: false,
      user: null
    })
  )
}
