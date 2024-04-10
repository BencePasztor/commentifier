import { baseApi } from '@/store'
import type {
  LoginData,
  LoginResponse,
  RegisterData,
  RegisterResponse,
  LogoutResponse
} from '../types'

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginData>({
      query: (loginData) => ({
        url: 'auth/login',
        method: 'POST',
        body: loginData
      })
    }),
    register: build.mutation<RegisterResponse, RegisterData>({
      query: (registerData) => ({
        url: 'auth/register',
        method: 'POST',
        body: registerData
      })
    }),
    logout: build.mutation<LogoutResponse, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'DELETE'
      })
    })
  })
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi
