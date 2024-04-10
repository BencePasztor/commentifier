import { forwardRef, ComponentPropsWithoutRef } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Error } from '../Error/Error'

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...restProps }, ref) => {
    return (
      <>
        <input
          className={twMerge(
            'flex h-10 w-full rounded-md border border-neutral-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 bg-white px-3 py-2 text-sm ring-offset-white disabled:cursor-not-allowed disabled:opacity-50',
            clsx({
              'oultine-red-500 focus-visible:ring-red-500 border-red-500': error
            }),
            className
          )}
          ref={ref}
          type={type ?? 'text'}
          aria-invalid={error ? 'true' : undefined}
          {...restProps}
        />
        {error ? <Error>{error}</Error> : null}
      </>
    )
  }
)
