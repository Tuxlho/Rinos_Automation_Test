/**
 * Generates a random birthdate within a specified age range.
 * @param {number} [minAge=18] - Minimum age of the person
 * @param {number} [maxAge=65] - Maximum age of the person
 * @returns {string} Birthdate formatted as YYYY-MM-DD
 */
export function getRandomBirthdate(minAge = 18, maxAge = 65) {
  const currentYear = new Date().getFullYear();
  
  // Calculate valid birth year boundaries
  const maxBirthYear = currentYear - minAge; // e.g., 2026 - 18 = 2008
  const minBirthYear = currentYear - maxAge; // e.g., 2026 - 65 = 1961

  // Get timestamps for Jan 1 of min year and Dec 31 of max year
  const minTimestamp = new Date(minBirthYear, 0, 1).getTime();
  const maxTimestamp = new Date(maxBirthYear, 11, 31).getTime();

  // Generate a random timestamp between the boundaries
  const randomTimestamp = Math.floor(Math.random() * (maxTimestamp - minTimestamp + 1)) + minTimestamp;
  const randomDate = new Date(randomTimestamp);

  // Return formatted as YYYY-MM-DD
  return randomDate.toISOString().split('T')[0];
}