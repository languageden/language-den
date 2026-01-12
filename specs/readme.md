# Language Den - Project Overview for AI Contributors

## Project Purpose

Language Den is a cross-platform language learning application built with React Native (Expo). The current phase is establishing the **infrastructure scaffold** - a minimal, runnable, testable application that proves the technical foundation works before adding learning features.

**Current scope (v0):** Infrastructure only - no learning features, flashcards, or scheduling logic yet.

## Tech Stack

### Core Framework

- **Expo (React Native)** - Cross-platform mobile and web framework
- **TypeScript** - Strict typing everywhere
- **expo-router** - File-based routing (similar to Next.js)

### UI & Styling

- **Tamagui** - Cross-platform UI component library with token-based theming
- Token system for colors, spacing, and typography

### Backend & Services

- **Supabase** - Backend-as-a-service (no custom backend allowed)
  - Postgres database
  - Authentication
  - Edge Functions (serverless)
- Environment variables for Supabase URL and anon key

### Testing

- **Vitest** - Fast test runner (replaces Jest)
- **React Testing Library** - Component testing
- Tests must run in **seconds** without simulators/emulators/network

### Package Management

- **pnpm** - Fast, disk-efficient package manager

### Build & Deployment

- **EAS Build** - Cloud builds for iOS and Android
- **EAS Update** - Over-the-air updates (infrastructure ready, not yet used)
- Static web builds deployable to any hosting

## Project Structure

The codebase follows a **three-layer architecture** with clear separation of concerns:

```
language-den/
├── app/                    # expo-router screens and layouts (UI layer)
│   ├── _layout.tsx        # Root layout with providers
│   └── index.tsx          # Title screen (root route)
│
├── src/
│   ├── domain/            # Pure TypeScript business logic
│   │                      # - No React imports
│   │                      # - No external dependencies
│   │                      # - Highly testable with unit tests
│   │
│   ├── ui/                # Reusable Tamagui UI components
│   │                      # - Presentational components
│   │                      # - Uses Tamagui primitives
│   │
│   ├── services/          # External service integrations
│   │   └── supabase.ts   # Supabase client initialization
│   │
│   ├── lib/               # Utility functions and helpers
│   │
│   └── types/             # Shared TypeScript type definitions
│
├── test/                  # Test utilities and setup
│   └── setup.ts          # Vitest configuration and test environment
│
├── supabase/             # Supabase configuration
│   └── functions/        # Edge Functions (serverless)
│
├── docs/                 # Project documentation
│
├── .env.example          # Environment variable template
├── .env                  # Actual environment variables (gitignored)
├── eas.json              # EAS Build configuration
├── app.json              # Expo configuration
├── tamagui.config.ts     # Tamagui theme and tokens
├── tsconfig.json         # TypeScript configuration (strict mode)
└── vitest.config.ts      # Test runner configuration
```

## Architecture Principles

### Dependency Direction

```
UI Layer (app/, src/ui/)
    ↓ depends on
Domain Layer (src/domain/)
    ↑ depended on by
Services Layer (src/services/)
```

**Key Rules:**

1. **Domain layer** is pure TypeScript - no React, no external dependencies
2. **UI layer** can import from domain, but domain never imports from UI
3. **Services layer** handles external APIs (Supabase) and is mocked in tests
4. Clear boundaries enable fast testing and easy refactoring

### Why This Structure?

- **Fast tests**: Domain logic tests run in milliseconds (no React, no network)
- **Easy refactoring**: Clear boundaries make changes safer
- **Scalability**: Add features without restructuring the codebase
- **Testability**: Pure functions in domain layer are trivial to test

## Common Commands

```bash
# Development
pnpm install              # Install dependencies
pnpm dev                  # Start Expo dev server (then press i/a/w)
pnpm web                  # Start web-only dev server
pnpm ios                  # Start with iOS simulator
pnpm android              # Start with Android emulator

# Testing
pnpm test                 # Run all tests (completes in seconds)
pnpm test:watch           # Run tests in watch mode
pnpm type-check           # TypeScript compilation check

# Code Quality
pnpm lint                 # Run ESLint
pnpm format               # Format with Prettier

# Building
pnpm build:web            # Build static web app (dist/ folder)
pnpm build:ios            # Build iOS app with EAS
pnpm build:android        # Build Android app with EAS
```

## Environment Setup

### Required Environment Variables

Create a `.env` file from `.env.example`:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Note:** Variables prefixed with `EXPO_PUBLIC_` are accessible in client-side code.

### Getting Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com)
2. Navigate to: Project Settings → API
3. Copy **Project URL** and **anon/public key**
4. Add to `.env` file

## Testing Strategy

### Test Requirements

All tests must:

- Run in **seconds** (not minutes)
- Work without iOS simulator or Android emulator
- Work without network access
- Be deterministic and reliable

### Test Organization

```typescript
// Unit tests for pure domain logic
src / domain / example.test.ts;

// Component tests for UI
app / index.test.tsx;
src / ui / Button.test.tsx;
```

### Running Tests

```bash
pnpm test              # Run all tests once
pnpm test:watch        # Watch mode for development
```

### Test Environment

- **Vitest** for fast execution
- **jsdom** environment for React components
- **node** environment for pure TypeScript tests

## Key Conventions

### Import Paths

Use relative imports or configure path aliases in `tsconfig.json`:

```typescript
// Relative imports (current approach)
import { supabase } from '../../services/supabase';

// Path aliases (can be configured)
import { supabase } from '@/services/supabase';
```

### File Naming

- React components: `TitleScreen.tsx` (PascalCase)
- Utilities: `capitalize-words.ts` (kebab-case)
- Tests: `example.test.ts` or `TitleScreen.test.tsx`
- Types: `user-types.ts` or in `src/types/`

### TypeScript

- **Strict mode enabled** - no implicit `any`
- Prefer explicit return types for public functions
- Use interfaces for object shapes
- Use type for unions and primitives

### Code Style

- **ESLint** for linting rules
- **Prettier** for consistent formatting
- Run `pnpm format` before committing

## What to Expect in Tickets

Each Fizzy card/ticket includes:

1. **Purpose** - What the task accomplishes
2. **Files to modify** - Specific file paths
3. **Implementation details** - How to approach the work
4. **Code examples** - Reference implementations
5. **Test requirements** - How to verify completion

### Ticket Workflow

1. **Read the ticket** - Understand requirements fully
2. **Explore codebase** - Use Read/Grep/Glob to understand context
3. **Implement changes** - Make focused, minimal changes
4. **Write tests** - Ensure tests pass
5. **Verify** - Run `pnpm test` and `pnpm type-check`
6. **Complete** - All tests pass, no TypeScript errors

### Implementation Rules

- **Don't over-engineer** - Only implement what's requested
- **Don't add features** - Stick to the ticket scope
- **Don't break existing code** - Verify tests still pass
- **Don't skip tests** - Every ticket expects passing tests
- **Do follow patterns** - Match existing code style and architecture

## Platform Support

The app must work on:

- ✅ **Web** - SPA (Single Page Application), no server-side rendering
- ✅ **iOS** - iPhone and iPad
- ✅ **Android** - Phones and tablets

### Platform Testing

```bash
# Web browser
pnpm web
# Opens http://localhost:8081 in browser

# iOS Simulator (requires Xcode on macOS)
pnpm ios

# Android Emulator (requires Android Studio)
pnpm android

# Physical devices (using Expo Go app)
pnpm dev
# Scan QR code with Expo Go app
```

## Non-Goals (Don't Implement)

The scaffold explicitly **excludes**:

- ❌ Flashcard logic
- ❌ Scheduling algorithms (spaced repetition, etc.)
- ❌ AI features
- ❌ Analytics
- ❌ Push notifications
- ❌ Payment/billing
- ❌ Database schema design (beyond basic setup)
- ❌ Search Engine Optimization or marketing pages

**Why?** This version proves the infrastructure works. Features come later.

## Acceptance Criteria

The scaffold is successful when:

1. ✅ `pnpm install && pnpm dev` starts the app
2. ✅ App runs on Web, iOS simulator, and Android emulator
3. ✅ Title screen renders "Language Den" using Tamagui
4. ✅ `pnpm test` runs and passes in seconds
5. ✅ EAS Build configuration is valid
6. ✅ Supabase configuration exists (not coupled to UI yet)
7. ✅ Folder structure supports future growth without refactor

## Common Issues & Solutions

### "Module not found" errors

- Run `pnpm install` to ensure dependencies are installed
- Check import paths are correct (relative or aliased)
- Restart the dev server: `pnpm dev`

### Tests failing

- Run `pnpm type-check` first to catch TypeScript errors
- Check test setup in `test/setup.ts`
- Ensure tests don't require network or simulators

### Supabase connection issues

- Verify `.env` file exists with correct credentials
- Check environment variables are prefixed with `EXPO_PUBLIC_`
- Restart dev server after changing `.env`

### TypeScript errors

- Strict mode is enabled - all types must be explicit
- Use `unknown` instead of `any`
- Add return types to functions

### Platform-specific issues

- Use Tamagui components (not React Native primitives) for cross-platform compatibility
- Test on all three platforms (Web, iOS, Android) when possible
- Check Expo documentation for platform-specific APIs

## Getting Help

- **Expo Docs**: https://docs.expo.dev
- **Tamagui Docs**: https://tamagui.dev
- **Supabase Docs**: https://supabase.com/docs
- **Vitest Docs**: https://vitest.dev

## Guiding Principle

> **This version exists solely to prove the infrastructure.**
> Everything else will be layered on later.

Focus on:

- Making the foundation solid
- Keeping tests fast
- Following architectural boundaries
- Writing clean, maintainable code

Avoid:

- Premature optimization
- Over-engineering
- Adding features not in tickets
- Breaking existing tests
