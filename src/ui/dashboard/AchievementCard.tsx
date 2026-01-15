import { YStack, Text, Card, XStack } from 'tamagui';
import { Award, Zap, Target } from '@tamagui/lucide-icons';

/**
 * Achievement data structure
 */
export interface Achievement {
  /** Achievement title */
  title: string;
  /** Achievement description */
  description: string;
  /** Achievement icon */
  icon: React.ReactNode;
  /** Whether achievement is unlocked */
  unlocked: boolean;
  /** Progress percentage (0-100) for incomplete achievements */
  progress?: number;
}

/**
 * Props for AchievementCard component
 */
export interface AchievementCardProps {
  /** Achievement to display */
  achievement: Achievement;
}

/**
 * AchievementCard - Card displaying user achievements and milestones
 *
 * Shows achievement progress with:
 * - Achievement icon and title
 * - Progress indicator for incomplete achievements
 * - Visual distinction between locked/unlocked
 * - Motivational descriptions
 *
 * @example
 * <AchievementCard
 *   achievement={{
 *     title: "Week Streak",
 *     description: "7 days of consistent learning",
 *     icon: <Zap />,
 *     unlocked: true,
 *     progress: 100
 *   }}
 * />
 */
export function AchievementCard({
  achievement,
}: AchievementCardProps): React.JSX.Element {
  const { title, description, icon, unlocked, progress } = achievement;

  return (
    <Card p="$5" gap="$3" borderRadius="$6">
      {/* Header with Icon */}
      <XStack gap="$3" items="flex-start">
        <YStack
          width="$6"
          height="$6"
          items="center"
          justify="center"
          borderRadius="$3"
          bg={unlocked ? '$green10' : '$gray8'}
          opacity={unlocked ? 1 : 0.6}
        >
          <Text color={unlocked ? '$color' : '$gray11'}>{icon}</Text>
        </YStack>

        <YStack flex={1} gap="$1">
          <Text fontSize="$4" fontWeight="600" color="$color">
            {title}
          </Text>
          <Text fontSize="$2" color="$color" opacity={0.7}>
            {description}
          </Text>
        </YStack>

        {!unlocked && progress !== undefined && (
          <Text fontSize="$3" fontWeight="600" color="$color" opacity={0.8}>
            {Math.round(progress)}%
          </Text>
        )}
      </XStack>

      {/* Progress Bar for incomplete achievements */}
      {!unlocked && progress !== undefined && (
        <YStack gap="$1">
          <YStack height="$2" borderRadius="$1" bg="$gray6" overflow="hidden">
            <YStack
              height="100%"
              borderRadius="$1"
              bg="$primary"
              width={`${progress}%`}
            />
          </YStack>
        </YStack>
      )}

      {/* Achievement Status */}
      {unlocked && (
        <XStack gap="$2" items="center">
          <Award size={16} color="$green10" />
          <Text fontSize="$2" color="$green10" fontWeight="600">
            Unlocked
          </Text>
        </XStack>
      )}

      {!unlocked && (
        <XStack gap="$2" items="center">
          <Target size={16} color="$gray10" />
          <Text fontSize="$2" color="$gray10" fontWeight="600">
            In Progress
          </Text>
        </XStack>
      )}
    </Card>
  );
}
