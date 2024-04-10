import { Card } from '@/components/Elements'
import LoginForm from '../components/LoginForm/LoginForm'
import PageTitle from '../components/PageTitle/PageTitle'

export const Login = () => {
  return (
    <Card className="w-full max-w-md md:rounded-lg">
      <PageTitle>Login</PageTitle>
      <LoginForm />
    </Card>
  )
}
