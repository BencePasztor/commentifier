import { useRouteError } from 'react-router-dom'
import { Card, CardTitle } from '@/components/Elements'
import { Frown } from 'lucide-react'

export const ErrorElement = () => {
  let error = useRouteError()
  console.error(error)

  return (
    <Card className="w-full max-w-md text-center md:rounded-lg">
      <CardTitle>Oops! Something went wrong.</CardTitle>
      <Frown
        className="inline-block my-4 text-primary-500 animate-bounce"
        size={36}
      />
      <p className="text-sm">An error occurred. Please try again later.</p>
    </Card>
  )
}
