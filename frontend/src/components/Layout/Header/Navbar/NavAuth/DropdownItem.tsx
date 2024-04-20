import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const DropdownItem = forwardRef<
  React.ElementRef<typeof DropdownMenu.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenu.Item>
>(({ className, ...props }, ref) => {
  return (
    <DropdownMenu.Item
      ref={ref}
      className={twMerge(
        'flex items-center w-full p-1 font-medium hover:outline-none transition-colors duration-200 hover:bg-neutral-50 group',
        className
      )}
      {...props}
    />
  )
})
