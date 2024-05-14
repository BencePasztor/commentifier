import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { postsReducer } from '@/features/posts/store/postsSlice'
import { authReducer } from '@/features/auth/store/authSlice'
import { authMiddleware } from '@/features/auth/api/authMiddleware'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include'
  }),
  endpoints: () => ({}),
  tagTypes: ['Posts']
})

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware).concat(authMiddleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
