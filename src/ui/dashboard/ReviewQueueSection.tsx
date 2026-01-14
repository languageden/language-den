import { YStack, XStack, Text, H2, Card } from 'tamagui';
import { Button } from '../Button';

/**
 * ReviewQueueSection - Dashboard section showing review queue status
 *
 * Displays the spaced repetition review queue with categorized breakdown:
 * - New cards to learn
 * - Cards currently in learning phase
 * - Cards due for review
 *
 * Shows either the queue summary with a call-to-action button or an empty state
 * when no cards are due for review.
 *
 * @example
 * <ReviewQueueSection
 *   queue={{
 *     newCards: 5,
 *     learningCards: 12,
 *     reviewCards: 8
 *   }}
 *   onStartReview={() => console.log('Starting review...')}
 * />
 *
 * @example
 * // Empty state
 * <ReviewQueueSection
 *   queue={{
 *     newCards: 0,
 *     learningCards: 0,
 *     reviewCards: 0
 *   }}
 *   onStartReview={() => {}}
 * />
 */

export interface ReviewQueueData {
  /** Number of new cards to learn */
  newCards: number;
  /** Number of cards currently being learned */
  learningCards: number;
  /** Number of cards due for review */
  reviewCards: number;
}

export interface ReviewQueueSectionProps {
  /** Queue data with breakdown by category */
  queue: ReviewQueueData;
  /** Callback fired when user clicks the "Start Reviewing" button */
  onStartReview: () => void;
}

export function ReviewQueueSection({
  queue,
  onStartReview,
}: ReviewQueueSectionProps): React.JSX.Element {
  const total = queue.newCards + queue.learningCards + queue.reviewCards;

  // Empty state when no cards are due
  if (total === 0) {
    return (
      <Card p="$6" gap="$4" borderRadius="$6">
        <YStack gap="$3" items="center" py="$4">
          <Text fontSize="$8">🎉</Text>
          <H2 fontSize="$6" fontWeight="700" color="$color">
            All caught up!
          </H2>
          <YStack width="100%" items="center">
            <Text fontSize="$3" color="$secondary">
              No reviews due right now. Great work!
            </Text>
          </YStack>
        </YStack>
      </Card>
    );
  }

  // Queue display with categories
  return (
    <Card p="$6" gap="$5" borderRadius="$6">
      {/* Section Header */}
      <Text fontSize="$5" fontWeight="600" color="$color">
        Review Queue
      </Text>

      {/* Total Cards Due */}
      <YStack gap="$3">
        <XStack gap="$3" items="center">
          <H2 fontSize="$8" fontWeight="700" color="$primary">
            {total.toString()}
          </H2>
          <Text fontSize="$4" color="$secondary">
            cards due
          </Text>
        </XStack>

        {/* Queue Breakdown */}
        <YStack gap="$2">
          <QueueItem
            label="New"
            count={queue.newCards}
          />
          <QueueItem
            label="Learning"
            count={queue.learningCards}
          />
          <QueueItem
            label="Review"
            count={queue.reviewCards}
          />
        </YStack>
      </YStack>

      {/* Call to Action */}
      <Button onPress={onStartReview}>Start Reviewing</Button>
    </Card>
  );
}

/**
 * QueueItem - Individual queue category display
 *
 * Internal helper component for displaying a single queue category
 * with label, count, and semantic color.
 */
function QueueItem({
  label,
  count,
}: {
  label: string;
  count: number;
}): React.JSX.Element {
  return (
    <XStack gap="$3" items="center">
      <YStack width={80}>
        <Text fontSize="$3" color="$secondary">
          {label}
        </Text>
      </YStack>
      <Text fontSize="$4" fontWeight="600" color="$color">
        {count.toString()}
      </Text>
    </XStack>
  );
}
