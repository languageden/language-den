/**
 * Vitest setup file
 *
 * This file runs before each test file to configure the test environment.
 */

// Setup for React Native component testing
// The jsdom environment provides a basic DOM for testing React components

// Note: React Testing Library v13+ includes custom matchers (toBeOnTheScreen, toBeVisible, etc.)
// These can be added via expect.extend() if needed, but basic Vitest matchers
// (toBeTruthy, toBe, toEqual, etc.) work out of the box
