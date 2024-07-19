import { BASE_COMMENT_FIELDS } from '@/config/comment'
import { Prisma } from '@prisma/client'

interface GetCommentSelectParams {
  currentUser?: number
}

/** Returns the fields that need to be selected for comment queries
 *  The currentUser param helps deciding whether the currentUser liked a comment or not
 */
export const getCommentSelect = ({
  currentUser
}: GetCommentSelectParams): Prisma.CommentSelect => {
  const commentSelect: Prisma.CommentSelect = { ...BASE_COMMENT_FIELDS }

  if (typeof currentUser === 'number') {
    commentSelect.upvote = {
      select: {
        userId: true
      },
      where: {
        userId: currentUser
      },
      take: 1
    }
  }

  return commentSelect
}

type CommentQueryResult = Prisma.CommentGetPayload<{
  select: ReturnType<typeof getCommentSelect>
}>

/** Formats comment results by removing the unnecessary 'upvote' object and setting isUpvotedByUser */
const formatCallback = (comment: CommentQueryResult) => {
  const isUpvotedByUser = 'upvote' in comment && comment.upvote.length > 0

  //@ts-ignore
  delete comment.upvote

  return {
    ...comment,
    isUpvotedByUser
  }
}

export const formatCommentResults = (result: CommentQueryResult[]) =>
  result.map(formatCallback)
