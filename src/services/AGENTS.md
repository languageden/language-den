# AI Agent Learnings for src/services/

This file documents patterns and conventions for service layer code in the Language Den project.

## Mock Data Services

### Dashboard Mock Data Service

- Pattern: Export both synchronous and asynchronous functions for flexibility
- Pattern: Define mock data as module-level constants for consistency across calls
- Pattern: Use JSDoc comments with `@example` tags to show usage patterns
- Pattern: Provide default parameter values (e.g., `greeting = 'Good morning'`)
- Pattern: Async functions should accept delay parameter for simulating network latency
- Pattern: Mock data should be realistic and representative of actual data structures
- Pattern: Include all enum variants in mock data for comprehensive testing

### TypeScript Import Best Practices

- Pattern: Use `import type` for type-only imports to improve build performance
- Pattern: Separate value imports (enums) from type imports
- Pattern: ESLint rule `@typescript-eslint/consistent-type-imports` enforces this pattern
- Example: `import type { DashboardData } from '../types/dashboard'` + `import { ActivityType } from '../types/dashboard'`

### Type Inference in Function Signatures

- Pattern: Remove explicit type annotations for trivially inferred types (e.g., string literals, number literals)
- Pattern: Let TypeScript infer parameter types from default values when possible
- Example: Use `greeting = 'Good morning'` instead of `greeting: string = 'Good morning'`
- Note: ESLint rule `@typescript-eslint/no-inferrable-types` enforces this

### Testing Mock Data Services

- Pattern: Test both synchronous and asynchronous versions of data functions
- Pattern: Use `@vitest-environment node` for pure service tests without DOM
- Pattern: Test structure, default values, custom values, and timing behavior
- Pattern: Verify data contains all expected variants (e.g., all ActivityType enum values)
- Pattern: Add type guards in tests when accessing array elements to satisfy strict TypeScript
- Example: `if (!activity) throw new Error('Expected at least one activity')`
- Pattern: For timing tests, allow margin for test execution variance (e.g., 450ms for 500ms delay)
