# AI Agent Learnings for src/types/

This file documents patterns and conventions for TypeScript type definitions in the Language Den project.

## Dashboard Types

### Type Organization

- Pattern: Group related interfaces together in a single file (e.g., `dashboard.ts` for all dashboard-related types)
- Pattern: Export all interfaces for use across the application
- Pattern: Use JSDoc comments to document the purpose of each interface
- Pattern: Place enum definitions before interfaces that use them

### Naming Conventions

- Pattern: Use PascalCase for interface names (e.g., `UserInfo`, `DashboardData`)
- Pattern: Use singular names for single entities (e.g., `Activity`, not `Activities`)
- Pattern: Use descriptive names that indicate purpose (e.g., `LearningStats`, not just `Stats`)
- Pattern: Use enum for discriminated union types (e.g., `ActivityType` enum)

### Interface Design

- Pattern: Use `?` for optional properties (e.g., `avatarUrl?: string`)
- Pattern: Use `Record<string, unknown>` for flexible metadata objects
- Pattern: Use `Date` type for timestamps (will be serialized to/from ISO strings in API calls)
- Pattern: Keep interfaces focused - one interface per logical data structure
- Pattern: Nest related data (e.g., `stats: LearningStats` instead of flat properties)

### Enum vs Union Types

- Pattern: Use enum when you need a closed set of named constants (e.g., `ActivityType`)
- Pattern: Enum values should be lowercase snake_case strings for API compatibility
- Pattern: Export enums alongside interfaces for use in components and services
