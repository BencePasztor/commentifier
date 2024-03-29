import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/components/Layout/Layout'
import { LatestPosts, NewPost, SearchPosts, ViewPost } from '@/features/posts'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    // errorElement: TODO,
    children: [
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
      }
    ]
  }
])
