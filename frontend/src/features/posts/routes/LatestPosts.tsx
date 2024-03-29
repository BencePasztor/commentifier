import { useEffect } from 'react'
import Card from '@/components/Card/Card'
import { PostsGrid } from '@/features/posts/components/PostGrid/PostsGrid'
import Spinner from '@/components/Spinner/Spinner'
import { useIntersectionObserver } from '@/hooks'
import { useFetchPostsQuery } from '@/features/posts/api/postsApi'
import { setPostsCursor } from '../store/postsSlice'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'

export const LatestPosts = () => {
  // Intersection Observer for infinite scroll
  const [targetRef, isIntersecting] = useIntersectionObserver<HTMLDivElement>()

  // The cursor for fetching the posts
  const cursor = useSelector((state: RootState) => state.posts.cursor)
  const dispatch = useDispatch()
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
      dispatch(setPostsCursor(response.nextCursor))
    }
  }, [isIntersecting, isFetching, response?.nextCursor, dispatch])

  return (
    <Card className="w-full xl:rounded-lg xl:container">
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
    </Card>
  )
}
