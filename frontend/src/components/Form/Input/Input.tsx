import { forwardRef, ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends ComponentPropsWithoutRef<'input'> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...restProps }, ref) => {
    return (
      <input
        className={twMerge(
          'flex h-10 w-full rounded-md border border-neutral-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 bg-white px-3 py-2 text-sm ring-offset-white disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        type={type ?? 'text'}
        {...restProps}
      />
    )
  }
)
