import Card from '@/components/Card/Card'
import PostPage from '../components/PostPage/PostPage'
import Spinner from '@/components/Spinner/Spinner'
import { useParams } from 'react-router-dom'
import { useFetchPostBySlugQuery } from '../api/postsApi'

export const ViewPost = () => {
  const { slug } = useParams()
  const {
    data: response,
    isSuccess,
    isFetching,
    isError,
    refetch
  } = useFetchPostBySlugQuery(slug as string)

  return (
    <Card className="p-0 xl:rounded-lg xl:container">
      {/* Loading */}
      {isFetching ? (
        <div className="my-2 text-center">
          <Spinner />
        </div>
      ) : null}
      {/* Post Page */}
      {isSuccess ? <PostPage {...response.data} /> : null}
      {/* Error message */}
      {isError ? (
        <p className="my-2 text-center">
          Oops something went wrong.{' '}
          <button className="font-medium text-primary-500" onClick={refetch}>
            Try again.
          </button>
        </p>
      ) : null}
    </Card>
  )
}
