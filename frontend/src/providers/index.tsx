import ReduxProvider from '@/providers/redux'

interface ProvidersProps {
  children: React.ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
  return <ReduxProvider>{children}</ReduxProvider>
}

export default Providers
