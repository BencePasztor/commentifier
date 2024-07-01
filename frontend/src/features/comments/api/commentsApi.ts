import { baseApi } from '@/store'
import type {
  FetchCommentsResult,
  FetchCommentParams,
  FetchRepliesResult,
  CommentId,
  CreateCommentParams,
  CreateCommentResponse,
  CreateReplyParams,
  CreateReplyResponse
} from '..'

const commentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Fetches comments for a post (cursor based)
    fetchComments: build.query<FetchCommentsResult, FetchCommentParams>({
      query: ({ postId, cursor }) =>
        cursor
          ? `posts/${postId}/comments?cursor=${cursor}`
          : `posts/${postId}/comments`,
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.postId}`
      },
      merge: (cache, newData) => {
        cache.nextCursor = newData.nextCursor
        cache.data.push(...newData.data)
      },
      forceRefetch({ currentArg, previousArg }) {
        return (
          typeof currentArg !== typeof previousArg ||
          currentArg?.cursor !== previousArg?.cursor ||
          currentArg?.postId !== previousArg?.postId
        )
      }
    }),
    // Fetches replies to a comment
    fetchReplies: build.query<FetchRepliesResult, CommentId>({
      query: (commentId) => `comments/${commentId}/replies`
    }),
    // Creates a comment for a post
    createComment: build.mutation<CreateCommentResponse, CreateCommentParams>({
      query: ({ postId, content }) => ({
        url: `posts/${postId}/comments`,
        method: 'POST',
        body: {
          content: content
        }
      }),
      // Update cached comments without refetching everything
      async onQueryStarted({ postId }, { dispatch, queryFulfilled }) {
        try {
          const { data: createCommentResponse } = await queryFulfilled

          // Prepend the new comment to the cached comments of the post
          dispatch(
            commentsApi.util.updateQueryData(
              'fetchComments',
              { postId, cursor: null },
              (draft) => {
                draft.data.unshift(createCommentResponse.data)
              }
            )
          )
        } catch (error) {
          console.error(error)
        }
      }
    }),
    // Creates a reply for a comment
    createReply: build.mutation<CreateReplyResponse, CreateReplyParams>({
      query: ({ commentId, content }) => ({
        url: `/comments/${commentId}/replies`,
        method: 'POST',
        body: {
          content
        }
      }),
      // Update cached comments without refetching everything
      async onQueryStarted({ commentId }, { dispatch, queryFulfilled }) {
        try {
          const { data: createCommentResponse } = await queryFulfilled

          // Push the new comment to the cached replies
          dispatch(
            commentsApi.util.updateQueryData(
              'fetchReplies',
              commentId,
              (draft) => {
                draft.data.push(createCommentResponse.data)
              }
            )
          )

          // Increase reply count for the parent of the comment
          const parentIsReply =
            typeof createCommentResponse.data.parent?.parentId === 'number'
          // If the parent is a reply update the "fetchReplies" cache
          if (parentIsReply) {
            dispatch(
              commentsApi.util.updateQueryData(
                'fetchReplies',
                createCommentResponse.data.parent!.parentId!,
                (draft) => {
                  for (const item of draft.data) {
                    if (item.id === commentId) {
                      item._count.replies += 1
                      break
                    }
                  }
                }
              )
            )
          }
          // Else update the "fetchComments" cache
          else {
            dispatch(
              commentsApi.util.updateQueryData(
                'fetchComments',
                { postId: createCommentResponse.data.postId, cursor: null },
                (draft) => {
                  for (const item of draft.data) {
                    if (item.id === commentId) {
                      item._count.replies += 1
                      break
                    }
                  }
                }
              )
            )
          }
        } catch (error) {
          console.error(error)
        }
      }
    })
  })
})

export const {
  useFetchCommentsQuery,
  useFetchRepliesQuery,
  useCreateCommentMutation,
  useCreateReplyMutation
} = commentsApi
