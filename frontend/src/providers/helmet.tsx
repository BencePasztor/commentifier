import { Helmet, HelmetProvider as Provider } from 'react-helmet-async'

interface HelmetProviderProps {
  children: React.ReactNode
}

const HelmetProvider = ({ children }: HelmetProviderProps) => {
  return (
    <Provider>
      <Helmet>
        <title>Commentifier</title>
        <meta
          name="description"
          content="A social app that let's you comment on anything."
        />
        <meta property="og:title" content="Commentifier" />
        <meta
          property="og:description"
          content="A social app that let's you comment on anything."
        />
        <meta property="og:image" content="/og_image.png" />
      </Helmet>
      {children}
    </Provider>
  )
}

export default HelmetProvider
