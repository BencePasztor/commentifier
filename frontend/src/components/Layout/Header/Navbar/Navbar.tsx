import Brand from '@/components/Layout/Header/Navbar/Brand'
import NavList from '@/components/Layout/Header/Navbar/NavList'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between gap-3 p-4 mx-auto max-w-screen-2xl">
      <Brand />
      <NavList />
    </nav>
  )
}

export default Navbar
