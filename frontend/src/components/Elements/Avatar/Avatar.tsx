import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface AvatarProps {
  className?: string
  src: string
  alt?: string
  fallback?: string
}

export const Avatar = ({
  className,
  src,
  alt,
  fallback = '?'
}: AvatarProps) => {
  const [loadFailed, setLoadFailed] = useState<boolean>(false)

  const handleError = () => {
    setLoadFailed(true)
  }

  return (
    <div
      className={twMerge(
        'size-11 rounded-full overflow-hidden flex items-center justify-center bg-white select-none',
        className
      )}
    >
      {loadFailed ? (
        <span className="font-medium uppercase text-primary-500">
          {fallback}
        </span>
      ) : (
        <img
          className="object-cover size-full"
          src={src}
          alt={alt}
          onError={handleError}
        />
      )}
    </div>
  )
}
