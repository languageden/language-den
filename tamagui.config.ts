import { defaultConfig } from '@tamagui/config/v4';
import { createTamagui, createTokens } from 'tamagui';

// Define Language Den brand colors with semantic naming
// These colors are designed to work in both light and dark modes
const customColors = {
  // Primary brand color - used for main CTAs, links, and key interactive elements
  primary50: '#f0f9ff',
  primary100: '#e0f2fe',
  primary200: '#bae6fd',
  primary300: '#7dd3fc',
  primary400: '#38bdf8',
  primary500: '#0ea5e9', // Main primary color
  primary600: '#0284c7',
  primary700: '#0369a1',
  primary800: '#075985',
  primary900: '#0c4a6e',
  primary950: '#082f49',

  // Success color - used for positive feedback, achievements, and milestones
  success50: '#f0fdf4',
  success100: '#dcfce7',
  success200: '#bbf7d0',
  success300: '#86efac',
  success400: '#4ade80',
  success500: '#22c55e', // Main success color
  success600: '#16a34a',
  success700: '#15803d',
  success800: '#166534',
  success900: '#14532d',
  success950: '#052e16',

  // Warning color - used for cautionary messages and review reminders
  warning50: '#fffbeb',
  warning100: '#fef3c7',
  warning200: '#fde68a',
  warning300: '#fcd34d',
  warning400: '#fbbf24',
  warning500: '#f59e0b', // Main warning color
  warning600: '#d97706',
  warning700: '#b45309',
  warning800: '#92400e',
  warning900: '#78350f',
  warning950: '#451a03',

  // Error color - used for error states, destructive actions, and urgent warnings
  error50: '#fef2f2',
  error100: '#fee2e2',
  error200: '#fecaca',
  error300: '#fca5a5',
  error400: '#f87171',
  error500: '#ef4444', // Main error color
  error600: '#dc2626',
  error700: '#b91c1c',
  error800: '#991b1b',
  error900: '#7f1d1d',
  error950: '#450a0a',

  // Neutral colors - used for text, backgrounds, borders, and subtle UI elements
  neutral50: '#fafafa',
  neutral100: '#f5f5f5',
  neutral200: '#e5e5e5',
  neutral300: '#d4d4d4',
  neutral400: '#a3a3a3',
  neutral500: '#737373',
  neutral600: '#525252',
  neutral700: '#404040',
  neutral800: '#262626',
  neutral900: '#171717',
  neutral950: '#0a0a0a',
};

// Create custom tokens including our brand colors
const tokens = createTokens({
  ...defaultConfig.tokens,
  color: customColors,
});

// Create Tamagui configuration merging default config with custom color tokens
// This provides a complete token system for colors, spacing, typography, etc.
const tamaguiConfig = createTamagui({
  ...defaultConfig,
  tokens,
});

export type AppConfig = typeof tamaguiConfig;

declare module 'tamagui' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig;
