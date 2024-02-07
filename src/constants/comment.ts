export const COMMENT_FIELDS = {
  id: true,
  content: true,
  parentId: true,
  createdAt: true,
  _count: {
    select: {
      upvote: true,
      replies: true
    }
  }
}
