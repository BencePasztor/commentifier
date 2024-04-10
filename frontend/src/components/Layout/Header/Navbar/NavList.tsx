import NavListElement from '@/components/Layout/Header/Navbar/NavListElement'
import { Search, CircleUserRound, Plus, Power } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useLogout } from '@/features/auth'

const NavList = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  const { logout, isLoading } = useLogout()

  return (
    <ul className="flex items-center gap-3">
      <NavListElement icon={Search} as={Link} to="/search">
        Search
      </NavListElement>
      {isLoggedIn ? (
        <NavListElement
          icon={Power}
          as="button"
          onClick={logout}
          disabled={isLoading}
        >
          Logout
        </NavListElement>
      ) : (
        <NavListElement icon={CircleUserRound} as={Link} to="/login">
          Login
        </NavListElement>
      )}
      <NavListElement highlighted icon={Plus} as={Link} to="/new-post">
        New Post
      </NavListElement>
    </ul>
  )
}

export default NavList
