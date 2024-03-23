import NavListElement from '@/components/Layout/Header/Navbar/NavListElement'
import { Search, CircleUserRound, /*LogIn, Power,*/ Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

const NavList = () => {
  return (
    <ul className="flex items-center gap-3">
      <NavListElement icon={Search} as={Link} to="/search">
        Search
      </NavListElement>
      <NavListElement icon={CircleUserRound} href="#">
        Auth related stuff
      </NavListElement>
      <NavListElement highlighted icon={Plus} as={Link} to="/new-post">
        New Post
      </NavListElement>
    </ul>
  )
}

export default NavList
