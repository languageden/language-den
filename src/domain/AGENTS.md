# AI Agent Learnings for src/domain/

This file documents patterns and conventions for domain layer code in the Language Den project.

## Domain Layer Principles

### Pure Functions

- Pattern: Domain layer functions must be pure TypeScript with no React imports
- Pattern: Functions should have no side effects and return consistent results for the same inputs
- Pattern: Use explicit input/output types for all function parameters and return values
- Pattern: Export interfaces for complex return types to enable type reuse
- Pattern: Use JSDoc comments with @example tags to document function usage

### Time-Based Logic

- Pattern: Functions that depend on time should accept optional Date parameter for testability
- Pattern: Default to `new Date()` when date parameter is not provided for production use
- Pattern: Use `Date.getHours()` to extract hour in local timezone for time-based logic
- Pattern: Document time ranges clearly in JSDoc comments with specific hours (e.g., "5:00 AM - 11:59 AM")
- Example: `getTimeBasedGreeting(now: Date = new Date()): TimeBasedGreeting`

### Testing Domain Functions

- Pattern: Use `@vitest-environment node` comment at top of test files for pure TypeScript tests
- Pattern: Test all time boundaries explicitly (start and end of each range)
- Pattern: Test edge cases like midnight, timezone-specific dates, and consistency
- Pattern: Test default behavior (when optional parameters are not provided)
- Pattern: Domain tests should complete in milliseconds (no async operations, no network)
- Pattern: Use descriptive test names that document the expected behavior
- Pattern: Group related tests with describe blocks by feature or time range

### Return Types

- Pattern: Export interfaces for complex return types that may be reused
- Pattern: Use descriptive property names in return type interfaces
- Pattern: Include both data and metadata in return types when appropriate
- Example: `TimeBasedGreeting` interface with `greeting: string` and `icon: string`
