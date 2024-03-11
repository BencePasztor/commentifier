/**
 * Returns the copyright year for the footer in the following format:
 * "starYear" or "startYear-currentYear" if the currentYear is greater then the startYear
 * @returns {string} The year or year range for the copyright
 */
export const getCopyrightYear = (): String => {
    const startYear = 2024
    const currentYear = new Date().getFullYear()
    return startYear < currentYear ? `${startYear}-${currentYear}` : `${startYear}`
}