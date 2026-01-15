import { YStack, XStack, Text, H2, Card, Button } from 'tamagui';
import { CardHeader } from '../CardHeader';
import { BookOpen } from '@tamagui/lucide-icons';

/**
 * ReviewQueueCards - Dashboard section showing review queue status
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
 * <ReviewQueueCards
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
 * <ReviewQueueCards
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

export interface ReviewQueueCardsProps {
  /** Queue data with breakdown by category */
  queue: ReviewQueueData;
  /** Callback fired when user clicks the "Start Reviewing" button */
  onStartReview: () => void;
}

export function ReviewQueueCards({
  queue,
  onStartReview,
}: ReviewQueueCardsProps): React.JSX.Element {
  const total = queue.newCards + queue.learningCards + queue.reviewCards;

  // Empty state when no cards are due
  if (total === 0) {
    return (
      <Card p="$6" gap="$4" borderRadius="$6">
        <YStack gap="$3" items="center" py="$4">
          <H2 fontSize="$6" fontWeight="700" color="$color">
            All caught up!
          </H2>
          <YStack width="100%" items="center">
            <Text fontSize="$3" color="$color" opacity={0.7}>
              No reviews due right now. Great work!
            </Text>
          </YStack>
        </YStack>
      </Card>
    );
  }

  // Queue display with categories
  return (
    <Card p="$5" gap="$3" borderRadius="$6">
      <CardHeader title="Review Queue" icon={<BookOpen size={28} />} />

      {/* Total Cards Due */}
      <YStack gap="$3">
        <XStack gap="$3" items="center">
          <H2 fontSize="$8" fontWeight="700" color="$color">
            {total.toString()}
          </H2>
          <Text fontSize="$4" color="$color">
            cards due
          </Text>
        </XStack>

        {/* Queue Breakdown */}
        <YStack gap="$2">
          <QueueItem label="New" count={queue.newCards} />
          <QueueItem label="Learning" count={queue.learningCards} />
          <QueueItem label="Review" count={queue.reviewCards} />
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
        <Text fontSize="$3" color="$color">
          {label}
        </Text>
      </YStack>
      <Text fontSize="$4" fontWeight="600" color="$color">
        {count.toString()}
      </Text>
    </XStack>
  );
}
