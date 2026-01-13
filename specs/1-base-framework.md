## Language Den — Infrastructure & Scaffold v0

---

## 1. Product Overview

**Product name:** Language Den

**Purpose of this PRD:**
Define the **technical and architectural requirements** for generating an initial, working scaffold of the Language Den app. The result must be a **runnable, testable, and releasable** cross-platform application with minimal UI (title screen only).

**Non-goal:** Implement learning features, flashcards, scheduling logic, or content.

---

## 2. Platforms & Scope

### Supported platforms (v0)

- iOS
- Android
- Web (app-like SPA, no SEO)

### UI scope (v0)

- Single title screen displaying:
  - App name: **Language Den**

- No navigation beyond the root screen
- No authentication UI
- No data persistence required for v0

---

## 3. Architectural Constraints

### Codebase structure

- **Single repository**
- Must support:
  - Local development
  - Fast local test execution
  - Mobile + web builds
  - Production deployment paths

### Language & framework constraints

- TypeScript everywhere on the client
- No native code required in v0

---

## 4. Client Application Stack (Required)

### Core framework

- **Expo (React Native)**
- **expo-router** for routing (even if only a root route exists)
- Must run on:
  - iOS
  - Android
  - Web

### UI system

- **Tamagui**
- Include:
  - Token configuration (colors, spacing, typography)
  - Minimal theme setup

- Title screen must be implemented using Tamagui components

### Web support

- Use Expo Web
- App-style SPA (no SSR, no SEO)
- Must be deployable independently of mobile apps

---

## 5. Backend & Services (Provisioned, Minimal Use)

### Backend platform

- **Supabase**

### Required Supabase setup

- Project configuration files included in repo
- Environment variable placeholders for:
  - Supabase URL
  - Supabase anon/public key

### Features to configure (but not fully use yet)

- Supabase Auth (enabled, not wired to UI)
- Supabase Postgres (no schema required for v0)
- Supabase Edge Functions (stub/example function only)

No custom backend (Rails, Node, etc.) is allowed.

---

## 6. Testing Requirements (Local-speed first)

### Principles

- Default local test run must complete in **seconds**
- Tests must not require:
  - iOS simulator
  - Android emulator
  - Network access

### Required setup

- **Vitest** as the test runner
- At least:
  - One passing unit test for a pure TypeScript module
  - One basic render test for the title screen (Node-based)

### Structure expectations

- Clear separation between:
  - Pure domain logic
  - UI code
  - External services (Supabase)

---

## 7. Tooling & Scripts (Required)

The scaffold must include working scripts for:

- Local development
  - Start Expo dev server
  - Run web app

- Testing
  - Fast local test command
  - Watch mode

- Builds
  - iOS build via EAS
  - Android build via EAS
  - Web build output

- Formatting / linting
  - Type checking separate from test execution

---

## 8. Release & Deployment Expectations

### Mobile

- EAS Build–compatible
- App must be able to:
  - Build for iOS and Android
  - Be submitted later without structural changes

### Web

- Static build output suitable for deployment
- Must be deployable without affecting mobile builds

### Updates

- Structure must be compatible with **EAS Update** (OTA), even if not used in v0

---

## 9. Non-goals (Explicit)

The scaffold must **not** include:

- Flashcard logic
- Scheduling algorithms
- AI features
- Analytics
- Push notifications
- Payment/billing
- Database schema design
- SEO or marketing pages

---

## 10. Acceptance Criteria (for AI-generated scaffold)

The output is acceptable if:

1. `pnpm install && pnpm dev` starts the app locally
2. App runs on:
   - Web browser
   - iOS simulator (or Expo Go)
   - Android emulator (or Expo Go)

3. The title screen renders “Language Den” using Tamagui
4. `pnpm test` runs and passes in seconds
5. EAS build configuration exists and is valid
6. Supabase configuration is present but not coupled to UI
7. Repo structure clearly supports future growth without refactor

---

## 11. Deliverables Expected from AI

- Fully scaffolded repository
- README with:
  - Setup instructions
  - Environment variables
  - Common commands

- Sensible folder structure
- Minimal but correct configuration files

---

## 12. Guiding Principle

> **This version exists solely to prove the infrastructure.**
> Everything else will be layered on later.
