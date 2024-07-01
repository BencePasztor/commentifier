import { Button, Error } from '@/components/Form'
import { useCreateCommentMutation } from '../../api/commentsApi'
import { CommentInput } from '../CommentInput/CommentInput'
import { useZodForm } from '@/hooks'
import { commentSchema, NewCommentData } from '../..'
import { SubmitHandler } from 'react-hook-form'
import { setServerSideErrors } from '@/utils/form'
import { AuthPrompt } from '../AuthPrompt/AuthPrompt'
import { useAuthState } from '@/features/auth'

interface CreateCommentFormProps {
  postId: number
  onSuccess?: () => void
}

export const CreateCommentForm = ({
  postId,
  onSuccess
}: CreateCommentFormProps) => {
  const authState = useAuthState()

  const [createComment, { isLoading }] = useCreateCommentMutation()

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting, errors: formErrors }
  } = useZodForm(commentSchema, { mode: 'onBlur' })

  const onSubmit: SubmitHandler<NewCommentData> = async ({ content }) => {
    try {
      const response = await createComment({
        postId,
        content
      })

      // Error Handling
      if ('error' in response) {
        const { error } = response
        setServerSideErrors(error, setError)
        return
      }

      // Clear the form
      reset()

      // Callback
      if (typeof onSuccess === 'function') {
        onSuccess()
      }
    } catch (e) {
      setError('root', { type: 'custom', message: 'Unknown error' })
    }
  }

  // If the user is not logged in, display a register/login prompt
  if (!authState.isLoggedIn) {
    return <AuthPrompt />
  }

  return (
    <div className="p-2 m-4 border-2 rounded-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CommentInput
          {...register('content')}
          placeholder="Write your comment..."
        />
        <div className="flex flex-wrap justify-between gap-2">
          <div>
            {/* Root error */}
            {formErrors?.root ? (
              <Error>{formErrors?.root?.message}</Error>
            ) : null}
          </div>
          <Button type="submit" loading={isSubmitting || isLoading}>
            Send Comment
          </Button>
        </div>
      </form>
    </div>
  )
}
