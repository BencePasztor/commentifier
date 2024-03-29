import PostTitle from '@/features/posts/components/PostElement/PostTitle'
import SourceLinkButton from '@/features/posts/components/PostElement/SourceLinkButton'
import SubmissionTimeBadge from '@/features/posts/components/PostElement/SubmissionTimeBadge'
import CommentCountBadge from '@/features/posts/components/PostElement/CommentCountBadge'
import type { Post } from '@/features/posts/types'
import { Link } from 'react-router-dom'

const PostElement = ({
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
              <SubmissionTimeBadge createdAt={createdAt} />
              <CommentCountBadge count={_count.comment} />
            </div>
          </div>
        </div>
      </article>
    </li>
  )
}

export default PostElement
