import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Avatar } from '@/components/Elements'
import { useLogout, useAuthState } from '@/features/auth'
import NavListElement from '../NavItem'
import { CircleUserRound, Power } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DropdownContent } from './DropdownContent'
import { DropdownItem } from './DropdownItem'

export const NavAuth = () => {
  const { isLoggedIn, user } = useAuthState()
  const { logout, isLoading } = useLogout()

  return (
    <>
      {isLoggedIn ? (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button aria-label="Profile">
              <Avatar
                src={user.avatarSource}
                alt={user.username}
                fallback={user.username[0]}
              />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownContent sideOffset={4}>
              <DropdownItem asChild>
                <Link to="/profile">
                  <CircleUserRound className="mr-1 transition-colors duration-200 size-5 group-hover:text-primary-500" />
                  <span>Profile</span>
                </Link>
              </DropdownItem>
              <DropdownItem asChild>
                <button onClick={logout} disabled={isLoading}>
                  <Power className="mr-1 transition-colors duration-200 size-5 group-hover:text-primary-500" />
                  <span>Logout</span>
                </button>
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      ) : (
        <NavListElement icon={CircleUserRound} as={Link} to="/login">
          Login
        </NavListElement>
      )}
    </>
  )
}
