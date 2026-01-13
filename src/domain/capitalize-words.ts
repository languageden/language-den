/**
 * Capitalizes the first letter of each word in a string.
 *
 * This is a simple example of a pure domain function with no external dependencies.
 * It demonstrates the domain layer pattern: pure TypeScript, highly testable.
 *
 * @param input - The string to capitalize
 * @returns The string with each word capitalized
 *
 * @example
 * capitalizeWords('hello world') // Returns 'Hello World'
 * capitalizeWords('') // Returns ''
 * capitalizeWords('a b c') // Returns 'A B C'
 */
export function capitalizeWords(input: string): string {
  if (input.length === 0) {
    return input;
  }

  return input
    .split(' ')
    .map((word) => {
      if (word.length === 0) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}
