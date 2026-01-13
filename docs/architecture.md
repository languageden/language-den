# Architecture Overview

This document explains the architectural decisions, folder structure, and design patterns used in Language Den.

## Three-Layer Architecture

Language Den follows a **three-layer architecture** that separates concerns into distinct layers with clear boundaries and dependencies.

```
┌─────────────────────────────────────┐
│     User Interface Layer            │
│   (app/, src/ui/)                   │
│                                     │
│   - React Native components         │
│   - Tamagui styling                 │
│   - expo-router screens             │
│   - User interactions               │
└──────────────┬──────────────────────┘
               │ depends on
               ▼
┌─────────────────────────────────────┐
│        Domain Layer                 │
│      (src/domain/)                  │
│                                     │
│   - Pure TypeScript                 │
│   - Business logic                  │
│   - No React, no external deps      │
│   - Highly testable                 │
└──────────────▲──────────────────────┘
               │ used by
               │
┌──────────────┴──────────────────────┐
│      Services Layer                 │
│     (src/services/)                 │
│                                     │
│   - Supabase client                 │
│   - API integrations                │
│   - External services               │
└─────────────────────────────────────┘
```

### Key Principle: Dependency Direction

**The domain layer depends on nothing.** All other layers may depend on the domain layer, but the domain layer is pure and self-contained.

- ✅ UI layer can import from domain layer
- ✅ Services layer can import from domain layer
- ❌ Domain layer NEVER imports from UI or services
- ❌ Domain layer NEVER imports React or external libraries

## Layer Details

### Domain Layer (`src/domain/`)

The domain layer contains the **core business logic** of the application. This is where you put pure functions, data transformations, validation rules, and business rules.

**Characteristics:**

- Pure TypeScript functions with no side effects
- No React imports or JSX
- No external dependencies (except TypeScript standard library)
- Fully synchronous (no async operations, no network calls)
- Highly testable with unit tests (tests run in milliseconds)

**What belongs here:**

- Text processing functions (capitalize, normalize, etc.)
- Validation logic (email validation, password strength, etc.)
- Data transformations (format dates, convert units, etc.)
- Business rules (scoring algorithms, calculation logic, etc.)
- Type definitions for domain concepts

**Example:**

```typescript
// src/domain/capitalize-words.ts
/**
 * Capitalizes the first letter of each word in a string.
 * @param text - The input string to capitalize
 * @returns The capitalized string
 * @example
 * capitalizeWords('hello world') // 'Hello World'
 */
export function capitalizeWords(text: string): string {
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
```

**Testing:**

```typescript
// src/domain/capitalize-words.test.ts
import { describe, it, expect } from 'vitest';
import { capitalizeWords } from './capitalize-words';

describe('capitalizeWords', () => {
  it('capitalizes each word', () => {
    expect(capitalizeWords('hello world')).toBe('Hello World');
  });

  it('handles empty strings', () => {
    expect(capitalizeWords('')).toBe('');
  });
});
```

Domain tests run in Node environment and complete in milliseconds because they have no dependencies on React, DOM, or network.

### User Interface Layer (`app/`, `src/ui/`)

The UI layer handles everything the user sees and interacts with.

**Two subdirectories:**

- **`app/`**: expo-router screens and layouts (file-based routing)
- **`src/ui/`**: Reusable UI components (buttons, cards, forms, etc.)

**Characteristics:**

- Uses React and React Native
- Uses Tamagui for cross-platform styling
- Imports domain functions for business logic
- Handles user interactions and navigation
- Contains presentation logic only

**What belongs here:**

- Screens and navigation layouts (`app/`)
- Reusable UI components (`src/ui/`)
- Form handling and validation triggers
- User interaction handlers (onClick, onSubmit, etc.)
- Component state management

**Example:**

```typescript
// app/index.tsx
import React from 'react';
import { YStack, H1 } from 'tamagui';

export default function TitleScreen(): React.JSX.Element {
  return (
    <YStack flex={1} items="center" justify="center" bg="$background">
      <H1>Language Den</H1>
    </YStack>
  );
}
```

**Reusable component example:**

```typescript
// src/ui/Button.tsx
import React from 'react';
import { Button as TamaguiButton, ButtonProps } from 'tamagui';

interface CustomButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary';
}

export function Button({
  variant = 'primary',
  ...props
}: CustomButtonProps): React.JSX.Element {
  return (
    <TamaguiButton
      bg={variant === 'primary' ? '$blue10' : '$gray10'}
      color="$white"
      {...props}
    />
  );
}
```

**Testing:**

UI components are tested with React Testing Library in jsdom environment:

```typescript
// src/ui/Button.test.tsx
import { describe, it, expect } from 'vitest';
import React from 'react';

describe('Button', () => {
  it('renders without crashing', () => {
    const button = React.createElement('button', { children: 'Click me' });
    expect(button).toBeDefined();
  });
});
```

### Services Layer (`src/services/`)

The services layer handles integration with external services and APIs.

**Characteristics:**

- Communicates with backend services (Supabase)
- Handles API calls and network requests
- Manages authentication state
- Provides async operations
- Can be mocked in tests

**What belongs here:**

- Supabase client initialization
- Authentication helpers (signUp, signIn, signOut)
- API client wrappers
- Data fetching functions
- External service integrations

**Example:**

```typescript
// src/services/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env['EXPO_PUBLIC_SUPABASE_URL'];
const supabaseAnonKey = process.env['EXPO_PUBLIC_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**Auth helpers example:**

```typescript
// src/services/auth-helpers.ts
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from './supabase';
import type { AuthError, SignInCredentials } from './auth-types';

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

**Testing:**

Services are typically mocked in unit tests and tested directly in integration tests:

```typescript
// Mock the Supabase client in tests
vi.mock('./services/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
    },
  },
}));
```

## Supporting Directories

### `src/lib/`

Utility functions and helpers that don't fit into domain logic.

- File system utilities
- Date/time helpers
- Generic helper functions
- Cross-cutting concerns

**Difference from domain layer:** `src/lib/` can have external dependencies and side effects, while `src/domain/` must be pure.

### `src/types/`

Shared TypeScript type definitions used across multiple layers.

- Interface definitions
- Type aliases
- Enums
- Constants

### `test/`

Test configuration and setup files.

- `test/setup.ts` - Global test configuration
- Test utilities and helpers
- Custom matchers (if needed)

### `supabase/`

Supabase-specific configuration and Edge Functions.

- `supabase/functions/` - Edge Functions (serverless)
- Edge Functions use Deno runtime, not Node.js
- Each function gets its own subdirectory

**Note:** This directory is excluded from TypeScript compilation and ESLint.

## Testing Strategy

### Domain Layer Tests

- **Environment**: Node.js
- **Speed**: Milliseconds
- **Approach**: Pure unit tests
- **Dependencies**: None (pure functions)

```bash
# Run domain tests
pnpm test src/domain/
```

Domain tests are the fastest and most reliable because they have zero dependencies.

### UI Layer Tests

- **Environment**: jsdom
- **Speed**: Seconds
- **Approach**: Component tests
- **Dependencies**: React Testing Library

```bash
# Run UI tests
pnpm test src/ui/
```

UI tests verify components render correctly and handle user interactions.

### Services Layer Tests

- **Environment**: Node.js or jsdom (depending on dependencies)
- **Speed**: Seconds
- **Approach**: Integration tests with mocks
- **Dependencies**: Mock external services

Services are typically mocked in unit tests and tested with real APIs in integration tests.

### Test Configuration

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom', // Default for React components
    setupFiles: ['./test/setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
  },
});
```

Individual test files can override the environment:

```typescript
// src/domain/example.test.ts
// @vitest-environment node

import { describe, it, expect } from 'vitest';
// ... tests run in Node environment
```

## Benefits of This Architecture

### 1. Fast Tests

Domain tests run in milliseconds because they're pure functions with no dependencies. This means:

- Rapid feedback during development
- Fast CI/CD pipelines
- Confidence to refactor

### 2. Easy to Refactor

Clear boundaries mean you can change one layer without affecting others:

- Swap UI library? Only change UI layer
- Change backend? Only change services layer
- Update business logic? Only change domain layer

### 3. Scalable

As the app grows, the architecture doesn't need restructuring:

- Add new domain functions without touching UI
- Add new screens without touching domain logic
- Add new services without affecting business rules

### 4. Easy to Understand

New developers can quickly understand the codebase:

- Clear folder structure
- Obvious dependencies
- Well-defined responsibilities

### 5. Type Safety

TypeScript strict mode enforces correctness:

- No implicit `any` types
- Explicit return types
- Compile-time error checking

## Common Patterns

### Pattern: UI calls domain, not the other way around

```typescript
// ✅ GOOD: UI imports domain
// app/calculator.tsx
import { add, subtract } from '@/domain/calculator';

function Calculator() {
  const result = add(1, 2);
  return <Text>{result}</Text>;
}
```

```typescript
// ❌ BAD: Domain imports UI (never do this!)
// src/domain/calculator.ts
import { showToast } from '@/ui/toast'; // ❌ Domain depends on UI

export function add(a: number, b: number): number {
  const result = a + b;
  showToast(`Result: ${result}`); // ❌ Side effect in domain
  return result;
}
```

### Pattern: Services provide async operations, domain provides sync logic

```typescript
// ✅ GOOD: Service handles async, domain handles sync
// src/services/user-service.ts
import { validateEmail } from '@/domain/validation';
import { supabase } from './supabase';

export async function createUser(email: string) {
  // Domain validates (sync)
  if (!validateEmail(email)) {
    return { success: false, error: 'Invalid email' };
  }

  // Service persists (async)
  const { error } = await supabase.from('users').insert({ email });
  return error ? { success: false, error } : { success: true };
}
```

### Pattern: Keep domain pure, push side effects to services

```typescript
// ✅ GOOD: Pure domain function
// src/domain/scoring.ts
export function calculateScore(answers: number[]): number {
  return answers.reduce((sum, answer) => sum + answer, 0);
}
```

```typescript
// ✅ GOOD: Service handles persistence
// src/services/score-service.ts
import { calculateScore } from '@/domain/scoring';
import { supabase } from './supabase';

export async function saveScore(answers: number[]) {
  const score = calculateScore(answers); // Pure domain logic
  await supabase.from('scores').insert({ score }); // Side effect in service
}
```

## Migration Strategy

If you need to add a feature and you're not sure where it goes:

1. **Is it pure logic with no side effects?** → Domain layer
2. **Does it render UI or handle user interaction?** → UI layer
3. **Does it call an API or external service?** → Services layer
4. **Is it a generic utility?** → `src/lib/`

When in doubt, start in the domain layer. It's easier to move code from domain → UI than from UI → domain.

## Future Considerations

This architecture supports future enhancements:

- **State Management**: Add React Context or Zustand for global state (UI layer)
- **Offline Support**: Add local storage and sync logic (services layer)
- **Complex Business Logic**: Add more domain modules (domain layer)
- **Multiple Backends**: Abstract services behind interfaces (services layer)
- **Platform-Specific Code**: Use Platform.select in UI layer

The three-layer architecture scales from a simple app to a complex enterprise application.

---

**Next Steps:**

- Read [folder-structure.md](./folder-structure.md) for detailed folder explanations
- Read [deployment.md](./deployment.md) for deployment guides
- Read [environment-setup.md](./environment-setup.md) for setup instructions
