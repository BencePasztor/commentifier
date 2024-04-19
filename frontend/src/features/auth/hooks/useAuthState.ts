import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const useAuthState = () => {
  return useSelector((state: RootState) => state.auth)
}

export { useAuthState }
