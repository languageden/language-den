# AI Agent Learnings for src/hooks/

This file documents patterns and conventions for React hooks in the Language Den project.

## Custom Hook Patterns

### Hook Structure

- Pattern: Custom hooks should start with `use` prefix following React conventions
- Pattern: Hooks should return an object with named properties for better clarity (not array)
- Pattern: Include loading, error, and data states for async operations
- Pattern: Use explicit return type annotations for hooks to ensure type safety
- Pattern: Place hook files in `src/hooks/` directory with camelCase naming

### State Management

- Pattern: Use `useState` for local state management (data, loading, error)
- Pattern: Initialize with appropriate default values (null for data, true for loading, null for error)
- Pattern: Set loading state to true before async operations and false in finally block
- Pattern: Clear error state on successful data fetch to prevent stale errors
- Pattern: Clear data state when errors occur for consistency

### useEffect for Data Fetching

- Pattern: Define async function inside useEffect, then call it with void operator
- Pattern: Use `void fetchData()` to satisfy ESLint `no-floating-promises` rule
- Pattern: Empty dependency array `[]` ensures effect runs only once on mount
- Pattern: Wrap async calls in try-catch-finally for robust error handling
- Pattern: Use finally block to ensure loading state is always set to false

### Type Safety

- Pattern: Import types with `import type` syntax for type-only imports
- Pattern: Use explicit return type annotations on hook functions
- Pattern: Cast errors as `Error` type when catching: `err as Error`
- Pattern: Use union types for state that can be null: `DashboardData | null`

### Testing Custom Hooks

- Pattern: React hooks cannot be called outside React component context in tests
- Pattern: Test hook definition exists and is a function using typeof check
- Pattern: Test the underlying service/data layer that the hook uses
- Pattern: Verify hook's return type structure using TypeScript type assertions
- Pattern: Use interface (not type) for expected return types to satisfy ESLint
- Pattern: Testing with renderHook from @testing-library/react-native may fail due to React Native Flow type syntax
- Pattern: Focus tests on service layer integration and type structure validation
- Pattern: Full hook lifecycle testing should be done at integration or E2E level

## JSDoc Documentation

- Pattern: Include JSDoc comments with hook description and usage examples
- Pattern: Document return type properties in JSDoc @returns tag
- Pattern: Provide @example tags showing typical usage in components
- Pattern: Show loading, error, and success state handling in examples
