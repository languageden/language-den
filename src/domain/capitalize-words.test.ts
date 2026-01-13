import { describe, it, expect } from 'vitest';
import { capitalizeWords } from './capitalize-words';

describe('capitalizeWords', () => {
  it('should capitalize the first letter of each word', () => {
    expect(capitalizeWords('hello world')).toBe('Hello World');
  });

  it('should handle empty strings', () => {
    expect(capitalizeWords('')).toBe('');
  });

  it('should handle single character words', () => {
    expect(capitalizeWords('a b c')).toBe('A B C');
  });

  it('should handle single word strings', () => {
    expect(capitalizeWords('hello')).toBe('Hello');
  });

  it('should lowercase the rest of each word', () => {
    expect(capitalizeWords('hELLO wORLD')).toBe('Hello World');
  });

  it('should handle multiple spaces between words', () => {
    expect(capitalizeWords('hello  world')).toBe('Hello  World');
  });

  it('should handle leading and trailing spaces', () => {
    expect(capitalizeWords(' hello world ')).toBe(' Hello World ');
  });
});
