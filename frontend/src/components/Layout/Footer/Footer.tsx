import { getCopyrightYear } from '@/utils/date'

export const Footer = () => {
  const copyrightYear = getCopyrightYear()

  return (
    <footer className="p-4 text-xs text-center">
      <p>Copyright © {copyrightYear} | Commentifier</p>
    </footer>
  )
}
