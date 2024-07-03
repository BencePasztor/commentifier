import { Card, CardTitle } from '@/components/Elements'
import { RegisterForm } from '../components/RegisterForm'
import { Helmet } from 'react-helmet'

export const Register = () => {
  return (
    <>
      <Helmet>
        <title>Register</title>
        <meta property="og:title" content="Register" />
      </Helmet>

      <Card className="w-full max-w-md md:rounded-lg">
        <CardTitle>Register</CardTitle>
        <RegisterForm />
      </Card>
    </>
  )
}
