import { useState } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { CreateReplyForm } from '../CreateReplyForm'
import { UpvoteComment } from '../UpvoteComment'
import { useAuthState } from '@/features/auth'
import { useLoginModal } from '@/features/auth'

interface CommentActionsProps {
  commentId: number
  parentId: number | null
  postId: number
  upvoteCount: number
  isUpvotedByUser: boolean
}

export const CommentActions = ({
  commentId,
  parentId,
  postId,
  upvoteCount,
  isUpvotedByUser
}: CommentActionsProps) => {
  const [showReply, setShowReply] = useState<boolean>(false)

  const { isLoggedIn } = useAuthState()
  const { setShowLoginModal } = useLoginModal()

  const handleReplyClick = () => {
    // If the user is not logged in show the login modal
    if (!isLoggedIn) {
      setShowLoginModal(true)
      return
    }

    setShowReply((prevState) => !prevState)
  }

  return (
    <div>
      <div className="flex items-center gap-8">
        {/* Upvote button */}
        <UpvoteComment
          commentId={commentId}
          parentId={parentId}
          postId={postId}
          upvoteCount={upvoteCount}
          isUpvotedByUser={isUpvotedByUser}
        />
        {/* Reply to comment button */}
        <button
          onClick={handleReplyClick}
          className={twMerge(
            'font-medium text-xs text-secondary-500 transition-colors duration-200 hover:text-secondary-200',
            clsx({ 'text-primary-500': showReply })
          )}
        >
          Reply
        </button>
      </div>
      {/* Reply form */}
      {showReply ? (
        <CreateReplyForm
          commentId={commentId}
          onSuccess={() => {
            setShowReply(false)
          }}
        />
      ) : null}
    </div>
  )
}
