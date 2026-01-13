// @vitest-environment node

/**
 * Tests for Tamagui configuration
 * These tests verify that themes and tokens are properly configured
 */

import { describe, it, expect } from 'vitest';
import config from './tamagui.config';

describe('Tamagui Configuration', () => {
  it('should have light and dark themes defined', () => {
    expect(config.themes).toBeDefined();
    expect(config.themes.light).toBeDefined();
    expect(config.themes.dark).toBeDefined();
  });

  it('should have semantic color mappings in light theme', () => {
    const lightTheme = config.themes.light;

    // Check background colors
    expect(lightTheme.background).toBeDefined();
    expect(lightTheme.backgroundHover).toBeDefined();
    expect(lightTheme.backgroundPress).toBeDefined();

    // Check text colors
    expect(lightTheme.color).toBeDefined();
    expect(lightTheme.colorHover).toBeDefined();

    // Check borders
    expect(lightTheme.borderColor).toBeDefined();
    expect(lightTheme.borderColorFocus).toBeDefined();

    // Check semantic colors
    expect(lightTheme.primary).toBeDefined();
    expect(lightTheme.success).toBeDefined();
    expect(lightTheme.warning).toBeDefined();
    expect(lightTheme.error).toBeDefined();
  });

  it('should have semantic color mappings in dark theme', () => {
    const darkTheme = config.themes.dark;

    // Check background colors
    expect(darkTheme.background).toBeDefined();
    expect(darkTheme.backgroundHover).toBeDefined();
    expect(darkTheme.backgroundPress).toBeDefined();

    // Check text colors
    expect(darkTheme.color).toBeDefined();
    expect(darkTheme.colorHover).toBeDefined();

    // Check borders
    expect(darkTheme.borderColor).toBeDefined();
    expect(darkTheme.borderColorFocus).toBeDefined();

    // Check semantic colors
    expect(darkTheme.primary).toBeDefined();
    expect(darkTheme.success).toBeDefined();
    expect(darkTheme.warning).toBeDefined();
    expect(darkTheme.error).toBeDefined();
  });

  it('should use custom color tokens in themes', () => {
    const tokens = config.tokens;

    // Verify custom color tokens exist
    expect(tokens.color.primary500).toBeDefined();
    expect(tokens.color.success500).toBeDefined();
    expect(tokens.color.warning500).toBeDefined();
    expect(tokens.color.error500).toBeDefined();
    expect(tokens.color.neutral50).toBeDefined();
    expect(tokens.color.neutral950).toBeDefined();
  });

  it('should have contrasting colors between light and dark themes', () => {
    const lightTheme = config.themes.light;
    const darkTheme = config.themes.dark;

    // Light theme should use light backgrounds and dark text (check actual color values)
    expect(lightTheme.background.val).toBe('#fafafa'); // neutral50
    expect(lightTheme.color.val).toBe('#171717'); // neutral900

    // Dark theme should use dark backgrounds and light text (check actual color values)
    expect(darkTheme.background.val).toBe('#0a0a0a'); // neutral950
    expect(darkTheme.color.val).toBe('#fafafa'); // neutral50
  });

  it('should have interactive state colors (hover, press, focus)', () => {
    const lightTheme = config.themes.light;

    // Primary colors
    expect(lightTheme.primary).toBeDefined();
    expect(lightTheme.primaryHover).toBeDefined();
    expect(lightTheme.primaryPress).toBeDefined();
    expect(lightTheme.primaryFocus).toBeDefined();

    // Success colors
    expect(lightTheme.success).toBeDefined();
    expect(lightTheme.successHover).toBeDefined();
    expect(lightTheme.successPress).toBeDefined();
    expect(lightTheme.successFocus).toBeDefined();
  });
});
