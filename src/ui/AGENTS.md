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

### StatsOverviewSection Pattern

- Pattern: Section-level components can omit Card wrapper when they don't need unified container styling
- Pattern: Use YStack as root container with gap for section header and content separation
- Pattern: Use section headers (Text with `fontSize="$5"` and `fontWeight="600"`) to label major content areas
- Pattern: Grid layouts use nested XStack (rows) within YStack with equal `flex={1}` on cells for equal widths
- Pattern: Use `gap="$3"` for consistent spacing between grid cells
- Pattern: Wrap MetricCard in YStack with `flex={1}` to ensure proper flex layout in grids
- Pattern: Emoji icons passed as ReactNode children of Text component work well in MetricCard icons
- Pattern: Dashboard sections that primarily compose other components don't need their own Card wrapper

### ReviewQueueSection Pattern

- Pattern: Conditional rendering based on data state (empty vs. populated queue) within the same component
- Pattern: Text components do NOT support `textAlign` prop - wrap Text in YStack with `items="center"` for centered text
- Pattern: Text components do NOT support `minWidth` prop - wrap Text in YStack with fixed `width` for minimum width
- Pattern: Dynamic `color` prop (string type) not allowed on Text - use semantic tokens only (`$color`, `$secondary`, etc.)
- Pattern: Helper components (like QueueItem) should be internal to file when only used in one section component
- Pattern: Empty states should use Card wrapper with centered content, celebration emoji, and reassuring message
- Pattern: For fixed-width labels in lists, wrap Text in YStack with explicit `width` prop instead of using minWidth
- Pattern: Use consistent padding (`p="$6"`) for dashboard sections wrapped in Card for visual consistency
- Pattern: Queue breakdown lists should use YStack with `gap="$2"` for tight vertical spacing between related items

### ActivityFeedSection Pattern

- Pattern: Use `Array.slice()` to limit visible items while preserving full data array in props
- Pattern: Conditional rendering for empty state vs. content list based on array length check
- Pattern: Map over activities array with unique `key` prop for React list rendering
- Pattern: Empty states use centered YStack with emoji, heading, and descriptive message pattern
- Pattern: "See all" link uses centered YStack wrapper with primary color text for consistency
- Pattern: Activity items render in parent YStack without explicit gaps (ActivityItem has built-in vertical padding)
- Pattern: Export both data interfaces (Activity) and component props interfaces for type reuse
- Pattern: maxVisible prop provides flexible control over list length without UI changes
- Pattern: When activity list exceeds maxVisible, show "See all" link with arrow indicator (→)
- Pattern: Activity icon passed as ReactNode allows flexible emoji, SVG, or component icons
