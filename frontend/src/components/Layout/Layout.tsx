import Header from '@/components/Layout/Header/Header'
import Footer from '@/components/Layout/Footer/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
