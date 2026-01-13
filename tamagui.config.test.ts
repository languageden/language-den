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

  describe('Spacing Tokens', () => {
    it('should have spacing tokens defined', () => {
      const tokens = config.tokens;

      expect(tokens.space).toBeDefined();
      expect(typeof tokens.space).toBe('object');
    });

    it('should have consistent spacing scale with 4px base unit', () => {
      const space = config.tokens.space;

      // Verify key spacing values (4px base unit)
      expect(space[0].val).toBe(0);
      expect(space[1].val).toBe(4);
      expect(space[2].val).toBe(8);
      expect(space[4].val).toBe(16);
      expect(space[6].val).toBe(24);
      expect(space[8].val).toBe(32);
    });

    it('should have fractional spacing values for fine control', () => {
      const space = config.tokens.space;

      // Verify fractional values
      expect(space[0.5].val).toBe(2);
      expect(space[1.5].val).toBe(6);
      expect(space[2.5].val).toBe(10);
    });

    it('should have large spacing values for major sections', () => {
      const space = config.tokens.space;

      // Verify large spacing values
      expect(space[12].val).toBe(48);
      expect(space[16].val).toBe(64);
      expect(space[24].val).toBe(96);
      expect(space[32].val).toBe(128);
    });
  });

  describe('Typography Tokens', () => {
    it('should have fontSize tokens defined', () => {
      const tokens = config.tokens;

      expect(tokens.fontSize).toBeDefined();
      expect(typeof tokens.fontSize).toBe('object');
    });

    it('should have typography scale following modular scale', () => {
      const fontSize = config.tokens.fontSize;

      // Verify font sizes
      expect(fontSize[1].val).toBe(12); // xs
      expect(fontSize[2].val).toBe(14); // sm
      expect(fontSize[3].val).toBe(16); // base
      expect(fontSize[4].val).toBe(18); // lg
      expect(fontSize[5].val).toBe(20); // xl
      expect(fontSize[6].val).toBe(24); // 2xl
      expect(fontSize[7].val).toBe(30); // 3xl
      expect(fontSize[8].val).toBe(36); // 4xl
      expect(fontSize[9].val).toBe(48); // 5xl
      expect(fontSize[10].val).toBe(64); // 6xl
    });

    it('should have lineHeight tokens defined', () => {
      const tokens = config.tokens;

      expect(tokens.lineHeight).toBeDefined();
      expect(typeof tokens.lineHeight).toBe('object');
    });

    it('should have line heights for optimal readability', () => {
      const lineHeight = config.tokens.lineHeight;

      // Verify line heights
      expect(lineHeight[1].val).toBe(16); // tight
      expect(lineHeight[2].val).toBe(20); // snug
      expect(lineHeight[3].val).toBe(24); // normal
      expect(lineHeight[4].val).toBe(28); // relaxed
      expect(lineHeight[5].val).toBe(32); // loose
    });
  });

  describe('Size Tokens', () => {
    it('should have size tokens matching spacing tokens', () => {
      const tokens = config.tokens;

      expect(tokens.size).toBeDefined();
      expect(typeof tokens.size).toBe('object');
    });

    it('should use same values as spacing for consistency', () => {
      const size = config.tokens.size;

      // Verify sizes match spacing
      expect(size[0].val).toBe(0);
      expect(size[1].val).toBe(4);
      expect(size[4].val).toBe(16);
      expect(size[8].val).toBe(32);
    });
  });
});
