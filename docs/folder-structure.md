# Folder Structure

This document provides a detailed explanation of the Language Den project structure, what each folder contains, and where to put new code.

## Project Root

```
language-den/
├── app/                    # expo-router screens (file-based routing)
├── src/                    # Source code (domain, ui, services, lib, types)
├── test/                   # Test configuration and utilities
├── supabase/               # Supabase Edge Functions
├── docs/                   # Project documentation
├── .expo/                  # Expo build artifacts (gitignored)
├── dist/                   # Web build output (gitignored)
├── node_modules/           # Dependencies (gitignored)
├── .env                    # Environment variables (gitignored)
├── .env.example            # Environment variable template
├── .github/                # GitHub Actions CI/CD
├── app.json                # Expo configuration
├── eas.json                # EAS Build configuration
├── metro.config.js         # Metro bundler configuration
├── tamagui.config.ts       # Tamagui theme configuration
├── tsconfig.json           # TypeScript configuration
├── vitest.config.ts        # Test configuration
├── eslint.config.mjs       # ESLint configuration
├── package.json            # Dependencies and scripts
├── pnpm-lock.yaml          # Dependency lock file
├── .npmrc                  # pnpm configuration
└── README.md               # Project overview
```

## Core Directories

### `app/` - Screens and Layouts

The `app/` directory uses **expo-router** for file-based routing. Files in this directory automatically become routes in your application.

**Structure:**

```
app/
├── _layout.tsx             # Root layout (wraps all screens)
├── index.tsx               # Home screen (route: /)
├── about.tsx               # About screen (route: /about)
└── (tabs)/                 # Tab navigation group
    ├── _layout.tsx         # Tab layout
    ├── home.tsx            # Tab: Home
    └── profile.tsx         # Tab: Profile
```

**What belongs here:**

- Screen components (one file per route)
- Layout components (`_layout.tsx`)
- Navigation configuration
- Screen-specific state management

**What does NOT belong here:**

- Reusable UI components (use `src/ui/` instead)
- Business logic (use `src/domain/` instead)
- API calls (use `src/services/` instead)

**Example:**

```typescript
// app/index.tsx
import React from 'react';
import { YStack, H1, Button } from 'tamagui';
import { useRouter } from 'expo-router';

export default function HomeScreen(): React.JSX.Element {
  const router = useRouter();

  return (
    <YStack flex={1} items="center" justify="center" padding="$4">
      <H1>Language Den</H1>
      <Button onPress={() => router.push('/about')}>Learn More</Button>
    </YStack>
  );
}
```

**Routing patterns:**

- `app/index.tsx` → `/`
- `app/about.tsx` → `/about`
- `app/user/profile.tsx` → `/user/profile`
- `app/user/[id].tsx` → `/user/:id` (dynamic route)
- `app/(tabs)/_layout.tsx` → Tab navigation group

### `src/` - Source Code

The `src/` directory contains all application source code organized by architectural layer.

#### `src/domain/` - Business Logic (Pure TypeScript)

The **domain layer** contains pure TypeScript functions with no dependencies on React, UI libraries, or external services.

**Characteristics:**

- Pure functions (no side effects)
- Synchronous operations only
- No React imports
- No external dependencies (except TypeScript stdlib)
- Fast unit tests (milliseconds)

**What belongs here:**

- Text processing functions
- Validation logic
- Data transformations
- Business rules
- Calculation logic
- Domain type definitions

**What does NOT belong here:**

- React components
- API calls
- Database queries
- UI rendering
- Async operations

**Example structure:**

```
src/domain/
├── validation/
│   ├── email.ts            # Email validation
│   ├── email.test.ts       # Email validation tests
│   ├── password.ts         # Password validation
│   └── password.test.ts    # Password validation tests
├── scoring/
│   ├── calculate.ts        # Score calculation
│   └── calculate.test.ts   # Score calculation tests
├── text/
│   ├── capitalize-words.ts # Text capitalization
│   └── capitalize-words.test.ts
└── types/
    └── user.ts             # Domain type definitions
```

**Example:**

```typescript
// src/domain/validation/email.ts
/**
 * Validates if a string is a valid email address.
 * @param email - The email string to validate
 * @returns true if valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
```

```typescript
// src/domain/validation/email.test.ts
import { describe, it, expect } from 'vitest';
import { isValidEmail } from './email';

describe('isValidEmail', () => {
  it('accepts valid email addresses', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
  });

  it('rejects invalid email addresses', () => {
    expect(isValidEmail('not-an-email')).toBe(false);
  });
});
```

#### `src/ui/` - Reusable UI Components

The **ui directory** contains reusable React components built with Tamagui.

**Characteristics:**

- Uses React and Tamagui
- Presentational components
- Reusable across screens
- Minimal business logic
- Component tests

**What belongs here:**

- Button components
- Form inputs
- Cards
- Modals
- Lists
- Icons
- Layout components

**What does NOT belong here:**

- Screens (use `app/` instead)
- Business logic (use `src/domain/` instead)
- API calls (use `src/services/` instead)

**Example structure:**

```
src/ui/
├── Button.tsx              # Custom button component
├── Button.test.tsx         # Button tests
├── Card.tsx                # Card component
├── Card.test.tsx           # Card tests
├── Input.tsx               # Input component
└── forms/
    ├── EmailInput.tsx      # Email input with validation
    └── PasswordInput.tsx   # Password input
```

**Example:**

```typescript
// src/ui/Button.tsx
import React from 'react';
import { Button as TamaguiButton, ButtonProps } from 'tamagui';

interface CustomButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
}

export function Button({
  variant = 'primary',
  ...props
}: CustomButtonProps): React.JSX.Element {
  const bgColor =
    variant === 'primary'
      ? '$blue10'
      : variant === 'danger'
        ? '$red10'
        : '$gray10';

  return (
    <TamaguiButton
      bg={bgColor}
      color="$white"
      pressStyle={{ opacity: 0.8 }}
      {...props}
    />
  );
}
```

#### `src/services/` - External Integrations

The **services layer** handles communication with external services, APIs, and backend systems.

**Characteristics:**

- Async operations
- Network requests
- Database queries
- Authentication
- Third-party integrations
- Can be mocked in tests

**What belongs here:**

- Supabase client initialization
- Authentication helpers
- API client wrappers
- Data fetching functions
- Storage adapters

**What does NOT belong here:**

- Business logic (use `src/domain/` instead)
- UI components (use `src/ui/` or `app/` instead)

**Example structure:**

```
src/services/
├── supabase.ts             # Supabase client initialization
├── auth-storage.ts         # Auth storage adapter
├── auth-types.ts           # Auth type definitions
├── auth-helpers.ts         # Auth helper functions
└── api/
    ├── users.ts            # User API calls
    └── content.ts          # Content API calls
```

**Example:**

```typescript
// src/services/auth-helpers.ts
import type { Session } from '@supabase/supabase-js';
import { supabase } from './supabase';
import type { SignInCredentials, AuthError } from './auth-types';

/**
 * Signs in a user with email and password.
 */
export async function signIn(
  credentials: SignInCredentials
): Promise<{ success: boolean; error?: AuthError }> {
  try {
    const { error } = await supabase.auth.signInWithPassword(credentials);
    if (error) {
      return { success: false, error: { message: error.message } };
    }
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: { message: 'An unexpected error occurred' },
    };
  }
}
```

#### `src/lib/` - Utility Functions

The **lib directory** contains utility functions and helpers that don't fit into the domain layer.

**Difference from `src/domain/`:**

- `src/lib/` can have external dependencies
- `src/lib/` can have side effects
- `src/domain/` must be pure (no dependencies, no side effects)

**What belongs here:**

- Date/time utilities
- File system helpers
- Logging utilities
- Constants
- Generic helper functions

**Example structure:**

```
src/lib/
├── constants.ts            # App-wide constants
├── logger.ts               # Logging utility
└── date-utils.ts           # Date formatting helpers
```

#### `src/types/` - Shared Type Definitions

The **types directory** contains TypeScript type definitions used across multiple layers.

**What belongs here:**

- Shared interfaces
- Type aliases
- Enums
- Constants with types

**Example structure:**

```
src/types/
├── user.ts                 # User type definitions
├── content.ts              # Content type definitions
└── api.ts                  # API response types
```

**Example:**

```typescript
// src/types/user.ts
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export type UserRole = 'admin' | 'user' | 'guest';
```

### `test/` - Test Configuration

The `test/` directory contains test configuration, setup files, and shared test utilities.

**Structure:**

```
test/
├── setup.ts                # Global test setup (runs before each test)
├── helpers.ts              # Test helper functions
└── mocks/
    └── supabase.ts         # Mock Supabase client
```

**Example:**

```typescript
// test/setup.ts
import { beforeEach } from 'vitest';

// Global test setup runs before each test file
beforeEach(() => {
  // Reset mocks, clear cache, etc.
});
```

### `supabase/` - Supabase Configuration

The `supabase/` directory contains Supabase Edge Functions and configuration.

**Structure:**

```
supabase/
├── functions/
│   ├── hello/
│   │   └── index.ts        # Hello world Edge Function
│   └── process-data/
│       └── index.ts        # Data processing Edge Function
└── .gitkeep
```

**Important notes:**

- Edge Functions use **Deno runtime**, not Node.js
- Import from Deno standard library (https URLs)
- Cannot be tested with Vitest (use HTTP invocation)
- This directory is excluded from TypeScript compilation and ESLint

**Example:**

```typescript
// supabase/functions/hello/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

serve(async (req) => {
  return new Response(
    JSON.stringify({ message: 'Hello from Edge Function!' }),
    {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    }
  );
});
```

### `docs/` - Documentation

The `docs/` directory contains project documentation.

**Structure:**

```
docs/
├── architecture.md         # Architecture overview
├── folder-structure.md     # This file
├── deployment.md           # Deployment guides
└── environment-setup.md    # Environment setup instructions
```

### `.github/` - CI/CD Configuration

The `.github/` directory contains GitHub Actions workflows for continuous integration.

**Structure:**

```
.github/
└── workflows/
    └── test.yml            # CI workflow (type-check, lint, test)
```

## Configuration Files

### `app.json` - Expo Configuration

Configures Expo project settings, plugins, and platform-specific options.

```json
{
  "expo": {
    "name": "Language Den",
    "slug": "language-den",
    "version": "1.0.0",
    "plugins": ["expo-router"],
    "ios": {
      "bundleIdentifier": "com.languageden.app"
    },
    "android": {
      "package": "com.languageden.app"
    }
  }
}
```

### `eas.json` - EAS Build Configuration

Configures EAS Build profiles for different environments.

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  }
}
```

### `tamagui.config.ts` - UI Theme Configuration

Configures Tamagui tokens, themes, and design system.

```typescript
import { createTamagui, defaultConfig } from '@tamagui/config/v4';

export const tamaguiConfig = createTamagui(defaultConfig);
export type AppConfig = typeof tamaguiConfig;
```

### `tsconfig.json` - TypeScript Configuration

Configures TypeScript compiler options (strict mode enabled).

Key settings:

- `"strict": true` - Enable all strict type checking
- `"noImplicitAny": true` - No implicit any types
- `"esModuleInterop": true` - CommonJS/ES6 module interop

### `vitest.config.ts` - Test Configuration

Configures Vitest test runner.

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // Use jsdom for React component tests
    setupFiles: ['./test/setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
  },
});
```

### `.env` and `.env.example` - Environment Variables

- `.env.example` - Template file (committed to git)
- `.env` - Actual credentials (gitignored)

```bash
# .env.example
EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Where to Put New Code

### Decision Tree

**Is it a new screen or route?**

- → `app/` directory (expo-router)

**Is it a reusable UI component?**

- → `src/ui/` directory

**Is it business logic with no side effects?**

- → `src/domain/` directory

**Does it call an API or external service?**

- → `src/services/` directory

**Is it a utility function with side effects?**

- → `src/lib/` directory

**Is it a shared type definition?**

- → `src/types/` directory

**Is it a serverless function?**

- → `supabase/functions/` directory

**Is it documentation?**

- → `docs/` directory

### Examples

**Example 1: Adding email validation**

- **Type**: Pure function, no side effects
- **Location**: `src/domain/validation/email.ts`
- **Test**: `src/domain/validation/email.test.ts`

**Example 2: Adding a custom button**

- **Type**: Reusable UI component
- **Location**: `src/ui/Button.tsx`
- **Test**: `src/ui/Button.test.tsx`

**Example 3: Adding a login screen**

- **Type**: Screen/route
- **Location**: `app/login.tsx`
- **Route**: `/login`

**Example 4: Adding user profile API**

- **Type**: API integration
- **Location**: `src/services/api/user-profile.ts`
- **Uses**: `src/services/supabase.ts`

**Example 5: Adding a data processing function**

- **Type**: Serverless Edge Function
- **Location**: `supabase/functions/process-data/index.ts`
- **Runtime**: Deno

## File Naming Conventions

### React Components

- **PascalCase** for component files: `Button.tsx`, `UserProfile.tsx`
- **Test files**: `Button.test.tsx`, `UserProfile.test.tsx`

### Non-React Files

- **kebab-case** for utility files: `capitalize-words.ts`, `email-validation.ts`
- **Test files**: `capitalize-words.test.ts`, `email-validation.test.ts`

### Directories

- **kebab-case** for all directories: `src/domain/`, `src/ui/`, `user-profile/`

### Examples

```
✅ GOOD
src/domain/text/capitalize-words.ts
src/domain/text/capitalize-words.test.ts
src/ui/Button.tsx
src/ui/Button.test.tsx

❌ BAD
src/domain/text/CapitalizeWords.ts     (PascalCase for non-component)
src/domain/text/capitalize_words.ts    (snake_case)
src/ui/button.tsx                       (lowercase for component)
```

## Import Conventions

### Relative Imports

Use relative imports for now (path aliases can be configured later).

```typescript
// From app/index.tsx
import { Button } from '../src/ui/Button';
import { capitalizeWords } from '../src/domain/text/capitalize-words';

// From src/ui/Card.tsx
import { Button } from './Button';

// From src/services/auth-helpers.ts
import { supabase } from './supabase';
import { isValidEmail } from '../domain/validation/email';
```

### Path Aliases (Future Enhancement)

Configure in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@app/*": ["./app/*"]
    }
  }
}
```

Then import with aliases:

```typescript
import { Button } from '@/ui/Button';
import { capitalizeWords } from '@/domain/text/capitalize-words';
```

## Gitignored Directories

These directories should **never** be committed to git:

- `node_modules/` - Dependencies (installed via pnpm)
- `.expo/` - Expo build cache
- `dist/` - Web build output
- `.env` - Environment variables with secrets
- `*.log` - Log files

Always check `.gitignore` before committing.

---

**Next Steps:**

- Read [architecture.md](./architecture.md) for architectural principles
- Read [deployment.md](./deployment.md) for deployment guides
- Read [environment-setup.md](./environment-setup.md) for setup instructions
