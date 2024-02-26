export const truncate = (text: string, maxLength: number = 150) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength - 3) + '...'
  }

  return text
}
