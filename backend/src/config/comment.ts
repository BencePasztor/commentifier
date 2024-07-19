export const BASE_COMMENT_FIELDS = {
  id: true,
  content: true,
  postId: true,
  parentId: true,
  createdAt: true,
  user: {
    select: {
      avatarSource: true,
      username: true
    }
  },
  parent: {
    select: {
      parentId: true,
      user: {
        select: {
          username: true
        }
      }
    }
  },
  _count: {
    select: {
      upvote: true,
      replies: true
    }
  }
}

export const COMMENTS_PER_PAGE = 10
