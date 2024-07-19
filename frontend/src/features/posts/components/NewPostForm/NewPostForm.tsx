import { Label, Input, Button, Error } from '@/components/Form'
import { useZodForm } from '@/hooks'
import { newPostSchema, NewPostData } from '../../types'
import { setServerSideErrors } from '@/utils/form'
import { SubmitHandler } from 'react-hook-form'
import { useCreatePostMutation } from '../../api/postsApi'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from '@/features/auth'
import { useLoginModal } from '@/features/auth'

export const NewPostForm = () => {
  const navigate = useNavigate()
  const [createPost, { isLoading }] = useCreatePostMutation()
  const { isLoggedIn } = useAuthState()
  const { setShowLoginModal } = useLoginModal()

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors: formErrors }
  } = useZodForm(newPostSchema, { mode: 'onBlur' })

  const onSubmit: SubmitHandler<NewPostData> = async (data) => {
    // If the user is not logged in show the login modal
    if (!isLoggedIn) {
      setShowLoginModal(true)
      return
    }

    try {
      const response = await createPost(data)

      // Error Handling
      if ('error' in response) {
        const { error } = response
        setServerSideErrors(error, setError)
        return
      }

      // On success, redirect to post
      navigate(`/posts/${response.data.data.slug}`, { replace: true })
    } catch (e) {
      setError('root', { type: 'custom', message: 'Unknown error' })
    }
  }

  return (
    <div className="mt-2 mb-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Root error */}
        {formErrors?.root ? (
          <Error className="p-2 my-4 border border-red-500 rounded-lg">
            {formErrors?.root?.message}
          </Error>
        ) : null}
        <div className="my-2">
          <Label htmlFor="sourceUrl">URL</Label>
          <Input
            id="sourceUrl"
            placeholder="The url of the article you want to post"
            {...register('sourceUrl')}
            error={formErrors?.sourceUrl?.message}
          />
        </div>
        <Button
          variant="primary"
          className="w-full my-4"
          type="submit"
          loading={isSubmitting || isLoading}
        >
          Submit
        </Button>
      </form>
    </div>
  )
}
