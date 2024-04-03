import { baseApi } from '@/store'
import type {
  FetchPostsResult,
  FetchPostBySlugResult,
  SearchPostParams
} from '@/features/posts/types'

const postsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Fetches the latest posts based un a cursor
    fetchPosts: build.query<FetchPostsResult, null | number>({
      query: (cursor) => (cursor ? `posts?cursor=${cursor}` : 'posts'),
      keepUnusedDataFor: Infinity,
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
    }),
    // Fetches posts that match the given search text
    searchPosts: build.query<FetchPostsResult, SearchPostParams>({
      query: ({ cursor, search }) =>
        cursor
          ? `posts/search?cursor=${cursor}&search=${encodeURIComponent(search)}`
          : `posts/search?search=${encodeURIComponent(search)}`,
      keepUnusedDataFor: Infinity,
      serializeQueryArgs: ({ queryArgs }) => queryArgs.search,
      merge: (cache, newData) => {
        cache.nextCursor = newData.nextCursor
        cache.data.push(...newData.data)
      },
      forceRefetch({ currentArg, previousArg }) {
        return (
          typeof currentArg !== typeof previousArg ||
          currentArg?.cursor !== previousArg?.cursor ||
          currentArg?.search !== previousArg?.search
        )
      }
    })
  })
})

export const {
  useFetchPostsQuery,
  useFetchPostBySlugQuery,
  useSearchPostsQuery
} = postsApi
