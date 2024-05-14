import { Card, CardTitle } from '@/components/Elements'
import RegisterForm from '../components/RegisterForm/RegisterForm'

export const Register = () => {
  return (
    <Card className="w-full max-w-md md:rounded-lg">
      <CardTitle>Register</CardTitle>
      <RegisterForm />
    </Card>
  )
}
