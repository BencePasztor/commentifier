import { Navigate } from 'react-router-dom'
import { useAuthState } from '../../hooks'

interface AuthGuardProps {
  redirect?: 'authenticated' | 'unauthenticated'
  to?: string
  children: React.ReactNode
}

export const AuthGuard = ({
  redirect = 'unauthenticated',
  to = '/',
  children
}: AuthGuardProps) => {
  const { isLoggedIn } = useAuthState()
  const shouldNavigate =
    (redirect === 'authenticated' && isLoggedIn) ||
    (redirect === 'unauthenticated' && !isLoggedIn)

  return <>{shouldNavigate ? <Navigate to={to} replace /> : children}</>
}
