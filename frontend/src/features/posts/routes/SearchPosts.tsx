import { Card } from '@/components/Elements'
import { SearchForm } from '../components/SearchForm'
import { setPostsSearchState } from '../store/postsSlice'
import { useSearchPostsQuery } from '../api/postsApi'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { InfinitePosts } from '../components/InfinitePosts'
import { useSearchParams } from 'react-router-dom'
import type { FetchCursor } from '../types'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'

export const SearchPosts = () => {
  // The search query is stored in the URL params
  const [searchParams, setSearchParams] = useSearchParams()
  const queryParam = searchParams.get('query') ?? ''

  // Cursor for the infinite scroll query
  const { cursor, search } = useSelector(
    (state: RootState) => state.posts.searchState
  )

  // A function for changing the current cursor in the store
  const dispatch = useDispatch()
  const setCursor = (newCursor: FetchCursor) => {
    dispatch(setPostsSearchState({ search, cursor: newCursor }))
  }

  // If the queryParam is different than the one we keep in the store, refresh the store
  useEffect(() => {
    if (search !== queryParam) {
      dispatch(setPostsSearchState({ search: queryParam, cursor: null }))
    }
  }, [search, queryParam, dispatch])

  // The query hook for the InfinitePosts component
  const queryHookResult = useSearchPostsQuery(
    { cursor, search },
    { skip: search.length === 0 }
  )

  // Handles the SearchForm submission by resetting the cursor and setting the search param
  const handleSubmit = (query: string) => {
    if (query.length === 0) {
      return
    }
    dispatch(setPostsSearchState({ search: query, cursor: null }))
    setSearchParams({ query }, { replace: true })
  }

  return (
    <>
      <Helmet>
        <title>Search Posts</title>
        <meta property="og:title" content="Search Posts" />
      </Helmet>

      <Card className="w-full xl:rounded-lg xl:container">
        <SearchForm value={queryParam} handleSubmit={handleSubmit} />
        <InfinitePosts setCursor={setCursor} {...queryHookResult} />
      </Card>
    </>
  )
}
