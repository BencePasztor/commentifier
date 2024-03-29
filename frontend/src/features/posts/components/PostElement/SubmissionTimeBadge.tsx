import { Clock } from 'lucide-react'
import { timeFrom } from '@/utils/date'

interface SubmissionTimeBadgeBadgeProps {
  createdAt: string
}

const SubmissionTimeBadge = ({ createdAt }: SubmissionTimeBadgeBadgeProps) => {
  return (
    <time
      dateTime={createdAt}
      className="inline-flex gap-1 items-center text-xs"
    >
      <Clock size={14} />
      <span>{timeFrom(createdAt)}</span>
    </time>
  )
}

export default SubmissionTimeBadge
