import { YStack, Text, H2, Card } from 'tamagui';
import { Button } from '../Button';

/**
 * HeroCards - Top section of the dashboard with personalized greeting and primary CTA
 *
 * Displays:
 * - Time-based personalized greeting with emoji icon
 * - Streak counter with motivational message
 * - Primary "Start Review Session" call-to-action button
 *
 * @example
 * <HeroCards
 *   userName="Sarah"
 *   greeting="Good morning"
 *   greetingIcon="🌅"
 *   streakCount={5}
 *   onStartReview={() => console.log('Starting review...')}
 * />
 */

export interface HeroCardsProps {
  /** User's display name for personalized greeting */
  userName: string;
  /** Time-based greeting text (e.g., "Good morning", "Good evening") */
  greeting: string;
  /** Number of consecutive days the user has been active */
  streakCount: number;
  /** Callback fired when user clicks the "Start Review Session" button */
  onStartReview: () => void;
}

export function HeroCards({
  userName,
  greeting,
  streakCount,
  onStartReview,
}: HeroCardsProps): React.JSX.Element {
  return (
    <Card p="$6" gap="$5" borderRadius="$6">
      {/* Greeting Section */}
      <YStack gap="$2">
        <H2 fontSize="$7" fontWeight="700" color="$color">
          {greeting}, {userName}!
        </H2>
      </YStack>

      {/* Streak Counter */}
      <YStack gap="$2">
        <Text fontSize="$8" fontWeight="800" color="$color">
          {streakCount}
        </Text>
        <Text fontSize="$3" color="$color" fontWeight="600">
          Day Streak
        </Text>
        <Text fontSize="$2" color="$color" opacity={0.7}>
          Keep the momentum going!
        </Text>
      </YStack>

      {/* Primary CTA */}
      <Button onPress={onStartReview}>Start Review Session</Button>
    </Card>
  );
}
