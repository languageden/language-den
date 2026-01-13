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

// Mock matchMedia for Tamagui components that use media queries
// This runs in jsdom environment tests, so window is available
// Using type assertion to work around TypeScript strict mode
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-empty-function */
const win = globalThis as any;

if (win.window && !win.window.matchMedia) {
  win.window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
  });
}
/* eslint-enable @typescript-eslint/no-empty-function */
/* eslint-enable @typescript-eslint/no-unsafe-member-access */
/* eslint-enable @typescript-eslint/no-unsafe-assignment */
/* eslint-enable @typescript-eslint/no-explicit-any */
