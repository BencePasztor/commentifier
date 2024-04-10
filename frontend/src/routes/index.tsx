import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { LatestPosts, NewPost, SearchPosts, ViewPost } from '@/features/posts'
import { Login, Register, AuthGuard } from '@/features/auth'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    // errorElement: TODO,
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
      }
    ]
  }
])
