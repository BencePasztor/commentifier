import { PostElement } from '../PostElement'
import type { Post } from '../../types'

interface PostGridProps {
  posts: Post[]
}

export const PostsGrid = ({ posts }: PostGridProps) => {
  return (
    <>
      {posts.length > 0 ? (
        <ul className="grid auto-rows-[15rem] grid-cols-1 sm:grid-cols-2 sm:auto-rows-[18rem] md:grid-cols-3 md:auto-rows-[15rem] lg:auto-rows-[18rem] 2xl:grid-cols-4 gap-4">
          {posts.map((item) => (
            <PostElement key={item.id} {...item} />
          ))}
        </ul>
      ) : (
        <p className="my-2 text-center">
          We don't have any posts to show you.... 😥
        </p>
      )}
    </>
  )
}
