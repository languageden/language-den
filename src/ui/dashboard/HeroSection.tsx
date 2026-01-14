import { YStack, XStack, Text, H2 } from 'tamagui';
import { Button } from '../Button';
import { Card } from '../Card';

/**
 * HeroSection - Top section of the dashboard with personalized greeting and primary CTA
 *
 * Displays:
 * - Time-based personalized greeting with emoji icon
 * - Streak counter with motivational message
 * - Primary "Start Review Session" call-to-action button
 *
 * @example
 * <HeroSection
 *   userName="Sarah"
 *   greeting="Good morning"
 *   greetingIcon="🌅"
 *   streakCount={5}
 *   onStartReview={() => console.log('Starting review...')}
 * />
 */

export interface HeroSectionProps {
  /** User's display name for personalized greeting */
  userName: string;
  /** Time-based greeting text (e.g., "Good morning", "Good evening") */
  greeting: string;
  /** Emoji icon for the greeting (e.g., "🌅", "🌙") */
  greetingIcon: string;
  /** Number of consecutive days the user has been active */
  streakCount: number;
  /** Callback fired when user clicks the "Start Review Session" button */
  onStartReview: () => void;
}

export function HeroSection({
  userName,
  greeting,
  greetingIcon,
  streakCount,
  onStartReview,
}: HeroSectionProps): React.JSX.Element {
  return (
    <Card p="$6" gap="$5">
      {/* Greeting Section */}
      <YStack gap="$2">
        <XStack gap="$3" items="center">
          <Text fontSize="$8">{greetingIcon}</Text>
          <H2 fontSize="$7" fontWeight="700" color="$color">
            {greeting}, {userName}!
          </H2>
        </XStack>
      </YStack>

      {/* Streak Counter */}
      <XStack gap="$3" items="center">
        <Text fontSize="$6">🔥</Text>
        <YStack gap="$1" flex={1}>
          <Text fontSize="$5" fontWeight="600" color="$color">
            {streakCount.toString()} Day Streak
          </Text>
          <Text fontSize="$3" color="$secondary">
            Keep the momentum going!
          </Text>
        </YStack>
      </XStack>

      {/* Primary CTA */}
      <Button onPress={onStartReview}>Start Review Session</Button>
    </Card>
  );
}
