import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const useAuthState = () => {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth)
  return { isLoggedIn, user }
}

export { useAuthState }
