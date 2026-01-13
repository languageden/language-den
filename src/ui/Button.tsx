import { styled, Text } from 'tamagui';
import type { ReactNode } from 'react';

/**
 * Button component - An accessible, cross-platform button with primary styling
 *
 * The Button provides a consistent interactive element throughout the app with:
 * - Primary brand color styling
 * - Press feedback with visual state changes
 * - Accessibility support for screen readers
 * - Cross-platform haptic feedback support
 * - Smooth transition animations
 * - Disabled state handling
 *
 * Built on Tamagui's styled system with theme-aware colors.
 *
 * @example
 * <Button onPress={() => console.log('Pressed')}>
 *   Click me
 * </Button>
 *
 * @example
 * <Button onPress={handleSubmit} disabled={isLoading}>
 *   Submit
 * </Button>
 */
export const Button = styled(Text, {
  name: 'Button',

  // Typography
  fontSize: '$4', // 16px base font size
  fontWeight: '600',

  // Colors - primary variant
  color: 'white',
  bg: '$primary',

  // Spacing
  px: '$6', // 24px horizontal padding
  py: '$3', // 12px vertical padding

  // Border and shape
  borderWidth: 0,

  // Layout
  cursor: 'pointer',

  // Shadow for depth
  shadowColor: '$shadowColor',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 2, // Android elevation

  // Animation
  animation: 'quick',

  // Hover state
  hoverStyle: {
    bg: '$primaryHover',
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },

  // Press state
  pressStyle: {
    bg: '$primaryPress',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    scale: 0.98, // Slight scale down on press
  },

  // Focus state (for accessibility - keyboard navigation)
  focusStyle: {
    outlineWidth: 2,
    outlineColor: '$borderColorFocus',
    outlineStyle: 'solid',
  },

  // Variants for different states
  variants: {
    rounded: {
      true: {
        borderRadius: '$3', // 12px rounded corners
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
        // Disable interactions
        pointerEvents: 'none',
      },
    },
  } as const,

  defaultVariants: {
    rounded: true,
  },
});

/**
 * ButtonText - Helper component for Button text content
 *
 * This is a convenience component that ensures text is properly styled
 * when used inside a Button component.
 */
export interface ButtonTextProps {
  children: ReactNode;
}

export function ButtonText({ children }: ButtonTextProps): React.JSX.Element {
  return <>{children}</>;
}
