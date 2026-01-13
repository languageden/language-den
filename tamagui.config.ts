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

// Define spacing scale for consistent layout rhythm
// Uses 4px base unit (1 = 4px) for precise control
const spacing = {
  0: 0,
  0.5: 2, // 2px
  1: 4, // 4px
  1.5: 6, // 6px
  2: 8, // 8px
  2.5: 10, // 10px
  3: 12, // 12px
  3.5: 14, // 14px
  4: 16, // 16px
  5: 20, // 20px
  6: 24, // 24px
  7: 28, // 28px
  8: 32, // 32px
  10: 40, // 40px
  12: 48, // 48px
  16: 64, // 64px
  20: 80, // 80px
  24: 96, // 96px
  32: 128, // 128px
};

// Define typography scale with base size of 16px
// Follows modular scale ratio of 1.25 (major third)
const fontSize = {
  1: 12, // xs - small labels, captions
  2: 14, // sm - secondary text, metadata
  3: 16, // base - body text (default)
  4: 18, // lg - emphasized text
  5: 20, // xl - small headings
  6: 24, // 2xl - section headings
  7: 30, // 3xl - page titles
  8: 36, // 4xl - hero text
  9: 48, // 5xl - large display text
  10: 64, // 6xl - extra large display
};

// Define line heights for optimal readability
const lineHeight = {
  1: 16, // tight - for headings
  2: 20, // snug - for emphasized text
  3: 24, // normal - for body text (1.5x base font size)
  4: 28, // relaxed - for larger text
  5: 32, // loose - for display text
};

// Create custom tokens including our brand colors, spacing, and typography
const tokens = createTokens({
  ...defaultConfig.tokens,
  color: customColors,
  space: spacing,
  size: spacing, // Use same values for sizes
  fontSize,
  lineHeight,
});

// Create animation timing definitions for consistent motion across the app
// Animations are kept fast and subtle (under 400ms) for responsive feel
// with special celebration animations for achievements
// Using CSS-based animations for web compatibility
const animations = {
  ...defaultConfig.animations,
  animations: {
    ...defaultConfig.animations.animations,
    // Quick (150ms): Micro-interactions like button hover states
    quick: 'cubic-bezier(0.4, 0.0, 0.2, 1) 150ms',
    // Normal (250ms): Standard transitions like card appearance
    normal: 'cubic-bezier(0.4, 0.0, 0.2, 1) 250ms',
    // Slow (400ms): Page transitions and significant state changes
    slow: 'cubic-bezier(0.4, 0.0, 0.2, 1) 400ms',
    // Celebration: Bouncy animation for streak achievements and completions
    celebration: 'cubic-bezier(0.68, -0.55, 0.265, 1.55) 500ms',
  },
};

// Create semantic color themes for light and dark modes
// These themes map semantic names (background, text, primary, etc.) to our custom color tokens
const themes = {
  light: {
    // Backgrounds
    background: tokens.color.neutral50,
    backgroundHover: tokens.color.neutral100,
    backgroundPress: tokens.color.neutral200,
    backgroundFocus: tokens.color.neutral100,
    backgroundStrong: tokens.color.neutral100,
    backgroundTransparent: 'rgba(255,255,255,0)',

    // Text colors
    color: tokens.color.neutral900,
    colorHover: tokens.color.neutral800,
    colorPress: tokens.color.neutral900,
    colorFocus: tokens.color.neutral900,
    colorTransparent: 'rgba(0,0,0,0)',

    // Borders
    borderColor: tokens.color.neutral300,
    borderColorHover: tokens.color.neutral400,
    borderColorPress: tokens.color.neutral400,
    borderColorFocus: tokens.color.primary500,

    // Shadows
    shadowColor: tokens.color.neutral900,
    shadowColorHover: tokens.color.neutral900,
    shadowColorPress: tokens.color.neutral900,
    shadowColorFocus: tokens.color.neutral900,

    // Primary (interactive elements)
    primary: tokens.color.primary500,
    primaryHover: tokens.color.primary600,
    primaryPress: tokens.color.primary700,
    primaryFocus: tokens.color.primary500,

    // Secondary (muted interactive elements)
    secondary: tokens.color.neutral600,
    secondaryHover: tokens.color.neutral700,
    secondaryPress: tokens.color.neutral800,
    secondaryFocus: tokens.color.neutral600,

    // Success (positive feedback)
    success: tokens.color.success500,
    successHover: tokens.color.success600,
    successPress: tokens.color.success700,
    successFocus: tokens.color.success500,

    // Warning (cautionary messages)
    warning: tokens.color.warning500,
    warningHover: tokens.color.warning600,
    warningPress: tokens.color.warning700,
    warningFocus: tokens.color.warning500,

    // Error (error states)
    error: tokens.color.error500,
    errorHover: tokens.color.error600,
    errorPress: tokens.color.error700,
    errorFocus: tokens.color.error500,
  },
  dark: {
    // Backgrounds
    background: tokens.color.neutral950,
    backgroundHover: tokens.color.neutral900,
    backgroundPress: tokens.color.neutral800,
    backgroundFocus: tokens.color.neutral900,
    backgroundStrong: tokens.color.neutral900,
    backgroundTransparent: 'rgba(0,0,0,0)',

    // Text colors
    color: tokens.color.neutral50,
    colorHover: tokens.color.neutral100,
    colorPress: tokens.color.neutral50,
    colorFocus: tokens.color.neutral50,
    colorTransparent: 'rgba(255,255,255,0)',

    // Borders
    borderColor: tokens.color.neutral700,
    borderColorHover: tokens.color.neutral600,
    borderColorPress: tokens.color.neutral600,
    borderColorFocus: tokens.color.primary500,

    // Shadows
    shadowColor: tokens.color.neutral950,
    shadowColorHover: tokens.color.neutral950,
    shadowColorPress: tokens.color.neutral950,
    shadowColorFocus: tokens.color.neutral950,

    // Primary (interactive elements)
    primary: tokens.color.primary500,
    primaryHover: tokens.color.primary400,
    primaryPress: tokens.color.primary300,
    primaryFocus: tokens.color.primary500,

    // Secondary (muted interactive elements)
    secondary: tokens.color.neutral400,
    secondaryHover: tokens.color.neutral300,
    secondaryPress: tokens.color.neutral200,
    secondaryFocus: tokens.color.neutral400,

    // Success (positive feedback)
    success: tokens.color.success500,
    successHover: tokens.color.success400,
    successPress: tokens.color.success300,
    successFocus: tokens.color.success500,

    // Warning (cautionary messages)
    warning: tokens.color.warning500,
    warningHover: tokens.color.warning400,
    warningPress: tokens.color.warning300,
    warningFocus: tokens.color.warning500,

    // Error (error states)
    error: tokens.color.error500,
    errorHover: tokens.color.error400,
    errorPress: tokens.color.error300,
    errorFocus: tokens.color.error500,
  },
};

// Create Tamagui configuration merging default config with custom color tokens and themes
// This provides a complete token system for colors, spacing, typography, animations, etc.
const tamaguiConfig = createTamagui({
  ...defaultConfig,
  tokens,
  themes,
  animations,
});

export type AppConfig = typeof tamaguiConfig;

declare module 'tamagui' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig;
