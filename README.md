# Language Den

A cross-platform language learning application built with React Native (Expo). This is the **infrastructure scaffold** - a minimal, runnable, testable application that proves the technical foundation works before adding learning features.

> **Current scope (v0):** Infrastructure only - no learning features, flashcards, or scheduling logic yet.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Building](#building)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Environment Variables](#environment-variables)
- [Platform Support](#platform-support)
- [Troubleshooting](#troubleshooting)
- [Documentation](#documentation)
- [Acceptance Criteria](#acceptance-criteria)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: >= 18.0.0
- **pnpm**: >= 8.0.0 (specified version: 8.15.0)
- **Expo CLI**: Available via npx (no global install needed)
- **Git**: For version control

For mobile development, you'll also need:

- **iOS**: macOS with Xcode 13+ (for iOS simulator)
- **Android**: Android Studio with an Android emulator configured

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd language-den
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Supabase credentials:

   ```env
   EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

   See [Environment Variables](#environment-variables) section for details on obtaining Supabase credentials.

4. **Start the development server:**

   ```bash
   pnpm dev
   ```

5. **Run the app:**

   After starting the dev server, you can:
   - Press `w` to open in web browser
   - Press `i` to open in iOS simulator (macOS only)
   - Press `a` to open in Android emulator
   - Scan the QR code with Expo Go app on your physical device

## Available Scripts

### Development

- `pnpm dev` - Start Expo development server
- `pnpm web` - Start development server for web only
- `pnpm ios` - Start with iOS simulator
- `pnpm android` - Start with Android emulator

### Testing

- `pnpm test` - Run all tests once (CI-friendly)
- `pnpm test:watch` - Run tests in watch mode for development
- `pnpm type-check` - Run TypeScript compiler to check for type errors

### Code Quality

- `pnpm lint` - Run ESLint to check code quality
- `pnpm format` - Format all code with Prettier (write)
- `pnpm format:check` - Check if code is formatted (CI-friendly)

### Building

- `pnpm build:web` - Build static web app (outputs to `dist/` folder)
- `pnpm build:ios` - Build iOS app with EAS Build
- `pnpm build:android` - Build Android app with EAS Build

## Testing

This project uses **Vitest** for fast, reliable testing. All tests must:

- Run in **seconds** (not minutes)
- Work without iOS simulator or Android emulator
- Work without network access
- Be deterministic and reliable

### Running Tests

```bash
# Run all tests once
pnpm test

# Run tests in watch mode during development
pnpm test:watch

# Run type checking
pnpm type-check
```

### Test Organization

- **Unit tests**: Place next to the code they test with `.test.ts` extension
- **Component tests**: Use `.test.tsx` extension for React components
- **Domain tests**: Pure TypeScript tests in `src/domain/` (extremely fast)
- **Component tests**: React component tests using jsdom environment

Example:

```
src/domain/capitalize-words.ts
src/domain/capitalize-words.test.ts
```

## Building

### Web

Build a static web app that can be deployed to any hosting service:

```bash
pnpm build:web
```

This creates a production build in the `dist/` folder. Deploy it to:

- Netlify
- Vercel
- Cloudflare Pages
- AWS S3 + CloudFront
- Any static hosting service

### iOS

Build for iOS using EAS Build:

```bash
pnpm build:ios
```

Prerequisites:

- Apple Developer account
- EAS Build configured (see `eas.json`)

### Android

Build for Android using EAS Build:

```bash
pnpm build:android
```

## Project Structure

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
│   │   ├── supabase.ts   # Supabase client initialization
│   │   ├── auth-*.ts     # Authentication helpers
│   │   └── ...
│   │
│   ├── lib/               # Utility functions and helpers
│   │
│   └── types/             # Shared TypeScript type definitions
│
├── test/                  # Test utilities and setup
│   └── setup.ts          # Vitest configuration
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

## Technology Stack

### Core Framework

- **Expo (React Native)** - Cross-platform mobile and web framework
- **TypeScript** - Strict typing everywhere
- **expo-router** - File-based routing (similar to Next.js)

### UI & Styling

- **Tamagui** - Cross-platform UI component library with token-based theming
- Token system for colors, spacing, and typography

### Backend & Services

- **Supabase** - Backend-as-a-service
  - Postgres database
  - Authentication with secure token storage
  - Edge Functions (serverless, Deno runtime)
- Environment variables prefixed with `EXPO_PUBLIC_`

### Testing

- **Vitest** - Fast test runner (replaces Jest)
- **React Testing Library** - Component testing
- **jsdom** - DOM environment for React tests

### Package Management

- **pnpm** - Fast, disk-efficient package manager

### Build & Deployment

- **EAS Build** - Cloud builds for iOS and Android
- **EAS Update** - Over-the-air updates (infrastructure ready)
- Static web builds deployable to any hosting

## Architecture

Language Den follows a **three-layer architecture** with clear separation of concerns:

### Dependency Direction

```
UI Layer (app/, src/ui/)
    ↓ depends on
Domain Layer (src/domain/)
    ↑ depended on by
Services Layer (src/services/)
```

### Key Rules

1. **Domain layer** is pure TypeScript - no React, no external dependencies
2. **UI layer** can import from domain, but domain never imports from UI
3. **Services layer** handles external APIs (Supabase) and is mocked in tests
4. Clear boundaries enable fast testing and easy refactoring

### Benefits

- **Fast tests**: Domain logic tests run in milliseconds (no React, no network)
- **Easy refactoring**: Clear boundaries make changes safer
- **Scalability**: Add features without restructuring the codebase
- **Testability**: Pure functions in domain layer are trivial to test

For detailed architecture documentation, see `docs/architecture.md`.

## Environment Variables

All environment variables for Expo must be prefixed with `EXPO_PUBLIC_` to be accessible in client-side code.

### Required Variables

| Variable                        | Description            | Where to Get It            |
| ------------------------------- | ---------------------- | -------------------------- |
| `EXPO_PUBLIC_SUPABASE_URL`      | Supabase project URL   | Dashboard → Settings → API |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Dashboard → Settings → API |

### Getting Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com)
2. Navigate to: **Project Settings → API**
3. Copy **Project URL** and **anon/public key**
4. Add them to your `.env` file

**Note:** The anon/public key is safe to use in client-side code - it's designed for public access with Row Level Security protecting data.

For detailed setup instructions, see `docs/environment-setup.md`.

## Platform Support

The app works on:

- ✅ **Web** - SPA (Single Page Application), no server-side rendering
- ✅ **iOS** - iPhone and iPad (requires macOS with Xcode for development)
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

## Troubleshooting

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

## Documentation

Additional documentation can be found in the `docs/` directory:

- `docs/architecture.md` - Detailed architecture documentation
- `docs/folder-structure.md` - Folder structure explanation
- `docs/environment-setup.md` - Environment setup guide
- `docs/deployment.md` - Deployment guide for all platforms

## Acceptance Criteria

The infrastructure scaffold is successful when:

1. ✅ `pnpm install && pnpm dev` starts the app
2. ✅ App runs on Web, iOS simulator, and Android emulator
3. ✅ Title screen renders "Language Den" using Tamagui
4. ✅ `pnpm test` runs and passes in seconds
5. ✅ EAS Build configuration is valid
6. ✅ Supabase configuration exists (not coupled to UI yet)
7. ✅ Folder structure supports future growth without refactor

## Contributing

This is the infrastructure scaffold phase. Focus on:

- Making the foundation solid
- Keeping tests fast
- Following architectural boundaries
- Writing clean, maintainable code

Avoid:

- Premature optimization
- Over-engineering
- Adding features not in tickets
- Breaking existing tests

## License

[Add your license here]

---

**Guiding Principle:**

> This version exists solely to prove the infrastructure.
> Everything else will be layered on later.
