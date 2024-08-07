import { Navbar } from './Navbar'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'
import { HeaderState, useStickyHeader } from '@/hooks'

export const Header = () => {
  const headerState = useStickyHeader()

  const headerClasses = clsx({
    'drop-shadow-md': headerState === HeaderState.STICKY,
    '-translate-y-full': headerState === HeaderState.HIDDEN
  })

  return (
    <header
      className={twMerge(
        'sticky top-0 transition-all duration-200 z-10 bg-neutral-100',
        headerClasses
      )}
    >
      <Navbar />
    </header>
  )
}
