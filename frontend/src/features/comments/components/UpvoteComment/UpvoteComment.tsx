import { ThumbsUp } from 'lucide-react'
import { formatNumber } from '@/utils/numbers'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useSetUpvoteMutation } from '../../api/commentsApi'
import { useAuthState } from '@/features/auth'
import { useLoginModal } from '@/features/auth'

interface UpvoteCommentProps {
  commentId: number
  parentId: number | null
  postId: number
  upvoteCount: number
  isUpvotedByUser: boolean
}

export const UpvoteComment = ({
  commentId,
  parentId,
  postId,
  upvoteCount,
  isUpvotedByUser
}: UpvoteCommentProps) => {
  // Disable for unauthenticated users
  const { isLoggedIn } = useAuthState()
  const { setShowLoginModal } = useLoginModal()

  const [setUpvote, { isLoading }] = useSetUpvoteMutation()

  const handleClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true)
      return
    }

    setUpvote({
      commentId,
      parentId,
      postId,
      isUpvotedByUser
    })
  }

  const buttonClasses = twMerge(
    'py-1 px-2 rounded-full border flex items-center gap-2 text-xs font-medium',
    clsx({
      'text-primary-500 border-primary-500': isUpvotedByUser,
      'hover:border-secondary-500 border-transparent': !isUpvotedByUser
    })
  )

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      disabled={isLoading}
    >
      <ThumbsUp size={16} />
      {formatNumber(upvoteCount)}
    </button>
  )
}
