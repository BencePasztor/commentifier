import Brand from './Brand'
import NavList from './NavList'

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between gap-3 p-4 mx-auto max-w-screen-2xl">
      <Brand />
      <NavList />
    </nav>
  )
}
