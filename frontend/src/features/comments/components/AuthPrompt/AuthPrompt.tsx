import { Link } from 'react-router-dom'
import { useLoginModal } from '@/features/auth'

export const AuthPrompt = () => {
  const { setShowLoginModal } = useLoginModal()

  return (
    <div className="p-2 m-4">
      <p className="text-sm">
        To post a comment you need to{' '}
        <button
          onClick={() => {
            setShowLoginModal(true)
          }}
          className="font-medium text-primary-500"
        >
          login
        </button>
        . If you don't have an account yet, you can{' '}
        <Link className="font-medium text-primary-500" to="/register">
          register here
        </Link>
        .
      </p>
    </div>
  )
}
