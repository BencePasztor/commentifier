import { Card, CardTitle } from '@/components/Elements'
import { NewPostForm } from '../components/NewPostForm/NewPostForm'

export const NewPost = () => {
  return (
    <Card className="w-full max-w-md md:rounded-lg">
      <CardTitle>New Post</CardTitle>
      <NewPostForm />
    </Card>
  )
}
