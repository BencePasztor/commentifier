import { z } from 'zod'

export interface Comment {
  id: number
  createdAt: string
  user: {
    username: string
    avatarSource: string
  }
  _count: {
    upvote: number
    replies: number
  }
  content: string
  postId: number
  parentId: number | null
  parent?: {
    parentId: number | null
    user: {
      username: string
    }
  }
  isUpvotedByUser: boolean
}

export interface FetchCommentsResult {
  data: Comment[]
  nextCursor: number | null
}

export interface FetchCommentParams {
  postId: number
  cursor: number | null
}

export interface FetchRepliesResult {
  data: Comment[]
}

export type CommentId = number

export interface CreateCommentResponse {
  data: Comment
}

export interface CreateReplyResponse {
  data: Comment
}

export type CreateCommentParams = {
  postId: number
  content: string
}

export type CreateReplyParams = {
  commentId: number
  content: string
}

export const commentSchema = z.object({
  content: z.string().trim().min(1, 'The comment cannot be empty.')
})

export type NewCommentData = z.infer<typeof commentSchema>

export interface UpvoteResponse {
  message: string
}

export interface UpvoteParams {
  commentId: number
  parentId: number | null
  postId: number
  isUpvotedByUser: boolean
}
