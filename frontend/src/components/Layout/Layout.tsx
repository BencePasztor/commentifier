import Header from '@/components/Layout/Header/Header'
import Footer from '@/components/Layout/Footer/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <Header />
      <main className="w-full p-4 my-4 bg-white shadow-md xl:rounded-lg xl:container xl:mx-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
