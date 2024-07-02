import type { Post } from '../../types'
import SourceLinkButton from '../PostElement/SourceLinkButton'
import { PassedTime } from '@/components/Elements'
import { Clock } from 'lucide-react'

interface PostHeaderProps
  extends Pick<
    Post,
    'title' | 'description' | 'imageSource' | 'sourceUrl' | 'createdAt'
  > {}

const PostHeader = ({
  title,
  description,
  imageSource,
  sourceUrl,
  createdAt
}: PostHeaderProps) => {
  return (
    <article className="relative flex items-center w-full p-4 isolate min-h-80">
      {/* Gradient Background */}
      <div className="absolute size-full top-0 left-0 bg-gradient-to-r from-secondary-500 to-transparent from-[calc(100%_-_320px)] -z-10"></div>
      {/* Background Image */}
      <img
        className="absolute top-0 right-0 object-cover h-full -z-20"
        src={imageSource}
        alt={title}
      />
      {/* Post Content */}
      <div className="text-white max-w-prose">
        <h1 className="mb-4 text-3xl font-medium">{title}</h1>
        <p className="mb-4 text-sm">{description}</p>
        <p className="mb-4">
          <PassedTime
            className="inline-flex items-center gap-1 text-xs"
            dateTime={createdAt}
            children={<Clock size={14} />}
          />
        </p>
        <SourceLinkButton className="text-xs" sourceUrl={sourceUrl}>
          Source
        </SourceLinkButton>
      </div>
    </article>
  )
}

export default PostHeader
