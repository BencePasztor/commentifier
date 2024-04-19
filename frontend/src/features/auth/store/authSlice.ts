import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {
  setAuthStorage,
  getAuthStorage,
  clearAuthStorage
} from '../utils/authLocalStorage'

interface UserData {
  id: number
  username: string
  email: string
  avatarSource: string
}

export type AuthState =
  | {
      isLoggedIn: false
      user: null
    }
  | {
      isLoggedIn: true
      user: UserData
    }

export const authSlice = createSlice({
  name: 'auth',
  initialState: getAuthStorage,
  reducers: {
    setUser: (_, action: PayloadAction<UserData>) => {
      const newState: AuthState = {
        isLoggedIn: true,
        user: action.payload
      }

      // Store in local storage
      setAuthStorage(newState)

      return newState
    },
    clearUser: () => {
      //Clear local storage
      clearAuthStorage()

      return {
        isLoggedIn: false,
        user: null
      } as AuthState
    }
  }
})

export const { setUser, clearUser } = authSlice.actions

export const { reducer: authReducer } = authSlice
