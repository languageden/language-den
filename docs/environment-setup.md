# Environment Setup Guide

This guide walks you through setting up your development environment for Language Den, including Supabase backend configuration and local development setup.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setting Up Supabase](#setting-up-supabase)
- [Getting Your Credentials](#getting-your-credentials)
- [Configuring Environment Variables](#configuring-environment-variables)
- [Verifying Setup](#verifying-setup)
- [Local Supabase Development (Optional)](#local-supabase-development-optional)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have:

- Node.js 18.0.0 or higher
- pnpm 8.0.0 or higher
- A Supabase account (free tier works)
- Git installed

## Setting Up Supabase

Language Den uses Supabase as its backend service for authentication, database, and edge functions.

### Creating a New Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click the **"New Project"** button
4. Fill in the project details:
   - **Organization**: Select or create an organization
   - **Project name**: `Language Den` (or your preferred name)
   - **Database password**: Generate a strong password and save it securely
   - **Region**: Choose the region closest to your users (e.g., US West, EU Central)
   - **Pricing plan**: Select Free tier for development
5. Click **"Create new project"**
6. Wait for the project to be provisioned (typically 1-2 minutes)

## Getting Your Credentials

Once your Supabase project is created, you'll need to get your API credentials.

### Locating Your Credentials

1. In the Supabase Dashboard, navigate to **Project Settings** (gear icon in the left sidebar)
2. Click on **API** in the settings menu
3. You'll see two important values:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **API Keys** → **anon public**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (long JWT string)

4. Keep this tab open - you'll need these values in the next step

### Important Security Note

The `anon` (anonymous) key is safe to use in client-side code. It's designed for public access, and your data is protected by Supabase's Row Level Security (RLS) policies. Never commit your `service_role` key to version control.

## Configuring Environment Variables

Language Den uses environment variables to securely store configuration values.

### Creating Your `.env` File

1. In the project root, locate the `.env.example` file
2. Copy it to create a new `.env` file:

   ```bash
   cp .env.example .env
   ```

3. Open `.env` in your text editor
4. Replace the placeholder values with your Supabase credentials:

   ```bash
   # Your actual Supabase project URL
   EXPO_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co

   # Your actual Supabase anon/public key
   EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

5. Save the file

### Required Environment Variables

| Variable                        | Description                   | Where to Get It                   |
| ------------------------------- | ----------------------------- | --------------------------------- |
| `EXPO_PUBLIC_SUPABASE_URL`      | Your Supabase project URL     | Dashboard → Settings → API → URL  |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key | Dashboard → Settings → API → anon |

**Note**: Variables prefixed with `EXPO_PUBLIC_` are accessible in client-side code. This is an Expo convention for environment variables that should be bundled with the app.

### `.env` File Safety

The `.env` file is already listed in `.gitignore` and will not be committed to version control. This protects your credentials from being accidentally exposed in your Git repository.

## Verifying Setup

After configuring your environment variables, verify everything works:

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Run the type checker:

   ```bash
   pnpm type-check
   ```

3. Run tests:

   ```bash
   pnpm test
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. The Expo dev server should start successfully. If you see errors about missing environment variables, double-check your `.env` file.

### Testing Supabase Connection

To verify your Supabase connection works, you can check the browser console (for web) or device logs:

1. Start the dev server: `pnpm web`
2. Open the browser console (F12)
3. The app should load without Supabase-related errors
4. If you see "Missing required environment variable" errors, review your `.env` file

## Local Supabase Development (Optional)

For advanced use cases, you can run Supabase locally using Docker. This is optional and not required for development.

### Prerequisites for Local Supabase

- Docker Desktop installed and running
- Supabase CLI installed globally:

  ```bash
  npm install -g supabase
  ```

### Running Supabase Locally

1. Initialize Supabase in your project:

   ```bash
   supabase init
   ```

2. Start the local Supabase services:

   ```bash
   supabase start
   ```

3. The CLI will output local credentials. Update your `.env` file to use them:

   ```bash
   EXPO_PUBLIC_SUPABASE_URL=http://localhost:54321
   EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc... # (from CLI output)
   ```

4. Access the local Supabase Studio at `http://localhost:54323`

### Switching Between Local and Cloud

To switch between local and cloud Supabase:

1. Keep two `.env` files:
   - `.env.local` - For local Supabase
   - `.env.cloud` - For cloud Supabase
2. Copy the desired file to `.env` when switching

Or use environment-specific files supported by your hosting/deployment platform.

## Troubleshooting

### "Missing required environment variable" Error

**Symptoms**: Error message about missing `EXPO_PUBLIC_SUPABASE_URL` or `EXPO_PUBLIC_SUPABASE_ANON_KEY`

**Solutions**:

1. Verify `.env` file exists in project root
2. Check that variable names exactly match (including `EXPO_PUBLIC_` prefix)
3. Ensure no extra spaces around `=` in the `.env` file
4. Restart the development server after changing `.env`

### "Invalid API Key" or Connection Errors

**Symptoms**: Errors when trying to connect to Supabase, or authentication failures

**Solutions**:

1. Verify you copied the complete anon key from Supabase Dashboard (it's very long)
2. Check that you're using the `anon` key, not the `service_role` key
3. Ensure your Supabase project is active (not paused due to inactivity)
4. Verify the project URL is correct and includes `https://`

### Environment Variables Not Loading

**Symptoms**: Variables are undefined when accessed in code

**Solutions**:

1. Ensure variables are prefixed with `EXPO_PUBLIC_` for client-side access
2. Restart the dev server with `pnpm dev` (environment variables are loaded at startup)
3. Clear Metro bundler cache: `pnpm dev --clear`
4. On native platforms, rebuild the app after changing environment variables

### Supabase Project Paused

**Symptoms**: Connection timeouts, "Project is paused" errors

**Solutions**:

1. Free tier projects pause after 1 week of inactivity
2. Visit your Supabase Dashboard and click "Restore" on the paused project
3. Wait a few minutes for the project to resume
4. Projects on paid plans do not auto-pause

### pnpm Not Found

**Symptoms**: `pnpm: command not found`

**Solutions**:

1. Install pnpm globally:

   ```bash
   npm install -g pnpm
   ```

2. Or use with npx (slower):

   ```bash
   npx pnpm install
   ```

## Next Steps

After completing environment setup:

1. Read [Architecture Documentation](./architecture.md) to understand the codebase structure
2. Review [Folder Structure](./folder-structure.md) to learn where different types of code belong
3. Check out the [README](../README.md) for available development commands
4. When ready to deploy, see [Deployment Guide](./deployment.md)

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Expo Environment Variables](https://docs.expo.dev/guides/environment-variables/)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
