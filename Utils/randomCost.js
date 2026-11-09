/**
 * Generates a random monetary cost within a specified range.
 * @param {number} [min=10.00] - Minimum price
 * @param {number} [max=500.00] - Maximum price
 * @returns {number} Random price rounded to 2 decimal places
 */
export function getRandomCost(min = 10.00, max = 500.00) {
    const randomPrice = Math.random() * (max - min) + min;

    // Round to 2 decimal places and parse back to a float (number)
    return parseFloat(randomPrice.toFixed(2));
}