export interface Post {
  id: number
  title: string
  image: string
  sourceUrl: string
  createdAt: string
  _count: {
    comment: number
  }
}
