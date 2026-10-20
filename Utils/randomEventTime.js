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

/**
 * Generates a random end time that is guaranteed to be after the given start time.
 * @param {string} startTime - Start time in 'HH:mm' format (e.g., '09:30')
 * @param {number} [minDurationMinutes=30] - Minimum event duration in minutes
 * @param {number} [maxDurationMinutes=240] - Maximum event duration in minutes (default 4 hours)
 * @returns {string} End time formatted as HH:mm
 */
export function getRandomEndTime(startTime, minDurationMinutes = 30, maxDurationMinutes = 240) {
    // 1. Convert start time (HH:mm) into total minutes from midnight
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const startTotalMinutes = startHour * 60 + startMinute;

    // 2. Generate a random duration within the given range
    const randomDuration = Math.floor(Math.random() * (maxDurationMinutes - minDurationMinutes + 1)) + minDurationMinutes;

    // 3. Calculate end total minutes
    let endTotalMinutes = startTotalMinutes + randomDuration;

    // 4. Safety check: Cap it at 23:59 so it never overflows past midnight
    const maxDayMinutes = 23 * 60 + 59;
    if (endTotalMinutes > maxDayMinutes) {
        endTotalMinutes = maxDayMinutes;
    }

    // 5. Convert back to hours and minutes
    const endHour = Math.floor(endTotalMinutes / 60);
    const endMinute = endTotalMinutes % 60;

    // 6. Format with leading zeros
    return `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`;
}