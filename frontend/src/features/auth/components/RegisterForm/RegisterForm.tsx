import { Label, Input, Button, Error } from '@/components/Form'
import { SubmitHandler } from 'react-hook-form'
import { useZodForm } from '@/hooks'
import { RegisterData, registerSchema } from '../../types'
import { useRegisterMutation } from '../../api/authApi'
import { setServerSideErrors } from '@/utils/form'
import { ErrorResponse } from '@/types'
import { Link, useNavigate } from 'react-router-dom'
import { setUser } from '../../store/authSlice'
import { useDispatch } from 'react-redux'

const RegisterForm = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const [registerMutation, { isLoading }] = useRegisterMutation()

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors: formErrors }
  } = useZodForm(registerSchema, { mode: 'onBlur' })

  const onSubmit: SubmitHandler<RegisterData> = async (data) => {
    try {
      const response = await registerMutation(data)

      // Error Handling
      if ('error' in response) {
        const { error } = response
        // SerializedError
        if ('message' in error) {
          setServerSideErrors(error, setError)
        }
        // FetchBaseQueryError
        else if ('data' in error) {
          setServerSideErrors(error.data as ErrorResponse, setError)
        }
        return
      }

      // On success, set the user in store and navigate to the main page
      dispatch(setUser(response.data.data))
      navigate('/', { replace: true })
    } catch (e) {
      setError('root', { type: 'custom', message: 'Unknown error' })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Root error */}
      {formErrors?.root ? (
        <Error className="p-2 my-4 border border-red-500 rounded-lg">
          {formErrors?.root?.message}
        </Error>
      ) : null}
      <div className="my-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          {...register('email')}
          error={formErrors?.email?.message}
          type="email"
        />
      </div>
      <div className="my-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          {...register('username')}
          error={formErrors?.username?.message}
          type="username"
        />
      </div>
      <div className="my-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          {...register('password')}
          error={formErrors?.password?.message}
          type="password"
        />
      </div>
      <div className="my-2">
        <Label htmlFor="confirmPassword">Repeat password</Label>
        <Input
          id="confirmPassword"
          {...register('confirmPassword')}
          error={formErrors?.confirmPassword?.message}
          type="password"
        />
      </div>
      <Button
        variant="primary"
        className="w-full my-4"
        type="submit"
        loading={isSubmitting || isLoading}
      >
        Register
      </Button>
      <p className="px-4 py-2 my-2 text-sm text-center">
        You already have an account?{' '}
        <Link className="font-medium text-primary-500" to="/login">
          Login here
        </Link>
      </p>
    </form>
  )
}

export default RegisterForm
