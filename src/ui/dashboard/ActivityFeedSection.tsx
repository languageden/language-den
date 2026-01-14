import { YStack, Text } from 'tamagui';
import { Card } from '../Card';
import { ActivityItem } from '../ActivityItem';

/**
 * Activity - Individual activity item data structure
 */
export interface Activity {
  /** Unique identifier for the activity */
  id: string;
  /** Icon element representing the activity type */
  icon: React.ReactNode;
  /** Description of the activity */
  description: string;
  /** Relative timestamp (e.g., "2 hours ago", "Just now") */
  timestamp: string;
}

/**
 * ActivityFeedSection - Dashboard section displaying recent learning activities
 *
 * Displays a chronological list of recent learning achievements and milestones.
 * Shows up to a configurable number of activities with an indicator when more exist.
 *
 * Features:
 * - Scrollable list of recent activities
 * - Configurable maximum visible items (default: 7)
 * - Empty state for users with no activity yet
 * - "See all" link when activities exceed the visible limit
 * - Consistent card styling with other dashboard sections
 *
 * @example
 * <ActivityFeedSection
 *   activities={[
 *     {
 *       id: '1',
 *       icon: <Text>📚</Text>,
 *       description: 'Completed lesson: Basic Greetings',
 *       timestamp: '2 hours ago'
 *     }
 *   ]}
 * />
 *
 * @example
 * // With custom maxVisible
 * <ActivityFeedSection
 *   activities={activities}
 *   maxVisible={5}
 * />
 *
 * @example
 * // Empty state
 * <ActivityFeedSection activities={[]} />
 */
export interface ActivityFeedSectionProps {
  /** List of activities to display */
  activities: Activity[];
  /** Maximum number of visible activities (default: 7) */
  maxVisible?: number;
}

export function ActivityFeedSection({
  activities,
  maxVisible = 7,
}: ActivityFeedSectionProps): React.JSX.Element {
  const visibleActivities = activities.slice(0, maxVisible);

  // Empty state when no activities exist
  if (activities.length === 0) {
    return (
      <Card p="$6" gap="$4">
        <YStack gap="$3" items="center" py="$4">
          <Text fontSize="$8">🌱</Text>
          <YStack width="100%" items="center">
            <Text fontSize="$5" fontWeight="600" color="$color">
              No recent activity yet
            </Text>
          </YStack>
          <YStack width="100%" items="center">
            <Text fontSize="$3" color="$secondary">
              Complete your first review to see your progress here
            </Text>
          </YStack>
        </YStack>
      </Card>
    );
  }

  // Activity list with optional "See all" link
  return (
    <Card p="$6" gap="$4">
      {/* Section Header */}
      <Text fontSize="$5" fontWeight="600" color="$color">
        Recent Activity
      </Text>

      {/* Activity List */}
      <YStack>
        {visibleActivities.map((activity) => (
          <ActivityItem
            key={activity.id}
            icon={activity.icon}
            description={activity.description}
            timestamp={activity.timestamp}
          />
        ))}
      </YStack>

      {/* "See all" link when more activities exist */}
      {activities.length > maxVisible && (
        <YStack width="100%" items="center" pt="$2">
          <Text fontSize="$3" color="$primary" fontWeight="500">
            See all activity →
          </Text>
        </YStack>
      )}
    </Card>
  );
}
