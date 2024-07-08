import ReduxProvider from '@/providers/redux'
import RouterProvider from '@/providers/router'
import HelmetProvider from './helmet'

const Providers = () => {
  return (
    <ReduxProvider>
      <HelmetProvider>
        <RouterProvider />
      </HelmetProvider>
    </ReduxProvider>
  )
}

export default Providers
