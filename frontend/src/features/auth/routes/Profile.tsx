import { Helmet } from 'react-helmet'
import { Card, CardTitle } from '@/components/Elements'
import { ProfileForm } from '../components/ProfileForm'

export const Profile = () => {
  return (
    <>
      <Helmet>
        <title>Profile</title>
        <meta property="og:title" content="Profile" />
      </Helmet>

      <Card className="w-full max-w-md md:rounded-lg">
        <CardTitle>Profile</CardTitle>
        <ProfileForm />
      </Card>
    </>
  )
}
