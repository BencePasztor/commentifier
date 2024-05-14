import type { Comment } from '@/features/comments'
import { z } from 'zod'

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

export interface SearchPostParams {
  cursor: null | number
  search: string
}

export type PostSearch = {
  cursor: FetchCursor
  search: string
}

export const newPostSchema = z.object({
  sourceUrl: z
    .string()
    .trim()
    .max(2083, 'The max lenght of the URL is 2083 characters')
    .url('Invalid URL')
    .transform((urlString) => {
      const cleanUrl = new URL(urlString)
      cleanUrl.hash = ''
      cleanUrl.search = ''
      return cleanUrl.toString()
    })
})

export type NewPostData = z.infer<typeof newPostSchema>

export interface CreatePostResponse {
  data: {
    slug: string
  }
}
