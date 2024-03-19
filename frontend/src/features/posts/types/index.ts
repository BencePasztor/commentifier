export interface Post {
  id: number
  title: string
  imageSource: string
  sourceUrl: string
  createdAt: string
  _count: {
    comment: number
  }
}

export type FetchCursor = null | number

export interface FetchPostResult {
  data: Post[]
  nextCursor: FetchCursor
}
