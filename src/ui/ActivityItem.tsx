import { XStack, YStack, Text } from 'tamagui';
import {
  BookOpen,
  Award,
  CheckCircle,
  Zap,
  Calendar,
} from '@tamagui/lucide-icons';
import { ActivityType } from '../types/dashboard';

/**
 * Props for the ActivityItem component
 */
export interface ActivityItemProps {
  /** Icon element representing the activity type */
  icon?: React.ReactNode;
  /** Description of the activity */
  description: string;
  /** Relative timestamp (e.g., "2 hours ago", "Just now") */
  timestamp: string;
  /** Activity type for automatic icon selection */
  activityType?: ActivityType;
}

/**
 * Get icon for activity type
 */
function getActivityIcon(activityType: ActivityType): React.ReactNode {
  const iconProps = { size: 20 };

  switch (activityType) {
    case ActivityType.CARD_LEARNED:
      return <BookOpen {...iconProps} />;
    case ActivityType.STREAK_MILESTONE:
      return <Zap {...iconProps} />;
    case ActivityType.PERFECT_REVIEW:
      return <CheckCircle {...iconProps} />;
    case ActivityType.DECK_COMPLETED:
      return <Award {...iconProps} />;
    default:
      return <Calendar {...iconProps} />;
  }
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
 * - Automatic icon selection based on activity type
 *
 * Used in Activity Feed section of the dashboard to show recent achievements
 * and learning milestones.
 *
 * @example
 * <ActivityItem
 *   activityType={ActivityType.CARD_LEARNED}
 *   description="Completed lesson: Basic Greetings"
 *   timestamp="2 hours ago"
 * />
 *
 * @example
 * <ActivityItem
 *   icon={<CustomIcon />}
 *   description="Earned achievement: Week Streak"
 *   timestamp="Just now"
 * />
 */
export function ActivityItem({
  icon,
  description,
  timestamp,
  activityType,
}: ActivityItemProps): React.JSX.Element {
  const displayIcon =
    icon || (activityType ? getActivityIcon(activityType) : null);

  return (
    <XStack gap="$3" items="center" py="$3">
      {/* Icon container */}
      <YStack width="$10" height="$10" items="center" justify="center">
        {displayIcon}
      </YStack>

      {/* Description and timestamp */}
      <YStack flex={1} gap="$1">
        <Text fontSize="$3" fontWeight="500" color="$color">
          {description}
        </Text>
        <Text fontSize="$2" color="$color" opacity={0.7}>
          {timestamp}
        </Text>
      </YStack>
    </XStack>
  );
}
