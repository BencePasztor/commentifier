import { Link } from 'react-router-dom'

export const AuthPrompt = () => {
  return (
    <div className="p-2 m-4">
      <p className="text-sm">
        To post a comment you need to{' '}
        <Link className="font-medium text-primary-500" to="/login">
          login
        </Link>
        . If you don't have an account yet, you can{' '}
        <Link className="font-medium text-primary-500" to="/register">
          register here
        </Link>
        .
      </p>
    </div>
  )
}
