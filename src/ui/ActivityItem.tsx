import { XStack, YStack, Text } from 'tamagui';

/**
 * Props for the ActivityItem component
 */
export interface ActivityItemProps {
  /** Icon element representing the activity type */
  icon: React.ReactNode;
  /** Description of the activity */
  description: string;
  /** Relative timestamp (e.g., "2 hours ago", "Just now") */
  timestamp: string;
}

/**
 * ActivityItem component - Displays a single activity feed item
 *
 * The ActivityItem provides a consistent way to display user activities with:
 * - Icon for visual identification of activity type
 * - Description text explaining what happened
 * - Relative timestamp showing when the activity occurred
 * - Horizontal layout with proper spacing
 * - Theme-aware styling that adapts to light/dark mode
 *
 * Used in the Activity Feed section of the dashboard to show recent achievements
 * and learning milestones.
 *
 * @example
 * <ActivityItem
 *   icon={<Icon name="check-circle" />}
 *   description="Completed lesson: Basic Greetings"
 *   timestamp="2 hours ago"
 * />
 *
 * @example
 * <ActivityItem
 *   icon={<Icon name="star" />}
 *   description="Earned achievement: Week Streak"
 *   timestamp="Just now"
 * />
 */
export function ActivityItem({
  icon,
  description,
  timestamp,
}: ActivityItemProps): React.JSX.Element {
  return (
    <XStack gap="$3" items="center" py="$3">
      {/* Icon container */}
      <YStack width="$10" height="$10" items="center" justify="center">
        {icon}
      </YStack>

      {/* Description and timestamp */}
      <YStack flex={1} gap="$1">
        <Text fontSize="$3" fontWeight="500" color="$color">
          {description}
        </Text>
        <Text fontSize="$2" color="$secondary">
          {timestamp}
        </Text>
      </YStack>
    </XStack>
  );
}
