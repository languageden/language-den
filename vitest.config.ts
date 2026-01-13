import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Test environment - use 'node' for pure TypeScript tests (domain layer)
    // Individual test files can override with @vitest-environment comment
    environment: 'node',

    // Setup files run before each test file
    setupFiles: ['./test/setup.ts'],

    // Include patterns for test files
    include: ['**/*.test.{ts,tsx}'],

    // Exclude patterns
    exclude: ['node_modules', 'dist', '.expo'],

    // Coverage configuration (optional, for future use)
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'test/',
        '**/*.test.{ts,tsx}',
        '**/*.config.{ts,js}',
      ],
    },

    // Globals disabled - prefer explicit imports from vitest
    globals: false,
  },

  // Resolve aliases to match tsconfig.json paths
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
