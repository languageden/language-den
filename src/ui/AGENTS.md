# AI Agent Learnings for src/ui/

This file documents patterns and conventions for UI component development in the Language Den project.

## Component Architecture

### Styled Components Pattern

- Pattern: Use `styled(YStack)`, `styled(XStack)`, or `styled(Text)` to create reusable UI primitives
- Pattern: Define interactive states at the same level as base styles: `hoverStyle`, `pressStyle`, `focusStyle`
- Pattern: Use variants system for conditional styling with `variants` and `defaultVariants` properties
- Pattern: Some properties (like `borderRadius`) must be in variants, not base config due to TypeScript constraints
- Pattern: Include `name` property in styled components for better debugging and dev tools

### Functional Components Pattern

- Pattern: Use `React.FC<PropsInterface>` for functional components that wrap styled primitives
- Pattern: Export props interface for external type reuse
- Pattern: Document props with JSDoc comments including `@example` tags
- Pattern: Clamp or validate prop values when necessary (e.g., progress between 0-100)

### Theme-Aware Styling

- Pattern: Use semantic color tokens (`$primary`, `$secondary`, `$success`, `$error`, `$borderColor`) instead of hardcoded colors
- Pattern: Background colors should use `$background`, `$backgroundStrong`, or `$backgroundHover` for theme consistency
- Pattern: Text colors should use `$color` or `$secondary` for proper light/dark mode support

### Animation

- Pattern: Use `animation` property with token names like 'quick', 'normal', 'slow', 'celebration'
- Pattern: Apply animations to styled components for smooth transitions when props change
- Pattern: Keep animations subtle and performant (under 400ms for standard UI feedback)

## Component Testing

### Test Organization

- Pattern: Use `@vitest-environment jsdom` comment at top of component test files
- Pattern: Test component definition, prop acceptance, and element creation with `React.createElement`
- Pattern: Avoid rendering tests that require full DOM - focus on prop testing with `React.createElement`
- Pattern: Test all prop combinations and edge cases (0, 100, negative values, etc.)

### Test Structure

- Pattern: First test verifies component is defined and creates valid React elements
- Pattern: Test individual props separately, then test combined props
- Pattern: Test edge cases like boundary values, missing props, and invalid inputs
- Pattern: Use descriptive test names that document expected behavior

### ESLint Compliance

- Pattern: Use `.toString()` when interpolating numbers in template literals to satisfy `@typescript-eslint/restrict-template-expressions`
- Example: `const widthPercent = \`\${value.toString()}%\`` instead of `\`\${value}%\``

## Component-Specific Patterns

### Card Components

- Pattern: Use elevation with shadow properties for depth: `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius`, `elevation`
- Pattern: Include border with semantic color: `borderColor: '$borderColor'`, `borderWidth: 1`
- Pattern: Default padding should be comfortable: `p: '$4'` (16px)

### Progress Indicators

- Pattern: Use container + fill pattern with XStack (container) and YStack (fill)
- Pattern: Clamp values to valid range using `Math.max(0, Math.min(100, value))`
- Pattern: Use percentage width for fill: `width: \`\${value}%\``
- Pattern: Apply animation to fill element for smooth transitions

### Layout Components

- Pattern: Use `width` and `height` (not shorthands `w`/`h`) on YStack/XStack for Tamagui v4
- Pattern: Use `flex` property (not shorthand `f`) for flex layout
- Pattern: Use `gap` for spacing between children in flex containers
- Pattern: Properties like `borderRadius` cannot be used inline - must be in styled component variants

### Interactive Components (Buttons, Cards)

- Pattern: Include hover, press, and focus states for accessibility
- Pattern: Use `cursor: 'pointer'` on interactive elements (web compatibility)
- Pattern: Scale transform in pressStyle provides tactile feedback: `scale: 0.98`
- Pattern: Focus states should use primary color border for visibility

## TypeScript Type Safety

### Prop Types

- Pattern: Define explicit prop interfaces for all components
- Pattern: Use optional properties (`?`) for non-required props
- Pattern: Avoid `string | number` unions if TypeScript rejects them - choose one type
- Pattern: Number-only types are safer for layout props (width, height) than string unions

### Styled Component Types

- Pattern: Styled components are objects, not functions, but work with `React.createElement()`
- Pattern: Text-based components have more restrictions than YStack/XStack components
- Pattern: Properties that don't work on `styled(Text)`: `textAlign`, `lineHeight` (base), `userSelect`, `borderRadius` (base)

## Dashboard Section Components

### HeroSection Pattern

- Pattern: Dashboard sections are functional components (not styled components) that compose Card and other primitives
- Pattern: Export props interface for external type reuse and documentation
- Pattern: Use Card component as the outer container with custom padding (`p="$6"`) for dashboard sections
- Pattern: Use `gap` props on YStack/XStack for consistent spacing between elements within sections
- Pattern: For prominent headings, use H2 with explicit fontSize and fontWeight instead of relying on defaults
- Pattern: Convert numbers to strings in JSX with `.toString()` to satisfy `@typescript-eslint/restrict-template-expressions`
- Pattern: Use semantic color tokens for text: `$color` for primary text, `$secondary` for supporting text
- Pattern: Icons should use larger font sizes for visual hierarchy (e.g., `fontSize="$8"` for greeting, `fontSize="$6"` for streak)
- Pattern: Dashboard sections should accept callback props (e.g., `onStartReview: () => void`) for user interactions
- Pattern: Test dashboard sections with React.createElement pattern to verify prop acceptance without full DOM rendering
