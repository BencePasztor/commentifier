import type { Comment } from '../..'
import { CommentElement } from '../CommentElement'

interface CommentListProps {
  comments: Comment[]
  fallbackMessage?: string
  level?: number
}

export const CommentList = ({
  comments,
  fallbackMessage,
  level = 0
}: CommentListProps) => {
  return (
    <>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <CommentElement key={comment.id} comment={comment} level={level} />
          ))}
        </ul>
      ) : fallbackMessage ? (
        <p className="my-2 text-center">{fallbackMessage}</p>
      ) : null}
    </>
  )
}
