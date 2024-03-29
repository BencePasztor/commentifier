import PostHeader from './PostHeader/PostHeader'
import type { PostWithComments } from '../../types'

const PostPage = ({
  /*id,*/
  title,
  description,
  imageSource,
  sourceUrl,
  createdAt
  /*_count, comment*/
}: PostWithComments) => {
  return (
    <>
      <PostHeader
        {...{ title, description, imageSource, sourceUrl, createdAt }}
      />
      {/* TODO: Comments */}
    </>
  )
}

export default PostPage
