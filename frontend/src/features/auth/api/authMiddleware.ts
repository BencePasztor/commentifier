import { isRejectedWithValue } from '@reduxjs/toolkit'
import { clearUser } from '../store/authSlice'
import type { Middleware } from '@reduxjs/toolkit'

/**
 * Clears the user from the store if the backend returns with status 401 (Unauthorized)
 */
export const authMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      const { payload } = action
      if (
        payload !== null &&
        typeof payload === 'object' &&
        'status' in payload
      ) {
        if (payload.status === 401) {
          dispatch(clearUser())
        }
      }
    }

    return next(action)
  }
