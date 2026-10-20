/**
 * Generates a random time string in HH:mm format.
 * @param {number} [minHour=8] - Minimum hour (0-23)
 * @param {number} [maxHour=20] - Maximum hour (0-23)
 * @returns {string} Time formatted as HH:mm
 */
export function getRandomTime(minHour = 8, maxHour = 20) {
    // Generate random hour within the range
    const hour = Math.floor(Math.random() * (maxHour - minHour + 1)) + minHour;

    // Generate random minute (0 to 59). 
    // Tip: You can also use [0, 15, 30, 45] if you prefer event times in quarter-hour blocks!
    const minute = Math.floor(Math.random() * 60);

    // Pad single digits with a leading zero (e.g., 9 becomes '09')
    const formattedHour = String(hour).padStart(2, '0');
    const formattedMinute = String(minute).padStart(2, '0');

    return `${formattedHour}:${formattedMinute}`;
}