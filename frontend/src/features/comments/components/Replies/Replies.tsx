import { useState } from 'react'
import { useFetchRepliesQuery } from '../../api/commentsApi'
import { CirclePlus, LoaderCircle } from 'lucide-react'
import { CommentList } from '../CommentList'

interface RepliesProps {
  commentId: number
  replyCount: number
  level: number
}

export const Replies = ({ commentId, replyCount, level }: RepliesProps) => {
  const [showReplies, setShowReplies] = useState<boolean>(false)

  const handleShowReplies = () => {
    setShowReplies(true)
  }

  // Query hook for fetching repliess
  const { data, isError, refetch, isFetching } = useFetchRepliesQuery(
    commentId,
    {
      skip: !showReplies
    }
  )

  // If there are no replies for the comment, don't show anything.
  if (replyCount < 1) {
    return null
  }

  // If the replies are not loaded yet, show a load button
  if (!showReplies) {
    return (
      <button
        onClick={handleShowReplies}
        disabled={isFetching}
        className="flex items-center gap-1 my-2 text-xs font-medium transition-colors text-secondary-500 hover:text-primary-500 disabled:text-primary-300"
      >
        {isFetching ? (
          <LoaderCircle className="animate-spin" size={20} />
        ) : (
          <CirclePlus size={20} />
        )}
        <span>
          {replyCount > 1 ? `${replyCount} replies` : `${replyCount} reply`}
        </span>
      </button>
    )
  }

  // If there is an error, show a retry button
  if (isError) {
    return (
      <button
        onClick={refetch}
        disabled={isFetching}
        className="my-2 text-xs font-medium text-red-400"
      >
        <span>An error occurred. Try again.</span>
      </button>
    )
  }

  // Else, show the replies
  return (
    <div className="mt-4">
      <CommentList comments={data?.data ?? []} level={level} />
    </div>
  )
}
