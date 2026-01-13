import { styled, YStack } from 'tamagui';

/**
 * Card component - A reusable container for content sections
 *
 * The Card provides a consistent visual container throughout the dashboard with:
 * - Elevated appearance with shadow
 * - Rounded corners
 * - Semantic background color that adapts to light/dark mode
 * - Padding for content spacing
 * - Smooth transition animations on hover and press
 *
 * Built on Tamagui's YStack with theme-aware styling.
 *
 * @example
 * <Card>
 *   <Text>Card content goes here</Text>
 * </Card>
 *
 * @example
 * <Card p="$6" gap="$4">
 *   <H2>Title</H2>
 *   <Text>Content with custom padding and spacing</Text>
 * </Card>
 */
export const Card = styled(YStack, {
  name: 'Card',

  // Background and colors
  bg: '$backgroundStrong',
  borderColor: '$borderColor',
  borderWidth: 1,

  // Default padding
  p: '$4', // 16px

  // Shadow for elevation
  shadowColor: '$shadowColor',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 2, // Android elevation

  // Animation
  animation: 'quick',

  // Hover state
  hoverStyle: {
    bg: '$backgroundHover',
    borderColor: '$borderColorHover',
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },

  // Press state
  pressStyle: {
    bg: '$backgroundPress',
    borderColor: '$borderColorPress',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },

  // Focus state (for accessibility)
  focusStyle: {
    borderColor: '$borderColorFocus',
    borderWidth: 2,
  },

  // Default variants
  variants: {
    rounded: {
      true: {
        borderRadius: '$4', // 16px rounded corners
      },
    },
  } as const,

  defaultVariants: {
    rounded: true,
  },
});
