import { XStack, Text, Card } from 'tamagui';

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
  trend,
}: MetricCardProps): React.JSX.Element {
  return (
    <Card p="$5" gap="$3" borderRadius="$6">
      {/* Label */}
      <Text fontSize="$3" color="$color" opacity={0.7} fontWeight="500" textTransform="uppercase" letterSpacing={0.5}>
        {label}
      </Text>

      {/* Value - Big and Bold */}
      <Text fontSize="$10" fontWeight="800" color="$color" lineHeight="$1">
        {value}
      </Text>

      {/* Trend indicator (if provided) */}
      {trend && (
        <XStack items="center" gap="$1">
          <Text
            fontSize="$3"
            fontWeight="600"
            color={trend.direction === 'up' ? '$green10' : '$red10'}
          >
            {trend.direction === 'up' ? '↑' : '↓'} {trend.value}
          </Text>
        </XStack>
      )}
    </Card>
  );
}
