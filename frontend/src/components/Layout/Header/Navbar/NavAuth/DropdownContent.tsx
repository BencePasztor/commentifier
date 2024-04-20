import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const DropdownContent = forwardRef<
  React.ElementRef<typeof DropdownMenu.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenu.Content>
>(({ className, ...props }, ref) => {
  return (
    <DropdownMenu.Content
      ref={ref}
      className={twMerge(
        'min-w-60 bg-white p-1 rounded-md shadow-md z-20',
        className
      )}
      {...props}
    />
  )
})
