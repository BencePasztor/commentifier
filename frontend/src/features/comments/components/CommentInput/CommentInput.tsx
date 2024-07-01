import { forwardRef, ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { Error } from '@/components/Form'

interface CommentInputProps extends ComponentPropsWithoutRef<'textarea'> {
  error?: string
}

export const CommentInput = forwardRef<HTMLTextAreaElement, CommentInputProps>(
  ({ className, error, ...restProps }, ref) => {
    return (
      <>
        <textarea
          className={twMerge(
            'size-full resize-none outline-none text-sm',
            className
          )}
          ref={ref}
          aria-invalid={error ? 'true' : undefined}
          {...restProps}
        />
        {error ? <Error>{error}</Error> : null}
      </>
    )
  }
)
