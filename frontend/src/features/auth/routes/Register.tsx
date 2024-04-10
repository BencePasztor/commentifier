import { Card } from '@/components/Elements'
import RegisterForm from '../components/RegisterForm/RegisterForm'
import PageTitle from '../components/PageTitle/PageTitle'

export const Register = () => {
  return (
    <Card className="w-full max-w-md md:rounded-lg">
      <PageTitle>Register</PageTitle>
      <RegisterForm />
    </Card>
  )
}
