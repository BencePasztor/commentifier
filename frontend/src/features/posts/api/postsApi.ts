import { baseApi } from '@/store'
import type {
  FetchPostsResult,
  FetchPostBySlugResult,
  SearchPostParams,
  NewPostData,
  CreatePostResponse
} from '@/features/posts/types'
import { clearPostsCursor, clearSearchPostsCursor } from '../store/postsSlice'

const postsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Fetches the latest posts based un a cursor
    fetchPosts: build.query<FetchPostsResult, null | number>({
      query: (cursor) => (cursor ? `posts?cursor=${cursor}` : 'posts'),
      providesTags: ['Posts'],
      keepUnusedDataFor: Infinity,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (cache, newData) => {
        cache.nextCursor = newData.nextCursor
        cache.data.push(...newData.data)
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      // Clears stored cursor when cached data is removed
      async onCacheEntryAdded(
        _,
        { cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        try {
          await cacheDataLoaded
        } catch (e) {
          console.error(e)
        }
        await cacheEntryRemoved
        dispatch(clearPostsCursor())
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
      providesTags: ['Posts'],
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
      },
      // Clears stored cursor when cached data is removed
      async onCacheEntryAdded(
        _,
        { cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        try {
          await cacheDataLoaded
        } catch (e) {
          console.error(e)
        }
        await cacheEntryRemoved
        dispatch(clearSearchPostsCursor())
      }
    }),
    // Creates a new post with the given sourceUrl
    createPost: build.mutation<CreatePostResponse, NewPostData>({
      query: (postData) => ({
        url: 'posts',
        method: 'POST',
        body: postData
      }),
      invalidatesTags: ['Posts']
    })
  })
})

export const {
  useFetchPostsQuery,
  useFetchPostBySlugQuery,
  useSearchPostsQuery,
  useCreatePostMutation
} = postsApi
