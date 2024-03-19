import { baseApi } from '@/store'
import { FetchPostResult } from '@/features/posts/types'

const postsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchPosts: build.query<FetchPostResult, null | number>({
      query: (cursor) => (cursor ? `posts?cursor=${cursor}` : 'posts'),
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (cache, newData) => {
        cache.nextCursor = newData.nextCursor
        cache.data.push(...newData.data)
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      }
    })
  })
})

export const { useFetchPostsQuery } = postsApi
