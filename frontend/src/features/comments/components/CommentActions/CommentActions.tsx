import { useState } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { CreateReplyForm } from '../CreateReplyForm/CreateReplyForm'

interface CommentActionsProps {
  commentId: number
  //TODO: Likes, is liked or disliked ...etc.
}

export const CommentActions = ({ commentId }: CommentActionsProps) => {
  const [showReply, setShowReply] = useState<boolean>(false)

  const handleClick = () => {
    setShowReply((prevState) => !prevState)
  }

  return (
    <div>
      <div className="flex items-center gap-8">
        {/* TODO: Like, Dislike */}
        <button
          onClick={handleClick}
          className={twMerge(
            'font-medium text-xs text-secondary-500 transition-colors duration-200 hover:text-secondary-200',
            clsx({ 'text-primary-500': showReply })
          )}
        >
          Reply
        </button>
      </div>
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
