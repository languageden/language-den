import { YStack, Text, Card, XStack } from 'tamagui';
import { Clock } from '@tamagui/lucide-icons';
import { BarChart } from '../charts/BarChart';
import type { DataPoint } from '../../types/dashboard';
import { CardHeader } from '../CardHeader';

/**
 * Props for StudySummaryCard component
 */
export interface StudySummaryCardProps {
  /** Study time today in minutes */
  todayMinutes: number;
  /** Study time this week in minutes */
  weekMinutes: number;
  /** Study time this month in minutes */
  monthMinutes: number;
  /** Daily study time data for chart */
  dailyData: DataPoint[];
}

/**
 * StudySummaryCard - Enhanced card showing study time metrics with trend chart
 *
 * Combines multiple study time metrics into one comprehensive card with:
 * - Today, this week, this month study time
 * - Mini bar chart showing daily study pattern
 * - Visual indicators for progress
 * - Compact yet informative layout
 *
 * @example
 * <StudySummaryCard
 *   todayMinutes={45}
 *   weekMinutes={312}
 *   monthMinutes={1248}
 *   dailyData={dailyStudyTime}
 * />
 */
export function StudySummaryCard({
  todayMinutes,
  weekMinutes,
  monthMinutes,
  dailyData,
}: StudySummaryCardProps): React.JSX.Element {
  // Format minutes to hours and minutes
  const formatMinutes = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <Card p="$5" gap="$4" borderRadius="$6">
      <CardHeader title="Study Time" icon={<Clock size={28} />} />

      {/* Time Metrics */}
      <YStack gap="$3">
        <XStack justify="space-between" items="center">
          <Text fontSize="$2" color="$color" opacity={0.7}>
            Today
          </Text>
          <Text fontSize="$3" fontWeight="600" color="$color">
            {formatMinutes(todayMinutes)}
          </Text>
        </XStack>

        <XStack justify="space-between" items="center">
          <Text fontSize="$2" color="$color" opacity={0.7}>
            This Week
          </Text>
          <Text fontSize="$3" fontWeight="600" color="$color">
            {formatMinutes(weekMinutes)}
          </Text>
        </XStack>

        <XStack justify="space-between" items="center">
          <Text fontSize="$2" color="$color" opacity={0.7}>
            This Month
          </Text>
          <Text fontSize="$3" fontWeight="600" color="$color">
            {formatMinutes(monthMinutes)}
          </Text>
        </XStack>
      </YStack>

      {/* Mini Chart */}
      <YStack gap="$2">
        <BarChart
          data={dailyData.slice(-7)} // Last 7 days
          color="#0ea5e9"
        />
      </YStack>
    </Card>
  );
}
