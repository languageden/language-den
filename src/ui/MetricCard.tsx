import { XStack, YStack, Text, Card } from 'tamagui';

/**
 * Props for the MetricCard component
 */
export interface MetricCardProps {
  /** The label describing the metric (e.g., "Total Cards") */
  label: string;
  /** The metric value to display prominently */
  value: string | number;
  /** Optional icon element to display alongside the value */
  icon?: React.ReactNode;
  /** Optional trend indicator showing direction and change */
  trend?: {
    direction: 'up' | 'down';
    value: string;
  };
}

/**
 * MetricCard component - A specialized card for displaying dashboard metrics
 *
 * The MetricCard provides a consistent, scannable way to display key metrics with:
 * - Large, prominent value display
 * - Optional icon for visual identification
 * - Optional trend indicator with up/down arrows
 * - Semantic label for accessibility
 * - Theme-aware styling that adapts to light/dark mode
 *
 * Built on top of the Card component for consistent elevation and styling.
 *
 * @example
 * <MetricCard
 *   label="Total Cards"
 *   value={42}
 *   icon={<Icon name="cards" />}
 * />
 *
 * @example
 * <MetricCard
 *   label="Completion Rate"
 *   value="87%"
 *   trend={{ direction: "up", value: "+5%" }}
 * />
 */
export function MetricCard({
  label,
  value,
  icon,
  trend,
}: MetricCardProps): React.JSX.Element {
  return (
    <Card p="$4" gap="$3" borderRadius="$6">
      <XStack gap="$3" items="center" justify="space-between">
        {/* Icon container (if icon provided) */}
        {icon && (
          <YStack
            width="$10"
            height="$10"
            items="center"
            justify="center"
            bg="$primary"
          >
            {icon}
          </YStack>
        )}

        {/* Value */}
        <YStack flex={1}>
          <Text fontSize="$8" fontWeight="700" color="$color">
            {value}
          </Text>
        </YStack>
      </XStack>

      {/* Label */}
      <YStack>
        <Text fontSize="$2" color="$secondary" fontWeight="500">
          {label}
        </Text>
      </YStack>

      {/* Trend indicator (if provided) */}
      {trend && (
        <XStack items="center" gap="$1">
          <Text
            fontSize="$2"
            fontWeight="600"
            color={trend.direction === 'up' ? '$success' : '$error'}
          >
            {trend.direction === 'up' ? '↑' : '↓'} {trend.value}
          </Text>
        </XStack>
      )}
    </Card>
  );
}
