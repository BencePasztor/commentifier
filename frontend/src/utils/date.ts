/**
 * Returns the copyright year for the footer in the following format:
 * "starYear" or "startYear-currentYear" if the currentYear is greater then the startYear
 * @returns {string} The year or year range for the copyright
 */
export const getCopyrightYear = (): string => {
  const startYear = 2024
  const currentYear = new Date().getFullYear()
  return startYear < currentYear
    ? `${startYear}-${currentYear}`
    : `${startYear}`
}

/**
 * Returns the elapsed time in text
 * @param date A string representation of a date or a Date object that represents the starting point
 * @returns {string} A string representing the elapsed time
 */
export const timeFrom = (date: Date | string): string => {
  let from: Date

  if (date instanceof Date) {
    from = date
  } else {
    from = new Date(date)
  }

  if (isNaN(from.getTime())) {
    return '???'
  }

  const milliseconds = new Date().getTime() - from.getTime()
  if (milliseconds < 0) {
    return '(⚆ᗝ⚆)'
  }

  const seconds = Math.floor(milliseconds / 1000)
  if (seconds < 60) {
    return 'a few seconds ago'
  }

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
  }

  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`
  }

  const days = Math.floor(hours / 24)
  if (days < 30) {
    return `${days} day${days === 1 ? '' : 's'} ago`
  }

  const months = Math.floor(days / 30)
  if (months < 12) {
    return `${months} month${months === 1 ? '' : 's'} ago`
  }

  const years = Math.floor(days / 365)
  return `${years} year${years === 1 ? '' : 's'} ago`
}
