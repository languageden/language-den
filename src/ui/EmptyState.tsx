import { YStack, Text, Button } from 'tamagui';
import type { ReactNode } from 'react';

/**
 * EmptyState - Reusable component for displaying empty states
 *
 * Displays a centered empty state message with:
 * - Icon (emoji or custom element)
 * - Title heading
 * - Descriptive message
 * - Optional call-to-action button
 *
 * Use this component to provide helpful feedback when content is unavailable,
 * lists are empty, or features haven't been used yet.
 *
 * @example
 * <EmptyState
 *   icon="🌱"
 *   title="No items yet"
 *   message="Get started by creating your first item."
 * />
 *
 * @example
 * // With action button
 * <EmptyState
 *   icon="📚"
 *   title="No decks found"
 *   message="Create your first deck to start learning."
 *   actionLabel="Create Deck"
 *   onAction={() => console.log('Create deck...')}
 * />
 */
export interface EmptyStateProps {
  /** Icon or emoji to display at the top (can be string emoji or ReactNode) */
  icon: ReactNode;
  /** Main heading text */
  title: string;
  /** Descriptive message explaining the empty state */
  message: string;
  /** Optional label for the action button */
  actionLabel?: string;
  /** Optional callback fired when action button is pressed */
  onAction?: () => void;
}

export function EmptyState({
  icon,
  title,
  message,
  actionLabel,
  onAction,
}: EmptyStateProps): React.JSX.Element {
  return (
    <YStack gap="$4" items="center" py="$6">
      {/* Icon */}
      {typeof icon === 'string' ? <Text fontSize="$8">{icon}</Text> : icon}

      {/* Title */}
      <YStack gap="$2" items="center" width="100%">
        <Text fontSize="$6" fontWeight="700" color="$color">
          {title}
        </Text>

        {/* Message */}
        <YStack width="100%" items="center">
          <Text fontSize="$3" color="$color">
            {message}
          </Text>
        </YStack>
      </YStack>

      {/* Optional Action Button */}
      {actionLabel && onAction && (
        <Button onPress={onAction}>{actionLabel}</Button>
      )}
    </YStack>
  );
}
