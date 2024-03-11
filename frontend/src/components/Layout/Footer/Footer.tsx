import { getCopyrightYear } from '@/utils/date'

const Footer = () => {
  const copyrightYear = getCopyrightYear()

  return (
    <footer className="text-center p-4 text-xs">
      <p>Copyright © {copyrightYear} | Commentifier</p>
    </footer>
  )
}

export default Footer
