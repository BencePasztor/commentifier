import Providers from '@/providers'
import { Helmet } from 'react-helmet'

function App() {
  return (
    <>
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
      <Providers />
    </>
  )
}

export default App
