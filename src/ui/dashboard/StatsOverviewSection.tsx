import { XStack, YStack, Text } from 'tamagui';
import { MetricCard } from '../MetricCard';
import type { LearningStats } from '../../types/dashboard';

/**
 * StatsOverviewSection - Responsive grid displaying key learning metrics
 *
 * Displays four key metrics in a 2x2 grid layout:
 * - Cards Learned: Total number of cards the user has learned
 * - Current Streak: Consecutive days of activity
 * - Total Reviews: Number of review sessions completed
 * - Accuracy Rate: Percentage of correct answers
 *
 * @example
 * <StatsOverviewSection
 *   stats={{
 *     cardsLearned: 142,
 *     currentStreak: 5,
 *     totalReviews: 328,
 *     accuracyRate: 87
 *   }}
 * />
 */

export interface StatsOverviewSectionProps {
  /** Learning statistics to display */
  stats: LearningStats;
}

export function StatsOverviewSection({
  stats,
}: StatsOverviewSectionProps): React.JSX.Element {
  return (
    <YStack gap="$5">
      {/* Section Header */}
      <Text fontSize="$5" fontWeight="600" color="$color">
        Your Progress
      </Text>

      {/* Responsive 2x2 Grid */}
      <YStack gap="$4">
        {/* First Row */}
        <XStack gap="$4">
          <YStack flex={1}>
            <MetricCard
              label="Cards Learned"
              value={stats.cardsLearned.toString()}
              icon={<Text fontSize="$5">📚</Text>}
            />
          </YStack>
          <YStack flex={1}>
            <MetricCard
              label="Current Streak"
              value={stats.currentStreak.toString()}
              icon={<Text fontSize="$5">🔥</Text>}
            />
          </YStack>
        </XStack>

        {/* Second Row */}
        <XStack gap="$4">
          <YStack flex={1}>
            <MetricCard
              label="Total Reviews"
              value={stats.totalReviews.toString()}
              icon={<Text fontSize="$5">✅</Text>}
            />
          </YStack>
          <YStack flex={1}>
            <MetricCard
              label="Accuracy Rate"
              value={`${stats.accuracyRate.toString()}%`}
              icon={<Text fontSize="$5">🎯</Text>}
            />
          </YStack>
        </XStack>
      </YStack>
    </YStack>
  );
}
