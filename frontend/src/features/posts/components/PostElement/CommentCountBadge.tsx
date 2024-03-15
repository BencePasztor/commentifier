import { MessageCircleMore } from 'lucide-react'

interface CommentCountBadgeProps {
  count: number
}

const CommentCountBadge = ({ count }: CommentCountBadgeProps) => {
  return (
    <span className="inline-flex gap-1 items-center">
      <MessageCircleMore size={14} />
      <span>{count ?? 0}</span>
    </span>
  )
}

export default CommentCountBadge
