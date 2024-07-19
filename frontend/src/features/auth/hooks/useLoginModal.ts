import { setShowLoginModal as loginModalAction } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const useLoginModal = () => {
  const dispatch = useDispatch()

  // Function for setting showLoginModal
  const setShowLoginModal = (state: boolean) => {
    dispatch(loginModalAction(state))
  }

  // State of the loginModal
  const showLoginModal = useSelector(
    (state: RootState) => state.auth.showLoginModal
  )

  return { showLoginModal, setShowLoginModal }
}

export { useLoginModal }
