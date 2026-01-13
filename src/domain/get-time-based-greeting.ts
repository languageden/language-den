/**
 * Pure function to generate appropriate greeting based on time of day.
 * Uses the user's local time to determine the greeting.
 *
 * @module domain/get-time-based-greeting
 * @example
 * const greeting = getTimeBasedGreeting();
 * console.log(greeting); // { greeting: "Good morning", icon: "🌅" }
 *
 * @example
 * const customGreeting = getTimeBasedGreeting(new Date('2026-01-14T14:30:00'));
 * console.log(customGreeting); // { greeting: "Good afternoon", icon: "☀️" }
 */

/**
 * Greeting object containing the text and an optional icon
 */
export interface TimeBasedGreeting {
  greeting: string;
  icon: string;
}

/**
 * Get time-based greeting based on hour of day.
 *
 * Time ranges:
 * - Morning: 5:00 AM - 11:59 AM
 * - Afternoon: 12:00 PM - 4:59 PM
 * - Evening: 5:00 PM - 8:59 PM
 * - Night: 9:00 PM - 4:59 AM
 *
 * @param now - Optional Date object for testing purposes. Defaults to current time.
 * @returns TimeBasedGreeting object with greeting text and icon
 *
 * @example
 * // Uses current time
 * const greeting = getTimeBasedGreeting();
 *
 * @example
 * // Uses specific time for testing
 * const greeting = getTimeBasedGreeting(new Date('2026-01-14T08:00:00'));
 * // Returns: { greeting: "Good morning", icon: "🌅" }
 */
export function getTimeBasedGreeting(now: Date = new Date()): TimeBasedGreeting {
  const hour = now.getHours();

  if (hour >= 5 && hour < 12) {
    return {
      greeting: 'Good morning',
      icon: '🌅',
    };
  } else if (hour >= 12 && hour < 17) {
    return {
      greeting: 'Good afternoon',
      icon: '☀️',
    };
  } else if (hour >= 17 && hour < 21) {
    return {
      greeting: 'Good evening',
      icon: '🌆',
    };
  } else {
    return {
      greeting: 'Good night',
      icon: '🌙',
    };
  }
}
