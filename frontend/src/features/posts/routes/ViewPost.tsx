import { Card, Spinner } from '@/components/Elements'
import { PostPage } from '../components/PostPage'
import { useParams } from 'react-router-dom'
import { useFetchPostBySlugQuery } from '../api/postsApi'
import { Helmet } from 'react-helmet'

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
    <>
      {isSuccess ? (
        <Helmet>
          <title>{response.data.title}</title>
          <meta name="description" content={response.data.description} />
          <meta property="og:title" content={response.data.title} />
          <meta property="og:description" content={response.data.description} />
        </Helmet>
      ) : null}

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
    </>
  )
}
