import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { Loader2 } from 'lucide-react'

type ButtonVariant = 'primary' | 'secondary' | 'outline'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant
  loading?: boolean
}

export const Button = ({
  variant = 'primary',
  children,
  className,
  type,
  disabled,
  loading,
  ...restProps
}: ButtonProps) => {
  let variantClasses

  switch (variant) {
    case 'primary':
      variantClasses = 'bg-primary hover:bg-primary/90 text-white'
      break
    case 'secondary':
      variantClasses = 'bg-secondary hover:bg-secondary/90 text-white'
      break
    case 'outline':
      variantClasses =
        'bg-transparent hover:bg-neutral-300/60 border-neutral-300 border'
      break
  }

  return (
    <button
      className={twMerge(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2',
        variantClasses,
        className
      )}
      type={type ?? 'button'}
      disabled={disabled || loading}
      {...restProps}
    >
      {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
      {children}
    </button>
  )
}
