import { useLogoutMutation } from '../api/authApi'
import { clearUser } from '../store/authSlice'
import { useDispatch } from 'react-redux'

const useLogout = () => {
  const dispatch = useDispatch()
  const [logoutMutation, { isLoading }] = useLogoutMutation()

  const logout = async () => {
    try {
      const response = await logoutMutation()
      if ('data' in response) {
        dispatch(clearUser())
      }
    } catch (e) {
      console.error(e)
    }
  }

  return { logout, isLoading }
}

export { useLogout }
