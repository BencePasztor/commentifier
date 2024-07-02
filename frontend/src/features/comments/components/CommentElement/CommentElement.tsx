import type { Comment } from '../..'
import { Avatar } from '@/components/Elements'
import { Replies } from '../Replies'
import clsx from 'clsx'
import { Reply } from 'lucide-react'
import { CommentActions } from '../CommentActions'
import { PassedTime } from '@/components/Elements'

interface CommentElementProps {
  comment: Comment
  level?: number
}

export const CommentElement = ({ comment, level = 0 }: CommentElementProps) => {
  const { id: commentId, content, user, createdAt, _count, parent } = comment
  const { username, avatarSource } = user
  const { replies: replyCount /*upvote: upvoteCount*/ } = _count

  return (
    <li>
      <div className="flex items-start gap-2 my-2">
        {/* Avatar */}
        <Avatar
          className="size-10"
          src={avatarSource}
          alt={username}
          fallback={username[0]}
        />
        <div className="flex-grow py-2 text-sm">
          {/* Username */}
          <span className="block mb-1 font-semibold text-primary-400">
            {username}
          </span>
          {/* Reply To */}
          {parent?.user.username ? (
            <span className="flex items-center gap-1 mb-1 text-xs">
              <Reply size={14} />
              {parent.user.username}
            </span>
          ) : null}
          {/* Time */}
          <PassedTime className="block mb-2 text-xs" dateTime={createdAt} />
          {/* Content */}
          <p className="my-2">{content}</p>
          {/* Actions */}
          <CommentActions commentId={commentId} />
        </div>
      </div>
      <div
        className={clsx({
          'pl-12': level < 2
        })}
      >
        <Replies
          commentId={commentId}
          replyCount={replyCount}
          level={level + 1}
        />
      </div>
    </li>
  )
}
