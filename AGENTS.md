# AI Agent Learnings for Language Den

This file documents patterns, conventions, and gotchas discovered during implementation for future AI agents.

## EAS Build Configuration

### app.json Structure

- Pattern: Use `com.languageden.app` as the bundle identifier for both iOS and Android
- Pattern: Include `expo-router` in the plugins array for file-based routing
- Pattern: Set `experiments.typedRoutes: true` for type-safe routing
- Pattern: Use `metro` bundler for web builds
- Pattern: Asset paths reference `./assets/` directory (icon.png, splash.png, etc.)

### eas.json Build Profiles

- Pattern: Three build profiles: `development`, `preview`, and `production`
- Pattern: Development builds use `developmentClient: true` and allow simulator builds
- Pattern: Android development/preview builds use APK format; production uses AAB (Android App Bundle)
- Pattern: iOS development builds can target simulator; preview/production cannot
- Pattern: EAS CLI version requirement: `>= 5.0.0`

### Dependencies

- Note: EAS CLI is available via `npx eas-cli` - no need to install as a project dependency
- Note: The `eas` commands in package.json use `eas build` not `npx eas build`

### Quality Gates

- Always run: `npm run type-check` and `npm run lint` before completion
- Tests may not be available early in project (handled by future cards)

## Package Manager Configuration

### pnpm Setup

- Pattern: Use `.npmrc` file with `engine-strict=true` to enforce pnpm usage
- Pattern: Set `node-linker=hoisted` in `.npmrc` for React Native Metro bundler compatibility
- Pattern: Define `packageManager` field in package.json (e.g., `pnpm@8.15.0`)
- Pattern: Set minimum versions in `engines` field (node >= 18.0.0, pnpm >= 8.0.0)
- Note: When running pnpm via npx, npm warnings about unknown pnpm configs are expected and can be ignored

### npm Scripts Organization

- Pattern: Group scripts logically: dev commands, testing, code quality, builds
- Pattern: Use `expo start` for dev server with platform-specific flags (--web, --ios, --android)
- Pattern: Include both `format` (write) and `format:check` (CI-friendly) scripts
- Pattern: EAS build commands reference `eas build --platform <platform>`

## expo-router Setup

### Dependencies

- Pattern: Install expo-router and required dependencies: `expo-router`, `react-native-safe-area-context`, `react-native-screens`, `expo-linking`, `expo-constants`, `expo-status-bar`
- Pattern: Use `npx pnpm add` to install dependencies (not `npx expo install` which fails when pnpm is configured)
- Pattern: Use version ranges that match Expo SDK version (e.g., `expo-router@~4.0.22` for Expo SDK 52)

### File Structure

- Pattern: Create `app/_layout.tsx` as the root layout component
- Pattern: Use `<Stack>` from expo-router for basic navigation layout
- Pattern: Set `screenOptions={{ headerShown: false }}` to hide headers by default
- Pattern: Create `app/index.tsx` as the root route

### TypeScript Return Types

- Pattern: Use `React.JSX.Element` instead of `JSX.Element` for component return types
- Note: ESLint will flag `JSX.Element` as deprecated in favor of `React.JSX.Element`

### app.json Configuration

- Pattern: Add `"plugins": ["expo-router"]` to enable expo-router
- Pattern: Set `"scheme": "language-den"` for deep linking
- Pattern: Enable typed routes with `"experiments": { "typedRoutes": true }`

## Tamagui Setup

### Dependencies

- Pattern: Install Tamagui with `tamagui` and `@tamagui/config` packages
- Pattern: Use `@tamagui/config/v4` for the default v4 configuration
- Pattern: Import `defaultConfig` from `@tamagui/config/v4` (not `config`)

### Configuration File

- Pattern: Create `tamagui.config.ts` at project root using `createTamagui(defaultConfig)`
- Pattern: Export AppConfig type for type safety: `export type AppConfig = typeof tamaguiConfig`
- Pattern: Extend TamaguiCustomConfig module to make types available globally
- Pattern: Add eslint-disable comment for no-empty-object-type rule on TamaguiCustomConfig interface

### Provider Setup

- Pattern: Wrap the root layout with `<TamaguiProvider config={config}>`
- Pattern: Import tamagui.config with relative path: `import config from '../tamagui.config'`
- Pattern: Place TamaguiProvider as the outermost provider in app/\_layout.tsx

### Token System

- Pattern: The v4 default config includes complete token system (colors, spacing, sizes, fonts, etc.)
- Pattern: Tokens are accessible in components via `$tokenName` syntax
- Pattern: Themes support light/dark mode out of the box with v4 config

### Shorthands and Component Props

- Pattern: v4 config has `onlyAllowShorthands: true` - must use shorthand props for styled components
- Pattern: Use `items` for `alignItems`, `justify` for `justifyContent`, `bg` for `backgroundColor`
- Pattern: `flex` prop works directly (not a shorthand in v4)
- Pattern: Import components like `YStack` and `H1` from `tamagui` package
- Pattern: Use `$tokenName` syntax for token-based values (e.g., `bg="$background"`)

## Expo Web Configuration

### app.json Web Settings

- Pattern: Add `"web"` section to expo config with `"bundler": "metro"` for consistent bundling across platforms
- Pattern: Include `"favicon"` path in web config (e.g., `"./assets/favicon.png"`)
- Pattern: Web builds are SPA (Single Page Application) - no server-side rendering

### metro.config.js

- Pattern: Create `metro.config.js` at project root using `getDefaultConfig` from `expo/metro-config`
- Pattern: The default config works out of the box for most Expo projects
- Pattern: Metro is used for web bundling when `"bundler": "metro"` is set in app.json

### Web Build Output

- Pattern: `expo export --platform web` creates a static site in `dist/` folder
- Pattern: Output includes `index.html`, bundled JavaScript in `_expo/static/js/web/`, and assets
- Pattern: The dist folder can be deployed to any static hosting (Vercel, Netlify, GitHub Pages, etc.)
- Pattern: Build produces a single JavaScript bundle with hash for cache busting
- Note: Missing favicon warning is expected if assets haven't been created yet

## Supabase Configuration

### Environment Variables

- Pattern: Use `.env.example` as a template file (committed to git) with placeholder values
- Pattern: Create `.env` file (gitignored) with actual credentials for local development
- Pattern: Prefix all environment variables with `EXPO_PUBLIC_` to make them accessible in client-side code
- Pattern: Required variables: `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- Pattern: Include comments in .env files explaining where to get credentials (Supabase Dashboard → Project Settings → API)
- Note: The anon/public key is safe to use in client-side code - it's designed for public access with Row Level Security

### .gitignore Configuration

- Pattern: `.env` and `.env.local` files must be in .gitignore to prevent credential leaks
- Pattern: `.env.example` is committed to git as a template for other developers
- Note: Ensure .env is gitignored before adding real credentials

### Supabase Client Initialization

- Pattern: Install `@supabase/supabase-js` package for Supabase client library
- Pattern: Create `src/services/supabase.ts` to initialize and export the Supabase client
- Pattern: Use bracket notation to access environment variables: `process.env['EXPO_PUBLIC_SUPABASE_URL']`
- Pattern: Validate environment variables exist before initializing client - throw descriptive errors if missing
- Pattern: Export a single `supabase` client instance created with `createClient(url, anonKey)`
- Pattern: Environment variable access must use bracket notation for TypeScript strict mode (avoids TS4111 error)
- Note: The client initialization happens at module load time, so missing env vars will cause immediate errors
- Note: Import the client in other files with: `import { supabase } from '../services/supabase'` or `import { supabase } from '../../services/supabase'` depending on location

## Vitest Configuration

### Dependencies

- Pattern: Vitest is installed as a dev dependency along with `@vitest/ui` for the UI test runner
- Pattern: No additional test libraries needed for pure TypeScript unit tests (domain layer)
- Pattern: Use `vite` as a peer dependency (required by Vitest)

### vitest.config.ts Setup

- Pattern: Create `vitest.config.ts` at project root using `defineConfig` from `vitest/config`
- Pattern: Set `test.environment: 'node'` for pure TypeScript tests (domain layer)
- Pattern: Configure `test.setupFiles: ['./test/setup.ts']` to run setup before each test file
- Pattern: Use `test.include: ['**/*.test.{ts,tsx}']` pattern to match test files
- Pattern: Exclude `node_modules`, `dist`, `.expo` from test discovery
- Pattern: Set `test.globals: false` to prefer explicit imports from vitest (better for TypeScript)
- Pattern: Configure path aliases in `resolve.alias` to match tsconfig.json paths (e.g., `@: '/src'`)

### test/setup.ts

- Pattern: Create `test/setup.ts` file for global test configuration
- Pattern: Pure TypeScript tests need minimal setup - file can be empty or contain only comments
- Pattern: React component tests will extend this setup with React Testing Library configuration (future card)

### Test File Patterns

- Pattern: Place test files next to the code they test (e.g., `capitalize-words.test.ts` next to `capitalize-words.ts`)
- Pattern: Use `.test.ts` extension for unit tests, `.test.tsx` for component tests
- Pattern: Import test utilities explicitly: `import { describe, it, expect } from 'vitest'`
- Pattern: Domain layer tests should be pure TypeScript with no React or external dependencies
- Pattern: Use descriptive test names that document expected behavior
- Pattern: Group related tests with `describe` blocks

### Running Tests

- Pattern: Use `pnpm test` (runs `vitest run`) for single-pass test execution (CI-friendly)
- Pattern: Use `pnpm test:watch` (runs `vitest`) for watch mode during development
- Pattern: Tests should complete in milliseconds for pure TypeScript functions
- Pattern: Tests run without needing simulators, emulators, or network access

### Domain Layer Testing

- Pattern: Create simple pure functions in `src/domain/` as examples (e.g., `capitalize-words.ts`)
- Pattern: Pure functions should have explicit input/output types and no side effects
- Pattern: Include JSDoc comments with @example tags to document usage
- Pattern: Test edge cases: empty strings, single characters, special characters, etc.
- Note: Domain tests run in Node environment and are extremely fast (< 5ms typical)

## React Component Testing

### Testing Library Dependencies

- Pattern: Install `@testing-library/react-native` for React Native component testing
- Pattern: Install `jsdom` as a dev dependency to provide DOM environment for tests
- Pattern: Install `react-test-renderer` matching your React version (e.g., 18.3.1 for React 18.3.1)
- Note: @testing-library/jest-native is deprecated - matchers are built into react-native-testing-library v12.4+
- Note: Peer dependency warnings about ESLint versions can be ignored

### Vitest Configuration for React Tests

- Pattern: Change `test.environment` from `'node'` to `'jsdom'` to support React component rendering
- Pattern: Pure TypeScript tests can opt-out with `@vitest-environment node` comment at top of file
- Pattern: Configure `server.deps.inline` with regex patterns for modules needing transformation
- Pattern: Add patterns like `/tamagui/`, `/@tamagui/`, `/react-native/`, `/expo-secure-store/` to inline array
- Note: Some complex UI libraries (Tamagui) may have transformation issues with Vitest

### Test File Structure

- Pattern: Use `@vitest-environment jsdom` comment at top of React component test files
- Pattern: Place component tests next to components (e.g., `Button.test.tsx` next to `Button.tsx`)
- Pattern: Import test utilities explicitly: `import { describe, it, expect } from 'vitest'`
- Pattern: Use React.createElement for simple component tests without JSX complexity
- Note: Full React Native Testing Library integration may require additional mocking for complex libraries

### Testing React Components

- Pattern: Simple React components can be tested with basic Vitest and jsdom environment
- Pattern: Use React.createElement() for creating test components programmatically
- Pattern: Test component props and basic rendering without needing full DOM rendering
- Pattern: For complex UI libraries, consider mocking with `vi.mock()` or testing at integration level
- Note: React Native Testing Library's `render()` and `screen` utilities may require extensive mocking setup

### Known Limitations

- Note: @testing-library/react-native may have compatibility issues with certain UI libraries in Vitest
- Note: Tamagui and other libraries using advanced TypeScript features may cause "Unexpected token 'typeof'" errors
- Note: React Native uses Flow type syntax (`import typeof`) which cannot be parsed by Vitest/Rollup
- Note: When hitting transformation issues, consider testing at a higher level or mocking the UI library
- Note: Basic React component testing works well; full React Native Testing Library integration is optional
- Note: Modules that depend heavily on React Native Platform API may not be unit-testable in Vitest

## Supabase Auth Configuration

### Dependencies

- Pattern: Install `expo-secure-store` for secure, encrypted token storage on native platforms
- Pattern: Use `@supabase/supabase-js` v2.x for Supabase client library
- Note: expo-secure-store provides encrypted storage on iOS/Android, falls back to localStorage on web

### Auth Storage Adapter

- Pattern: Create custom storage adapter in `src/services/auth-storage.ts` implementing getItem/setItem/removeItem
- Pattern: Use `expo-secure-store` for native platforms (iOS/Android) with SecureStore.getItemAsync/setItemAsync/deleteItemAsync
- Pattern: Fall back to localStorage for web platform using `Platform.OS === 'web'` check
- Pattern: Import Platform from `react-native` to detect the current platform
- Pattern: Wrap all storage operations in try-catch blocks and handle errors gracefully
- Pattern: Log errors to console.error for debugging but don't throw exceptions
- Note: Storage adapter should be async (return Promises) to match Supabase auth storage interface

### Supabase Client Auth Configuration

- Pattern: Configure Supabase client with auth options object as third parameter to createClient
- Pattern: Set `auth.storage` to custom authStorage adapter for secure token persistence
- Pattern: Enable `auth.autoRefreshToken: true` to automatically refresh expired sessions
- Pattern: Enable `auth.persistSession: true` to save session to storage for auto-login
- Pattern: Set `auth.detectSessionInUrl: false` for mobile apps (not needed without URL-based auth flows)
- Pattern: Import authStorage from relative path: `import { authStorage } from './auth-storage'`

### Auth Types

- Pattern: Create auth types in `src/services/auth-types.ts` with interfaces for credentials and state
- Pattern: Define SignUpCredentials with email, password, and optional metadata object
- Pattern: Define SignInCredentials with email and password
- Pattern: Define AuthState with user, session, and loading properties
- Pattern: Define AuthError with message and optional originalError for error handling
- Pattern: Use `import type` to import User and Session types from @supabase/supabase-js

### Auth Helper Functions

- Pattern: Create auth helpers in `src/services/auth-helpers.ts` with utility functions for common operations
- Pattern: Export async functions: signUp, signIn, signOut, getCurrentSession, getCurrentUser
- Pattern: All auth functions should return Promise with success/error status (not throw exceptions)
- Pattern: Use consistent return type: `Promise<{ success: boolean; error?: AuthError }>`
- Pattern: Wrap Supabase auth calls in try-catch and convert to error objects
- Pattern: Include JSDoc comments with @param, @returns, and @example tags
- Pattern: Use `import type` for Session and User types at the top of the file
- Pattern: Use explicit return types on all exported functions to satisfy ESLint rules

### Testing Auth Code

- Note: Auth storage adapter that uses React Native Platform API cannot be easily unit-tested in Vitest
- Note: React Native's Flow type syntax causes parse errors in Vitest/Rollup
- Note: Auth helper functions can be tested with mocked Supabase client at integration level
- Pattern: Skip unit tests for modules with heavy React Native dependencies that cause parsing errors
- Pattern: Test auth helpers indirectly through integration tests or E2E tests

## Supabase Edge Functions

### Directory Structure

- Pattern: Place Edge Functions in `supabase/functions/` directory
- Pattern: Each function gets its own subdirectory (e.g., `supabase/functions/hello/`)
- Pattern: Main function code goes in `index.ts` within the function directory
- Pattern: Keep the `supabase/functions/.gitkeep` file to ensure the directory is tracked in git

### Edge Function Code Structure

- Pattern: Import `serve` from Deno standard library: `import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'`
- Pattern: Edge Functions use Deno runtime, not Node.js - use Deno imports (https URLs)
- Pattern: Use `serve(async (req) => { ... })` to handle HTTP requests
- Pattern: Return `new Response()` with JSON.stringify for JSON responses
- Pattern: Set appropriate headers: `{ 'Content-Type': 'application/json' }`
- Pattern: Include status code in response options (200 for success)
- Pattern: Add JSDoc comments with deployment and invocation examples

### Local Development

- Pattern: Install Supabase CLI globally: `npm install -g supabase` or use `npx supabase`
- Pattern: Test functions locally with: `supabase functions serve <function-name>`
- Pattern: Functions run on `http://localhost:54321/functions/v1/<function-name>` when served locally
- Note: Local testing requires Supabase CLI to be installed, but is not required for the scaffold

### Deployment

- Pattern: Deploy with: `supabase functions deploy <function-name> --project-ref your-project-id`
- Pattern: Get project ref from Supabase Dashboard → Project Settings → General
- Pattern: Deployed functions are available at: `https://your-project-id.supabase.co/functions/v1/<function-name>`
- Pattern: Use `Authorization: Bearer YOUR_ANON_KEY` header when invoking Edge Functions
- Note: Actual deployment is not required for the infrastructure scaffold - only the code needs to exist

### Testing Edge Functions

- Note: Edge Functions use Deno and cannot be tested with Vitest (which uses Node.js)
- Pattern: Test Edge Functions by invoking them with HTTP requests (curl, fetch, etc.)
- Pattern: For the scaffold, ensure the code exists and has correct structure
- Pattern: Full testing happens at integration level after deployment

## Continuous Integration (GitHub Actions)

### CI Workflow Structure

- Pattern: Create CI workflow in `.github/workflows/test.yml` for automated quality checks
- Pattern: Workflow triggers on push to main/master branches and on all pull requests
- Pattern: Use matrix strategy to test against multiple Node.js versions (18.x, 20.x)
- Pattern: Name the job descriptively (e.g., "Run Tests and Quality Checks")
- Note: CI ensures code quality standards are met before merging changes

### Required CI Steps

- Pattern: Install pnpm using `pnpm/action-setup@v4` with exact version from package.json (8.15.0)
- Pattern: Setup Node.js with `actions/setup-node@v4` and enable pnpm cache
- Pattern: Install dependencies with `pnpm install --frozen-lockfile` to ensure reproducible builds
- Pattern: Run all quality gates in order: type-check, lint, format:check, test
- Pattern: Upload test artifacts (coverage) using `actions/upload-artifact@v4` if available
- Note: Each quality gate must pass for the workflow to succeed

### Quality Gates in CI

- Pattern: TypeScript type check with `pnpm type-check` catches compilation errors
- Pattern: ESLint with `pnpm lint` enforces code style and catches potential bugs
- Pattern: Prettier format check with `pnpm format:check` ensures consistent formatting
- Pattern: Vitest with `pnpm test` runs all unit and component tests
- Note: All four quality gates must pass for CI to pass - no exceptions

### CI Best Practices

- Pattern: Use `--frozen-lockfile` with pnpm to prevent dependency changes during CI
- Pattern: Enable caching for pnpm store to speed up dependency installation
- Pattern: Test against multiple Node.js versions to ensure compatibility
- Pattern: Use `if: always()` for artifact upload to capture results even if tests fail
- Pattern: Set `if-no-files-found: ignore` for coverage upload since coverage is optional
- Note: Fast CI feedback loop is critical - tests should complete in seconds, not minutes

## Documentation

### README.md Structure

- Pattern: Create comprehensive README.md with Table of Contents for easy navigation
- Pattern: Include Prerequisites section listing all required software with versions
- Pattern: Provide step-by-step Getting Started instructions that a new developer can follow
- Pattern: Document all available npm scripts grouped by category (development, testing, quality, building)
- Pattern: Include complete Project Structure with explanations of each directory's purpose
- Pattern: Document Technology Stack with brief descriptions of each technology
- Pattern: Include high-level Architecture overview with dependency direction diagram
- Pattern: Document all Environment Variables in a table with where to obtain them
- Pattern: Include Platform Support section with commands for testing on each platform
- Pattern: Provide Troubleshooting section with common issues and solutions
- Pattern: Document Acceptance Criteria to define when the project is successful
- Pattern: Reference additional documentation files in docs/ directory
- Note: README should enable a new developer to get the project running without any other documentation
- Note: Use Prettier to format README after creation - ensures consistent markdown formatting
