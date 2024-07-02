import PostHeader from './PostHeader'
import type { Post } from '../../types'
import { InfiniteComments, CreateCommentForm } from '@/features/comments'

export const PostPage = ({
  id,
  title,
  description,
  imageSource,
  sourceUrl,
  createdAt
}: Post) => {
  return (
    <>
      <PostHeader
        {...{ title, description, imageSource, sourceUrl, createdAt }}
      />
      <CreateCommentForm postId={id} />
      <InfiniteComments postId={id} />
    </>
  )
}
