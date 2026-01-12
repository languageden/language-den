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
