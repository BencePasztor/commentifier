import type { Comment } from '@/features/comments'

export interface Post {
  id: number
  title: string
  description: string
  slug: string
  imageSource: string
  sourceUrl: string
  createdAt: string
  _count: {
    comment: number
  }
}

export type FetchCursor = null | number

export interface FetchPostsResult {
  data: Post[]
  nextCursor: FetchCursor
}

export interface PostWithComments extends Post {
  comment: Comment[]
}

export interface FetchPostBySlugResult {
  data: PostWithComments
}
