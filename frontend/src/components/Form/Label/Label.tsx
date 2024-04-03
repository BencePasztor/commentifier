import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface LabelProps extends ComponentPropsWithoutRef<'label'> {}

export const Label = ({ children, className, ...restProps }: LabelProps) => {
  return (
    <label
      className={twMerge(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...restProps}
    >
      {children}
    </label>
  )
}
