import { CommentList } from '../CommentList'
import { Spinner } from '@/components/Elements'
import { useIntersectionObserver } from '@/hooks'
import { useFetchCommentsQuery } from '../../api/commentsApi'
import { useState, useEffect } from 'react'

interface InfiniteCommentsProps {
  postId: number
}

export const InfiniteComments = ({ postId }: InfiniteCommentsProps) => {
  // Intersection Observer for infinite scroll
  const [targetRef, isIntersecting] = useIntersectionObserver<HTMLDivElement>()
  const [cursor, setCursor] = useState<number | null>(null)

  // The query hook for the InfinitePosts component
  const { isSuccess, data, isError, refetch, isFetching } =
    useFetchCommentsQuery({ postId, cursor })

  // Fetch the next batch of comments upon intersection
  useEffect(() => {
    if (isIntersecting && data?.nextCursor && !isFetching) {
      setCursor(data.nextCursor)
    }
  }, [isIntersecting, isFetching, data?.nextCursor, setCursor])

  return (
    <div className="m-4">
      {/* Comments */}
      {isSuccess ? (
        <CommentList
          comments={data.data}
          fallbackMessage="Be the first to comment!"
        />
      ) : null}
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
      {/* Triggers fetch if it's visible on the screen */}
      <div ref={targetRef}></div>
    </div>
  )
}
