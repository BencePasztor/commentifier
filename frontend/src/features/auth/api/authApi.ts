import { baseApi } from '@/store'
import type {
  LoginData,
  LoginResponse,
  RegisterData,
  RegisterResponse,
  LogoutResponse,
  UpdateProfileResponse,
  ProfileData
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
    }),
    updateProfile: build.mutation<UpdateProfileResponse, FormData>({
      query: (profileData) => ({
        url: 'users/profile',
        method: 'PATCH',
        body: profileData
      })
    })
  })
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateProfileMutation
} = authApi
