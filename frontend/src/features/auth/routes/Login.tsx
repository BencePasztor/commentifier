import { Card, CardTitle } from '@/components/Elements'
import { LoginForm } from '../components/LoginForm'
import { Helmet } from 'react-helmet'

export const Login = () => {
  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta property="og:title" content="Login" />
      </Helmet>

      <Card className="w-full max-w-md md:rounded-lg">
        <CardTitle>Login</CardTitle>
        <LoginForm />
      </Card>
    </>
  )
}
