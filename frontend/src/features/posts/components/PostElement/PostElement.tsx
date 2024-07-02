import PostTitle from './PostTitle'
import SourceLinkButton from './SourceLinkButton'
import CommentCountBadge from './CommentCountBadge'
import type { Post } from '../../types'
import { Link } from 'react-router-dom'
import { PassedTime } from '@/components/Elements'
import { Clock } from 'lucide-react'

export const PostElement = ({
  title,
  slug,
  imageSource,
  sourceUrl,
  createdAt,
  _count
}: Post) => {
  return (
    <li>
      <article className="relative overflow-hidden rounded-md isolate size-full group">
        {/* Background Image */}
        <img
          src={imageSource}
          alt={title}
          className="absolute top-0 left-0 object-cover size-full -z-10"
        />
        {/* Container with gradient background */}
        <div className="flex flex-col text-white duration-200 size-full bg-gradient-to-t from-secondary-500 to-transparent group-hover:bg-secondary-600/20 transition-color">
          {/* Link to comment section */}
          <Link
            to={`/posts/${slug}`}
            className="flex flex-col justify-end flex-grow px-3 pt-3"
          >
            <PostTitle>{title}</PostTitle>
          </Link>
          <div className="flex items-center justify-between px-3 pb-3">
            <SourceLinkButton sourceUrl={sourceUrl}>Source</SourceLinkButton>
            <div className="flex items-center gap-2">
              <PassedTime
                className="inline-flex items-center gap-1 text-xs"
                dateTime={createdAt}
                children={<Clock size={14} />}
              />
              <CommentCountBadge count={_count.comment} />
            </div>
          </div>
        </div>
      </article>
    </li>
  )
}
