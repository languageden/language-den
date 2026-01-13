# Language Den - Front-End Design Vision & Theming

**Version:** 1.0
**Status:** Design Sprint - Dashboard Focus
**Last Updated:** 2026-01-13

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Theming & Color System](#theming--color-system)
3. [Dashboard Vision](#dashboard-vision)
4. [Design Principles](#design-principles)

---

## Design Philosophy

### Core Principles

**Vibrant & Gamified**
Language Den uses color, animation, and playful design to make language learning feel rewarding and engaging. The interface celebrates progress and creates positive momentum through visual feedback.

**Motivation-Driven**
Every design decision prioritizes learner motivation. Stats are presented as achievements, actions feel satisfying, and progress is visible and celebrated.

**Clarity First**
Despite the vibrant aesthetic, information hierarchy is clear. Important actions (CTAs) stand out, metrics are scannable, and complexity is hidden behind clean interfaces.

**Cross-Platform Consistency**
The design system works seamlessly across Web, iOS, and Android using Tamagui's token system. Platform-specific conventions are respected where appropriate.

### Design Inspirations

- **Duolingo** - Gamification, streak mechanics, encouraging tone
- **Memrise** - Vibrant colors, learning momentum
- **Strava** - Stats presentation, achievement focus
- **Linear** - Clean information hierarchy despite feature density

---

## Theming & Color System

### Color Philosophy

Language Den uses vibrant, energetic colors that motivate and celebrate learning progress. The color system creates positive momentum through visual feedback while maintaining excellent readability and accessibility.

### Primary Brand Color

**Deep Forest Green** - `#2d8659`

This color represents growth, learning, and natural progress. It's calming yet energetic, making it perfect for a learning environment that users will visit daily.

### Supporting Colors

- **Success Green** (`#00cc66`) - Celebrating achievements and completed actions
- **Energetic Orange** (`#ff9500`) - Warnings and attention items
- **Streak Fire** (`#ff6b35`) - Streak celebrations and motivational elements
- **Error Red** (`#ff4757`) - Error states and destructive actions

### Color Usage

The color system should include:

- Full shade ranges (50-900) for each brand color
- Light and dark mode variants
- Neutral grays for text and backgrounds
- Semantic mapping for consistent usage (primary, success, warning, error)
- Gradient options for hero sections and special moments

### Design Tokens

Use Tamagui's token system to define:

- Color scales with consistent naming
- Semantic color mappings
- Theme switching support (light/dark)
- Accessible color contrast ratios (WCAG 2.1 AA minimum)

---

## Dashboard Vision

The dashboard is the daily hub for language learners - a place that motivates, informs, and encourages action.

### Core Sections

The dashboard consists of four main areas presented in a scrollable vertical layout:

**1. Hero Section**

- Personalized greeting with time-appropriate icon (sun/moon)
- Prominent streak counter with flame icon to celebrate consistency
- Large, inviting CTA button: "Start Review Session"
- Purpose: Create immediate engagement and celebrate the learner's dedication

**2. Stats Overview**

- Grid of metric cards showing key learning indicators
- Suggested metrics: Words learned, today's reviews due, study time, weekly progress
- Visual design: Cards with icons, large numbers, and optional progress indicators
- Layout: Responsive grid (2x2 on mobile, 4x1 on larger screens)
- Purpose: Provide at-a-glance status of learning journey

**3. Today's Review Queue**

- Full-width card showing spaced repetition status
- Display count of cards due with categorical breakdown (new, learning, review)
- Optional visual: Stacked bar chart showing queue composition
- Call-to-action button to start reviewing
- Empty state: Celebration message when no reviews due
- Purpose: Focus attention on the primary learning activity

**4. Recent Activity Feed**

- Chronological list of recent learning achievements
- Each item has colored icon, description, and timestamp
- Examples: "Completed review session", "Learned 10 new words", "Achieved 7-day streak"
- Show 5-7 most recent items with "See all" expansion option
- Purpose: Create sense of progress and momentum

### Design Characteristics

- **Clean hierarchy**: Most important action (Start Review) is visually dominant
- **Scannable**: Users can assess their status in seconds
- **Motivational**: Every element reinforces progress and achievement
- **Responsive**: Adapts gracefully from mobile to desktop
- **Safe areas**: Respects platform notches and nav bars

---

## Design Principles

### Visual Hierarchy

**Progressive Disclosure**
Show the most important information first. The hero section and primary CTA are above the fold on all devices.

**Scannable Layout**
Users should understand their status within 3 seconds of opening the app. Use size, color, and spacing to guide the eye.

**Action-Oriented**
Every screen should have a clear next step. The "Start Review" button is always prominent and accessible.

### Typography

- Use system fonts for cross-platform consistency and performance
- Establish clear type scale with distinct heading and body sizes
- Maintain strong hierarchy through size and weight, not just color
- Ensure readability with appropriate line heights (1.5x minimum)

### Spacing

- Use consistent spacing scale based on 4px or 8px increments
- Create breathing room - white space is a design element
- Group related elements with proximity
- Use generous padding around touch targets (minimum 44x44 points)

### Components

**Reusable & Composable**
Build a library of small, focused components that can be combined to create complex layouts.

**Accessible by Default**
Every component should include proper ARIA labels, keyboard navigation, and screen reader support from the start.

**Cross-Platform**
Components should work identically across Web, iOS, and Android using Tamagui primitives.

### Motion & Feedback

**Purposeful Animation**
Every animation should communicate state or provide feedback. Avoid decorative motion.

**Fast & Subtle**
Keep animations under 400ms. Users should barely notice them but feel the polish.

**Celebrate Achievements**
Use bolder animations for positive moments: completing a streak, leveling up, finishing a session.

**Respect Preferences**
Honor the user's reduced motion settings by providing instant transitions when requested.

### Accessibility

**WCAG 2.1 AA Minimum**
All text must meet contrast requirements (4.5:1 for normal text, 3:1 for large text).

**Touch Targets**
All interactive elements must be at least 44x44 points with 8px spacing between them.

**Screen Readers**
Use semantic HTML/component structure, proper heading hierarchy, and descriptive labels.

**Keyboard Navigation**
All interactive elements must be keyboard accessible with visible focus indicators.

### Platform Considerations

**iOS**

- Respect safe area insets for notch and home indicator
- Use haptic feedback for tactile responses
- Follow iOS navigation patterns (swipe-to-go-back)

**Android**

- Respect system navigation insets
- Use ripple effects for touch feedback (built into React Native)
- Consider back button behavior

**Web**

- Support hover states for mouse users
- Provide keyboard shortcuts where appropriate
- Optimize for different screen sizes (mobile, tablet, desktop)

---

## Implementation Notes

### Technology Stack

- **Tamagui**: Cross-platform UI framework with token-based theming
- **Expo Router**: File-based navigation
- **React Native**: Core framework for iOS, Android, and Web

### Getting Started

1. Define custom color tokens in `tamagui.config.ts`
2. Create reusable UI components in `src/ui/` using Tamagui primitives
3. Build dashboard screen by composing components
4. Test across all three platforms (Web, iOS, Android)
5. Verify accessibility with screen readers and keyboard navigation

### Design-to-Code Workflow

This document provides the vision and principles. Implementation details (exact pixel sizes, specific font weights, animation timing) should be determined during development based on:

- Visual testing and iteration
- Platform-specific best practices
- User feedback and testing
- Performance considerations

The goal is a beautiful, functional interface that motivates learners - not pixel-perfect adherence to arbitrary specifications.
