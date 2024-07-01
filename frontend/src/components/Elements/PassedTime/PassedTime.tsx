import { ComponentPropsWithoutRef } from 'react'
import { timeFrom } from '@/utils/date'
import { useState, useEffect } from 'react'

interface PassedTimeProps extends ComponentPropsWithoutRef<'time'> {
  dateTime: string
}

export const PassedTime = ({
  dateTime,
  children,
  ...restProps
}: PassedTimeProps) => {
  // State for storing how much time has passed since the given dateTime property
  const [timePassed, setTimePassed] = useState<string>(timeFrom(dateTime))

  // Update passed time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setTimePassed(timeFrom(dateTime))
    }, 60 * 1000)

    return () => {
      clearInterval(interval)
    }
  }, [dateTime])

  return (
    <time {...restProps}>
      {children}
      <span>{timePassed}</span>
    </time>
  )
}
