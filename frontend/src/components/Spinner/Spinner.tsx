import { twMerge } from 'tailwind-merge'

interface SpinnerProps {
  className?: string
}

const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div
      role="status"
      className={twMerge(
        'w-20 h-20 border-4 inline-block rounded-full border-t-primary-500 border-x-neutral-200 border-b-neutral-200 animate-spin',
        className
      )}
    ></div>
  )
}

export default Spinner
