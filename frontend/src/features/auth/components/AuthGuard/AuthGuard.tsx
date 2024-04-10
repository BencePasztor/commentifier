import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

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
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  const shouldNavigate =
    (redirect === 'authenticated' && isLoggedIn) ||
    (redirect === 'unauthenticated' && !isLoggedIn)

  return <>{shouldNavigate ? <Navigate to={to} replace /> : children}</>
}
