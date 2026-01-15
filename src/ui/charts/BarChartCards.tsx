import { YStack, XStack, Text, Card } from 'tamagui';
import Svg, { Rect } from 'react-native-svg';
import type { DataPoint } from '../../types/dashboard';

export interface BarChartCardsProps {
  title: string;
  data: DataPoint[];
  color?: string;
  yAxisLabel?: string;
}

/**
 * BarChartCards - Display data as vertical bars
 */
export function BarChartCards({
  title,
  data,
  color = '#22c55e',
}: BarChartCardsProps): React.JSX.Element {
  // Last 7 days only
  const recentData = data.slice(-7);

  const width = 300;
  const height = 150;
  const padding = 20;
  const barWidth = (width - padding * 2) / recentData.length - 8;

  // Get max value for scaling
  const maxValue = Math.max(...recentData.map((d) => d.value));

  return (
    <Card p="$5" gap="$3" borderRadius="$6">
      <Text fontSize="$4" fontWeight="600" color="$color">
        {title}
      </Text>

      <YStack>
        <Svg width={width} height={height}>
          {recentData.map((point, index) => {
            const barHeight = (point.value / maxValue) * (height - padding * 2);
            const x =
              padding + index * ((width - padding * 2) / recentData.length) + 4;
            const y = height - padding - barHeight;

            return (
              <Rect
                key={index}
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={color}
                rx="4"
              />
            );
          })}
        </Svg>

        {/* Day labels */}
        <XStack justify="space-around" mt="$2">
          {recentData.map((point, index) => {
            const date = new Date(point.date);
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            return (
              <Text key={index} fontSize="$1" color="$color" opacity={0.6}>
                {days[date.getDay()]}
              </Text>
            );
          })}
        </XStack>
      </YStack>
    </Card>
  );
}
