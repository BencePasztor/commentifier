import { Card, CardTitle } from '@/components/Elements'
import LoginForm from '../components/LoginForm/LoginForm'

export const Login = () => {
  return (
    <Card className="w-full max-w-md md:rounded-lg">
      <CardTitle>Login</CardTitle>
      <LoginForm />
    </Card>
  )
}
