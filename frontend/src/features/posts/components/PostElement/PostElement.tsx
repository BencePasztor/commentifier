import PostTitle from '@/features/posts/components/PostElement/PostTitle'
import SourceLinkButton from '@/features/posts/components/PostElement/SourceLinkButton'
import SubmissionTimeBadge from '@/features/posts/components/PostElement/SubmissionTimeBadge'
import CommentCountBadge from '@/features/posts/components/PostElement/CommentCountBadge'
import type { Post } from "@/features/posts/types"

const PostElement = ({
  id,
  title,
  image,
  sourceUrl,
  createdAt,
  _count
}: Post) => {
  return (
    <li>
      <article className="relative isolate size-full rounded-md overflow-hidden group">
        {/* Background Image */}
        <img
          src={image}
          alt={title}
          className="absolute size-full object-cover top-0 left-0 -z-10"
        />
        {/* Container with gradient background */}
        <div className="flex flex-col size-full bg-gradient-to-t from-secondary-500 to-transparent text-white group-hover:bg-secondary-600/20 transition-color duration-200">
          {/* Link to comment section */}
          <a
            href={`/TODO/${id}`}
            className="flex-grow flex flex-col justify-end px-3 pt-3"
          >
            <PostTitle>{title}</PostTitle>
          </a>
          <div className="flex justify-between items-center px-3 pb-3 text-xs">
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
