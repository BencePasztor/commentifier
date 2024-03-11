import Header from '@/components/Layout/Header/Header'
import Footer from '@/components/Layout/Footer/Footer'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className="xl:container w-full xl:mx-auto my-4 p-4 shadow-md rounded-lg bg-white h-[2000px]">
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
