import { styled, YStack, XStack } from 'tamagui';
import React from 'react';

/**
 * ProgressBar component - Animated progress indicator
 *
 * Displays a horizontal progress bar with smooth transitions for visualizing
 * completion percentage. The bar animates smoothly when the progress value changes.
 *
 * Features:
 * - Smooth animation when progress changes
 * - Theme-aware colors for background and fill
 * - Configurable height
 * - Accessible progress value (0-100)
 *
 * @example
 * <ProgressBar progress={75} />
 *
 * @example
 * <ProgressBar progress={50} height={8} />
 */

// Background container for the progress bar
const ProgressBarContainer = styled(XStack, {
  name: 'ProgressBarContainer',

  // Full width container
  width: '100%',
  height: 4,
  bg: '$borderColor',
  overflow: 'hidden',

  // Rounded corners
  variants: {
    rounded: {
      true: {
        borderRadius: '$2', // 8px rounded corners
      },
    },
  } as const,

  defaultVariants: {
    rounded: true,
  },
});

// Fill bar that shows the progress
const ProgressBarFill = styled(YStack, {
  name: 'ProgressBarFill',

  // Color and appearance
  bg: '$primary',
  height: '100%',

  // Animation for smooth transitions
  animation: 'normal',
});

/**
 * Props for ProgressBar component
 */
export interface ProgressBarProps {
  /**
   * Progress percentage (0-100)
   */
  progress: number;

  /**
   * Optional custom height (defaults to 4px)
   */
  height?: number;
}

/**
 * ProgressBar - Animated progress indicator component
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height,
}) => {
  // Clamp progress between 0 and 100
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <ProgressBarContainer height={height}>
      <ProgressBarFill style={{ width: `${clampedProgress.toString()}%` }} />
    </ProgressBarContainer>
  );
};
