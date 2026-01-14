# AI Agent Learnings for docs/

This file documents patterns and conventions for documentation in the Language Den project.

## Accessibility Documentation

### Audit Document Pattern

- Pattern: Create comprehensive accessibility audit documents for major features/screens
- Pattern: Include WCAG 2.1 compliance level (A, AA, AAA) for each criterion tested
- Pattern: Document color contrast ratios with specific hex values and calculated ratios
- Pattern: Test across all supported platforms (iOS, Android, Web) and document results
- Pattern: Include both light and dark theme testing results
- Pattern: Provide specific code examples and file references for issues found
- Pattern: Include recommendations prioritized by importance (High/Medium/Low)
- Pattern: Document testing procedures for future developers to follow
- Pattern: Use tables for structured data (contrast ratios, compliance status, test results)
- Pattern: Include executive summary at the top with overall compliance status

### Accessibility Testing Checklist

- Pattern: Test color contrast ratios in both light and dark themes using browser dev tools
- Pattern: Test screen reader navigation on iOS (VoiceOver), Android (TalkBack), and Web (NVDA/VoiceOver)
- Pattern: Verify keyboard navigation works on web (Tab, Enter, Space keys)
- Pattern: Measure touch target sizes (minimum 44x44 points for WCAG AA compliance)
- Pattern: Test reduced motion preferences on all platforms
- Pattern: Use automated tools: axe DevTools, Chrome Lighthouse, React Native Accessibility Inspector
- Pattern: Document all findings with specific file paths and line numbers

### Color Contrast Requirements

- Pattern: Normal text (< 18pt): minimum 4.5:1 contrast ratio for WCAG AA
- Pattern: Large text (≥ 18pt or 14pt bold): minimum 3:1 contrast ratio for WCAG AA
- Pattern: UI components and graphical objects: minimum 3:1 contrast ratio
- Pattern: AAA level (enhanced): 7:1 for normal text, 4.5:1 for large text
- Pattern: Test both foreground/background and focus indicator contrast

### Touch Target Requirements

- Pattern: Minimum size: 44x44 points (WCAG AA Level 2.5.5)
- Pattern: Spacing between targets: minimum 8px
- Pattern: Calculate total touch area including padding: content height + (vertical padding × 2)
- Example: Button with fontSize $4 (18px) + py $3 (12px) = 18 + 24 = 42px + line-height ≈ 48px ✅

### Screen Reader Semantics

- Pattern: Use semantic HTML/components (H1, H2, H3, etc.) for proper heading hierarchy
- Pattern: Interactive elements should have clear, descriptive labels
- Pattern: Decorative icons/images should be ignored by screen readers (no alt text needed if text present)
- Pattern: All critical information should be conveyed through text, not icons alone
- Pattern: Test that focus order is logical and matches visual layout

### Reduced Motion Support

- Pattern: Implement `useReducedMotion` hook from React Native in animated components
- Pattern: Conditionally disable/reduce animations when user prefers reduced motion
- Pattern: Ensure animations are subtle (under 400ms) and non-essential to functionality
- Pattern: Test on all platforms: iOS Settings > Accessibility > Motion, Android Settings > Accessibility > Remove animations

### Documentation Maintenance

- Pattern: Update accessibility audit after major UI changes or new screen implementations
- Pattern: Include "Next Review" date in audit document footer
- Pattern: Document automated testing integration for CI/CD pipelines
- Pattern: Keep testing procedures up-to-date as tools and standards evolve
- Pattern: Reference specific WCAG 2.1 criteria numbers (e.g., 1.4.3, 2.1.1) for traceability
