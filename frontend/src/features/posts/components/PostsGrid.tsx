import PostElement from '@/features/posts/components/PostElement/PostElement'
import type { Post } from '@/features/posts/types'

interface PostGridProps {
  posts: Post[]
}

const PostsGrid = ({ posts }: PostGridProps) => {
  return (
    <ul className="grid auto-rows-[15rem] grid-cols-1 sm:grid-cols-2 sm:auto-rows-[18rem] md:grid-cols-3 md:auto-rows-[15rem] lg:auto-rows-[18rem] 2xl:grid-cols-4 gap-4">
      {posts.map((item) => (
        <PostElement key={item.id} {...item} />
      ))}
    </ul>
  )
}

export default PostsGrid
