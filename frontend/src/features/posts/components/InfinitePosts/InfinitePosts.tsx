import { PostsGrid } from '../PostGrid'
import { Spinner } from '@/components/Elements'
import type {
  TypedUseQueryHookResult,
  BaseQueryFn
} from '@reduxjs/toolkit/query/react'
import type { FetchPostsResult, FetchCursor } from '../../types'
import { useIntersectionObserver } from '@/hooks'
import { useEffect } from 'react'

type InfinitePostsProps = {
  setCursor: (cursor: FetchCursor) => void
} & TypedUseQueryHookResult<FetchPostsResult, unknown, BaseQueryFn>

export const InfinitePosts = ({
  isSuccess,
  data,
  isError,
  refetch,
  isFetching,
  setCursor
}: InfinitePostsProps) => {
  // Intersection Observer for infinite scroll
  const [targetRef, isIntersecting] = useIntersectionObserver<HTMLDivElement>()

  // Fetch the next batch of posts upon intersection
  useEffect(() => {
    if (isIntersecting && data?.nextCursor && !isFetching) {
      setCursor(data.nextCursor)
    }
  }, [isIntersecting, isFetching, data?.nextCursor, setCursor])

  return (
    <>
      {/* Posts */}
      {isSuccess ? <PostsGrid posts={data.data} /> : null}
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
    </>
  )
}
