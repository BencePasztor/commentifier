import { ComponentPropsWithoutRef, ElementType } from 'react'
import { twMerge } from 'tailwind-merge'

type CardProps<E extends ElementType> = {
  as?: E
} & Omit<ComponentPropsWithoutRef<E>, 'as'>

export const Card = <E extends ElementType>({
  as,
  className,
  children
}: CardProps<E>) => {
  const Element = as ?? 'div'

  return (
    <Element
      className={twMerge(
        'p-4 my-4 bg-white mx-auto shadow-md overflow-hidden',
        className
      )}
    >
      {children}
    </Element>
  )
}
