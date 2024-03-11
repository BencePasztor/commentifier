import NavBar from "@/components/Layout/Header/Navbar/Navbar"
import { twMerge } from "tailwind-merge"
import clsx from "clsx"
import { HeaderState, useStickyHeader } from "@/hooks/useStickyHeader"

const Header = () => {
  const headerState = useStickyHeader()

  const headerClasses = clsx({
    "drop-shadow-md bg-neutral-100": headerState === HeaderState.STICKY,
    "-translate-y-full": headerState === HeaderState.HIDDEN,
  })

  return (
    <header className={twMerge("sticky top-0 transition-all duration-200 z-10", headerClasses)}>
      <NavBar />
    </header>
  )
}

export default Header