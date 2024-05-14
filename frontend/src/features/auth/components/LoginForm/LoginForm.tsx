import { Label, Input, Button, Error } from '@/components/Form'
import { SubmitHandler } from 'react-hook-form'
import { useZodForm } from '@/hooks'
import { LoginData, loginSchema } from '../../types'
import { useLoginMutation } from '../../api/authApi'
import { setServerSideErrors } from '@/utils/form'
import { Link, useNavigate } from 'react-router-dom'
import { setUser } from '../../store/authSlice'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const [login, { isLoading }] = useLoginMutation()

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors: formErrors }
  } = useZodForm(loginSchema, { mode: 'onBlur' })

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    try {
      const response = await login(data)

      // Error Handling
      if ('error' in response) {
        const { error } = response
        setServerSideErrors(error, setError)
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
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          {...register('password')}
          error={formErrors?.password?.message}
          type="password"
        />
      </div>
      <Button
        variant="primary"
        className="w-full my-4"
        type="submit"
        loading={isSubmitting || isLoading}
      >
        Login
      </Button>
      <p className="px-4 py-2 my-2 text-sm text-center">
        You don't have an account?{' '}
        <Link className="font-medium text-primary-500" to="/register">
          Register here
        </Link>
      </p>
    </form>
  )
}

export default LoginForm
