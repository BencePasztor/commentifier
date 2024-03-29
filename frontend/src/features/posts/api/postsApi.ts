import { baseApi } from '@/store'
import type { FetchPostsResult, FetchPostBySlugResult } from '@/features/posts/types'

const postsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Fetches the latest posts based un a cursor
    fetchPosts: build.query<FetchPostsResult, null | number>({
      query: (cursor) => (cursor ? `posts?cursor=${cursor}` : 'posts'),
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (cache, newData) => {
        cache.nextCursor = newData.nextCursor
        cache.data.push(...newData.data)
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      }
    }),
    // Fetches a post by the given slug
    fetchPostBySlug: build.query<FetchPostBySlugResult, string>({
      query: (slug) => `posts/${slug}`
    })
  })
})

export const { useFetchPostsQuery, useFetchPostBySlugQuery } = postsApi
