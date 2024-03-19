import { useEffect, useState } from 'react'
import { PostsGrid } from '@/features/posts/components/PostGrid/PostsGrid'
import { useFetchPostsQuery } from '@/features/posts/api/postsApi'
import { FetchCursor } from '@/features/posts/types'
import Spinner from '@/components/Spinner/Spinner'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export const LatestPosts = () => {
  // Intersection Observer for infinite scroll
  const [targetRef, isIntersecting] = useIntersectionObserver<HTMLDivElement>()

  // The cursor for fetching the posts
  const [cursor, setCursor] = useState<FetchCursor>(null)
  const {
    data: response,
    isSuccess,
    isFetching,
    isError,
    refetch
  } = useFetchPostsQuery(cursor)

  // Fetch the next batch of posts
  useEffect(() => {
    if (isIntersecting && response?.nextCursor && !isFetching) {
      setCursor(response.nextCursor)
    }
  }, [isIntersecting, isFetching, response?.nextCursor])

  return (
    <div>
      {/* Posts */}
      {isSuccess ? <PostsGrid posts={response.data} /> : null}
      <div className="my-2 text-center">
        {/* Error message */}
        {isError ? (
          <p>
            Oops something went wrong.{' '}
            <button className="font-medium text-primary-500" onClick={refetch}>
              Try again.
            </button>
          </p>
        ) : null}
        {/* Spinner for loading */}
        {isFetching ? <Spinner /> : null}
      </div>
      {/* Triggers a fetch if it's visible on the screen */}
      <div ref={targetRef}></div>
    </div>
  )
}
