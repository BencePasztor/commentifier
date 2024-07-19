import { Header } from '../Header'
import { Footer } from '../Footer'
import { Outlet } from 'react-router-dom'
import { LoginModal } from '@/features/auth'

export const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <LoginModal />
    </>
  )
}
