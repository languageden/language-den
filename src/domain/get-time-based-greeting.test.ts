/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest';
import { getTimeBasedGreeting } from './get-time-based-greeting';

describe('getTimeBasedGreeting', () => {
  describe('morning greeting (5:00 AM - 11:59 AM)', () => {
    it('returns morning greeting at 5:00 AM', () => {
      const date = new Date('2026-01-14T05:00:00');
      const result = getTimeBasedGreeting(date);

      expect(result).toEqual({
        greeting: 'Good morning',
        icon: '🌅',
      });
    });

    it('returns morning greeting at 8:00 AM', () => {
      const date = new Date('2026-01-14T08:00:00');
      const result = getTimeBasedGreeting(date);

      expect(result).toEqual({
        greeting: 'Good morning',
        icon: '🌅',
      });
    });

    it('returns morning greeting at 11:59 AM', () => {
      const date = new Date('2026-01-14T11:59:59');
      const result = getTimeBasedGreeting(date);

      expect(result).toEqual({
        greeting: 'Good morning',
        icon: '🌅',
      });
    });
  });

  describe('afternoon greeting (12:00 PM - 4:59 PM)', () => {
    it('returns afternoon greeting at 12:00 PM', () => {
      const date = new Date('2026-01-14T12:00:00');
      const result = getTimeBasedGreeting(date);

      expect(result).toEqual({
        greeting: 'Good afternoon',
        icon: '☀️',
      });
    });

    it('returns afternoon greeting at 2:00 PM', () => {
      const date = new Date('2026-01-14T14:00:00');
      const result = getTimeBasedGreeting(date);

      expect(result).toEqual({
        greeting: 'Good afternoon',
        icon: '☀️',
      });
    });

    it('returns afternoon greeting at 4:59 PM', () => {
      const date = new Date('2026-01-14T16:59:59');
      const result = getTimeBasedGreeting(date);

      expect(result).toEqual({
        greeting: 'Good afternoon',
        icon: '☀️',
      });
    });
  });

  describe('evening greeting (5:00 PM - 8:59 PM)', () => {
    it('returns evening greeting at 5:00 PM', () => {
      const date = new Date('2026-01-14T17:00:00');
      const result = getTimeBasedGreeting(date);

      expect(result).toEqual({
        greeting: 'Good evening',
        icon: '🌆',
      });
    });

    it('returns evening greeting at 7:00 PM', () => {
      const date = new Date('2026-01-14T19:00:00');
      const result = getTimeBasedGreeting(date);

      expect(result).toEqual({
        greeting: 'Good evening',
        icon: '🌆',
      });
    });

    it('returns evening greeting at 8:59 PM', () => {
      const date = new Date('2026-01-14T20:59:59');
      const result = getTimeBasedGreeting(date);

      expect(result).toEqual({
        greeting: 'Good evening',
        icon: '🌆',
      });
    });
  });

  describe('night greeting (9:00 PM - 4:59 AM)', () => {
    it('returns night greeting at 9:00 PM', () => {
      const date = new Date('2026-01-14T21:00:00');
      const result = getTimeBasedGreeting(date);

      expect(result).toEqual({
        greeting: 'Good night',
        icon: '🌙',
      });
    });

    it('returns night greeting at midnight', () => {
      const date = new Date('2026-01-14T00:00:00');
      const result = getTimeBasedGreeting(date);

      expect(result).toEqual({
        greeting: 'Good night',
        icon: '🌙',
      });
    });

    it('returns night greeting at 3:00 AM', () => {
      const date = new Date('2026-01-14T03:00:00');
      const result = getTimeBasedGreeting(date);

      expect(result).toEqual({
        greeting: 'Good night',
        icon: '🌙',
      });
    });

    it('returns night greeting at 4:59 AM', () => {
      const date = new Date('2026-01-14T04:59:59');
      const result = getTimeBasedGreeting(date);

      expect(result).toEqual({
        greeting: 'Good night',
        icon: '🌙',
      });
    });
  });

  describe('default behavior', () => {
    it('uses current time when no date is provided', () => {
      const result = getTimeBasedGreeting();

      // Should return one of the four greeting types
      const validGreetings = ['Good morning', 'Good afternoon', 'Good evening', 'Good night'];
      expect(validGreetings).toContain(result.greeting);

      // Should have an icon
      expect(result.icon).toBeTruthy();
      expect(typeof result.icon).toBe('string');
    });
  });

  describe('edge cases', () => {
    it('handles timezone-specific dates correctly', () => {
      // Test with ISO string (includes timezone)
      const date = new Date('2026-01-14T12:00:00Z');
      const result = getTimeBasedGreeting(date);

      // Result depends on local timezone, but should be valid
      const validGreetings = ['Good morning', 'Good afternoon', 'Good evening', 'Good night'];
      expect(validGreetings).toContain(result.greeting);
    });

    it('returns consistent results for same input', () => {
      const date = new Date('2026-01-14T14:30:00');
      const result1 = getTimeBasedGreeting(date);
      const result2 = getTimeBasedGreeting(date);

      expect(result1).toEqual(result2);
    });
  });
});
