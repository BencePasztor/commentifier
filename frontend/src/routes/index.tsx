import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { ErrorElement } from '@/components/Elements/ErrorElement'
import { LatestPosts, NewPost, SearchPosts, ViewPost } from '@/features/posts'
import { Login, Register, AuthGuard, Profile } from '@/features/auth'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorElement />,
    children: [
      {
        errorElement: <ErrorElement />,
        children: [
          // Posts
          {
            index: true,
            element: <LatestPosts />
          },
          {
            path: '/new-post',
            element: <NewPost />
          },
          {
            path: '/search',
            element: <SearchPosts />
          },
          {
            path: '/posts/:slug',
            element: <ViewPost />
          },
          // Auth
          {
            path: '/login',
            element: (
              <AuthGuard redirect="authenticated" to="/">
                <Login />
              </AuthGuard>
            )
          },
          {
            path: '/register',
            element: (
              <AuthGuard redirect="authenticated" to="/">
                <Register />
              </AuthGuard>
            )
          },
          {
            path: '/profile',
            element: (
              <AuthGuard redirect="unauthenticated" to="/">
                <Profile />
              </AuthGuard>
            )
          }
        ]
      }
    ]
  }
])
