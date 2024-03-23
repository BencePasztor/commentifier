import ReduxProvider from '@/providers/redux'
import RouterProvider from '@/providers/router'

const Providers = () => {
  return (
    <ReduxProvider>
      <RouterProvider />
    </ReduxProvider>
  )
}

export default Providers
