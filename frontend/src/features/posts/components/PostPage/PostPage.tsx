import PostHeader from './PostHeader/PostHeader'
import type { Post } from '../../types'
import { InfiniteComments, CreateCommentForm } from '@/features/comments'

const PostPage = ({
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

export default PostPage
