# AI Agent Learnings for app/

This file documents patterns and conventions for screen-level components and routing in the Language Den project.

## Screen Component Patterns

### Dashboard Screen (app/index.tsx)

- Pattern: Screen components integrate multiple dashboard sections into a cohesive scrollable view
- Pattern: Use `useSafeAreaInsets()` from react-native-safe-area-context to respect device safe areas (notches, home indicators)
- Pattern: Implement three key states: loading, error, and success (with null data guard)
- Pattern: Use ScrollView from Tamagui for scrollable content with proper padding for safe areas
- Pattern: Use shorthand padding props: `pt`, `pb`, `px` instead of full names like `paddingTop`
- Pattern: Apply safe area padding using `pt={insets.top}` and `pb={insets.bottom}` on YStack containers
- Pattern: Combine screen sections with consistent gap spacing: `<YStack gap="$4">...</YStack>`

### State Management

- Pattern: Custom hooks (like `useDashboardData`) handle data fetching and state management
- Pattern: Check loading state first, then error state, then null data, finally render success state
- Pattern: Loading and error states should use centered YStack with safe area insets applied
- Pattern: Error messages should be user-friendly and include the error message text

### Data Transformation

- Pattern: Screen components act as "adapters" between data layer types and UI component props
- Pattern: Convert decimal percentages to whole numbers: `Math.round(value * 100)` for display
- Pattern: Calculate derived values (like queue breakdowns) at screen level, not in child components
- Pattern: Map enum types to UI elements (e.g., ActivityType to icon components)
- Pattern: Format timestamps to relative time strings at screen level before passing to child components

### Time-Based Greeting

- Pattern: Call `getTimeBasedGreeting()` domain function to get current greeting based on time of day
- Pattern: Pass greeting text and icon separately to HeroSection component
- Pattern: Time-based logic lives in domain layer, screen just calls and passes the result

### Activity Feed Integration

- Pattern: Map dashboard Activity[] to ActivityFeedActivity[] format expected by ActivityFeedSection
- Pattern: Convert ActivityType enum to ReactNode icons using switch statement
- Pattern: Format Date timestamps to relative time strings (e.g., "5 minutes ago", "2 hours ago", "3 days ago")
- Pattern: Use singular vs plural logic: `${count} ${count === 1 ? 'minute' : 'minutes'} ago`
- Pattern: Time calculations: minutes < 60, hours < 24, then days for relative time display

### Navigation Handlers

- Pattern: Define placeholder navigation handlers at screen level (e.g., `handleStartReview`)
- Pattern: Pass same handler to multiple sections that trigger the same action (HeroSection and ReviewQueueSection)
- Pattern: Use `void` return type for event handlers: `const handleStartReview = (): void => {...}`
- Pattern: Add TODO comments for navigation logic to be implemented later

### ScrollView Configuration

- Pattern: Use Tamagui ScrollView component for cross-platform scrolling
- Pattern: Apply padding directly as props: `pt={value}`, `pb={value}`, `px={value}`
- Pattern: Calculate padding with safe area offsets: `pt={insets.top + 16}` for additional spacing
- Pattern: Wrap content in YStack with gap for consistent spacing between sections

## Cross-Platform Compatibility

- Pattern: Tamagui components work across iOS, Android, and Web without platform-specific code
- Pattern: useSafeAreaInsets() handles notches/home indicators automatically on iOS/Android, returns 0 on Web
- Pattern: ScrollView with safe area insets ensures content is visible on all device types
- Pattern: Avoid platform-specific imports or conditional rendering at screen level

## Testing Screen Components

- Pattern: Screen-level components that use React Native hooks (useSafeAreaInsets) cannot be tested with renderHook
- Pattern: Focus testing on underlying components (sections, hooks, services) rather than screen assembly
- Pattern: Screen components are integration points - test the pieces, not the whole screen
- Pattern: Manual testing on devices/simulators is more valuable than unit tests for screens
- Pattern: If screen tests are needed, they belong in E2E test suite, not unit tests

## File Organization

- Pattern: Screen components live in `app/` directory following expo-router conventions
- Pattern: Screen components import from `src/` directory for all UI components, hooks, services, domain logic
- Pattern: Use relative imports from app/ to src/: `../src/ui/dashboard/HeroSection`
- Pattern: Index routes (app/index.tsx) represent the root "/" path in expo-router
- Pattern: Screens should be default exports: `export default function ScreenName() { ... }`

## ESLint Rules for Screens

- Pattern: Avoid `console.log()` statements - ESLint only allows `console.warn()` and `console.error()`
- Pattern: Use TODO comments for placeholder navigation logic instead of console statements
- Pattern: Empty function bodies are acceptable for placeholder handlers: `const handleX = (): void => {};`
