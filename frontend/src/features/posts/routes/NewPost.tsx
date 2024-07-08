import { Card, CardTitle } from '@/components/Elements'
import { NewPostForm } from '../components/NewPostForm'
import { Helmet } from 'react-helmet-async'

export const NewPost = () => {
  return (
    <>
      <Helmet>
        <title>New Post</title>
        <meta property="og:title" content="New Post" />
      </Helmet>

      <Card className="w-full max-w-md md:rounded-lg">
        <CardTitle>New Post</CardTitle>
        <NewPostForm />
      </Card>
    </>
  )
}
