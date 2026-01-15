import { YStack, Text, Card, XStack } from 'tamagui';
import { BookOpen, TrendingUp } from '@tamagui/lucide-icons';
import { LineChart } from '../charts/LineChart';
import type { DataPoint } from '../../types/dashboard';

/**
 * Props for VocabularyProgressCard component
 */
export interface VocabularyProgressCardProps {
  /** Words learned today */
  todayWords: number;
  /** Words learned this week */
  weekWords: number;
  /** Words learned this month */
  monthWords: number;
  /** Daily words learned data for chart */
  dailyData: DataPoint[];
  /** Optional weekly goal */
  weeklyGoal?: number;
}

/**
 * VocabularyProgressCard - Enhanced card showing vocabulary learning progress
 *
 * Combines vocabulary metrics with trend visualization and goal tracking:
 * - Today, this week, this month words learned
 * - Mini line chart showing learning pattern
 * - Progress towards weekly goal
 * - Visual indicators for achievement
 *
 * @example
 * <VocabularyProgressCard
 *   todayWords={12}
 *   weekWords={87}
 *   monthWords={324}
 *   dailyData={dailyWordsLearned}
 *   weeklyGoal={100}
 * />
 */
export function VocabularyProgressCard({
  todayWords,
  weekWords,
  monthWords,
  dailyData,
  weeklyGoal,
}: VocabularyProgressCardProps): React.JSX.Element {
  // Calculate progress towards weekly goal
  const weeklyProgress = weeklyGoal ? (weekWords / weeklyGoal) * 100 : 0;

  return (
    <Card p="$5" gap="$4" borderRadius="$6">
      {/* Header */}
      <YStack gap="$2">
        <XStack gap="$2" items="center">
          <BookOpen size={20} />
          <Text fontSize="$4" fontWeight="600" color="$color">
            Vocabulary Progress
          </Text>
        </XStack>
      </YStack>

      {/* Words Metrics */}
      <YStack gap="$3">
        <XStack justify="space-between" items="center">
          <Text fontSize="$2" color="$color" opacity={0.7}>
            Today
          </Text>
          <Text fontSize="$3" fontWeight="600" color="$color">
            {todayWords} words
          </Text>
        </XStack>

        <XStack justify="space-between" items="center">
          <Text fontSize="$2" color="$color" opacity={0.7}>
            This Week
          </Text>
          <Text fontSize="$3" fontWeight="600" color="$color">
            {weekWords} words
          </Text>
        </XStack>

        {weeklyGoal && (
          <XStack justify="space-between" items="center">
            <Text fontSize="$2" color="$color" opacity={0.7}>
              Weekly Goal
            </Text>
            <Text fontSize="$3" fontWeight="600" color="$color">
              {Math.round(weeklyProgress)}%
            </Text>
          </XStack>
        )}

        <XStack justify="space-between" items="center">
          <Text fontSize="$2" color="$color" opacity={0.7}>
            This Month
          </Text>
          <Text fontSize="$3" fontWeight="600" color="$color">
            {monthWords} words
          </Text>
        </XStack>
      </YStack>

      {/* Mini Chart */}
      <YStack gap="$2">
        <Text fontSize="$2" color="$color" opacity={0.7}>
          Last 7 Days
        </Text>
        <LineChart
          title=""
          data={dailyData.slice(-7)} // Last 7 days
          color="#22c55e"
        />
      </YStack>
    </Card>
  );
}
