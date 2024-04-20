import { Logo } from '@/components/Elements'
import { Link } from 'react-router-dom'

const Brand = () => {
  return (
    <Link to="/">
      <Logo className="w-40 sm:w-auto" />
    </Link>
  )
}

export default Brand
