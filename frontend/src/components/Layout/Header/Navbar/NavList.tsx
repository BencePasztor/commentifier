import NavItem from './NavItem'
import { Search, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { NavAuth } from './NavAuth/NavAuth'

const NavList = () => {
  return (
    <ul className="flex items-center gap-3">
      <NavItem icon={Search} as={Link} to="/search">
        Search
      </NavItem>
      <NavAuth />
      <NavItem highlighted icon={Plus} as={Link} to="/new-post">
        New Post
      </NavItem>
    </ul>
  )
}

export default NavList
