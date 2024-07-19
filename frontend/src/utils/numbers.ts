/**
 * Function to abbreviate big numbers up until trillion, E.g. 1000 => 1k
 * @param number The number you want to format
 * @returns {string} The formatted number as string
 */
export const formatNumber = (number: number): string => {
  // If the number is smaller than 1k no formatting is needed
  if (number < 1000) {
    return `${number}`
  }

  const letters = ['K', 'M', 'B', 'T']
  // The index of the necessary letter, [1 000, 999 999] => 0, [1 000 000, 999 999 999] => 2, ...etc
  const index = Math.floor(Math.log10(Math.abs(number)) / 3) - 1

  // In case the number is bigger than anticipated
  if (index > letters.length - 1) {
    return 'MAX'
  }

  // The scale we use to divide the given number
  const scale = Math.pow(10, (index + 1) * 3)
  const shortenedNumber = parseFloat((number / scale).toFixed(1))

  return `${shortenedNumber}${letters[index]}`
}
