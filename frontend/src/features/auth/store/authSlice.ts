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
      showLoginModal: boolean
    }
  | {
      isLoggedIn: true
      user: UserData
      showLoginModal: boolean
    }

export const authSlice = createSlice({
  name: 'auth',
  initialState: getAuthStorage,
  reducers: {
    setUser: (_, action: PayloadAction<UserData>) => {
      const newState: AuthState = {
        isLoggedIn: true,
        user: action.payload,
        showLoginModal: false
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
        user: null,
        showLoginModal: false
      } as AuthState
    },
    setAvatar: (state, action: PayloadAction<string>) => {
      if (state.isLoggedIn) {
        const newState: AuthState = {
          isLoggedIn: true,
          user: {
            id: state.user.id,
            username: state.user.username,
            email: state.user.email,
            avatarSource: action.payload
          },
          showLoginModal: false
        }

        setAuthStorage(newState)

        return newState
      }
    },
    setShowLoginModal: (state, action: PayloadAction<boolean>) => {
      state.showLoginModal = action.payload
    }
  }
})

export const { setUser, clearUser, setAvatar, setShowLoginModal } =
  authSlice.actions

export const { reducer: authReducer } = authSlice
