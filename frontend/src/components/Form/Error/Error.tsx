import { twMerge } from 'tailwind-merge'

interface ErrorProps {
  className?: string
  children: React.ReactNode
}

export const Error = ({ className, children }: ErrorProps) => {
  return (
    <p role="alert" className={twMerge('my-2 text-sm text-red-500', className)}>
      {children}
    </p>
  )
}
