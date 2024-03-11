import { ComponentPropsWithoutRef, ElementType } from 'react'
import { LucideIcon } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'

type NavListElementProps<E extends ElementType> = {
  as?: E
  highlighted?: boolean
  icon?: LucideIcon
} & Omit<ComponentPropsWithoutRef<E>, 'as'>

const NavListElement = <E extends ElementType>({
  as,
  icon,
  highlighted,
  className,
  children,
  ...restProps
}: NavListElementProps<E>) => {
  const Element = as ?? 'a'
  const Icon = icon

  const elementClasses = twMerge(
    clsx({
      'bg-primary-500 hover:bg-primary-600 text-white': highlighted,
      'text-secondary-500 hover:bg-white': !highlighted
    }),
    'text-base font-medium p-2 rounded-md inline-flex gap-1 items-center group transition-colors duration-200',
    className
  )
  const iconClasses = twMerge(
    clsx({
      'group-hover:text-primary-500': !highlighted
    }),
    'transition-colors duration-200'
  )

  return (
    <li>
      <Element className={elementClasses} {...restProps}>
        {Icon && <Icon className={iconClasses} />}
        <span className={clsx({ 'hidden md:inline': icon })}>{children}</span>
      </Element>
    </li>
  )
}

export default NavListElement
