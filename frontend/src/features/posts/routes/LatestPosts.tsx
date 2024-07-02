import { Card } from '@/components/Elements'
import { useFetchPostsQuery } from '@/features/posts/api/postsApi'
import { setPostsCursor } from '../store/postsSlice'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '@/store'
import { InfinitePosts } from '../components/InfinitePosts'
import type { FetchCursor } from '../types'

export const LatestPosts = () => {
  // The cursor for fetching the posts
  const cursor = useSelector((state: RootState) => state.posts.cursor)

  // A function for changing the current cursor in the store
  const dispatch = useDispatch()
  const setCursor = (cursor: FetchCursor) => {
    dispatch(setPostsCursor(cursor))
  }

  // The query hook for the InfinitePosts component
  const queryHookResult = useFetchPostsQuery(cursor)

  return (
    <Card className="w-full xl:rounded-lg xl:container">
      <InfinitePosts setCursor={setCursor} {...queryHookResult} />
    </Card>
  )
}
