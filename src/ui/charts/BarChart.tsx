import { YStack, XStack, Text } from 'tamagui';
import Svg, { Rect } from 'react-native-svg';
import type { DataPoint } from '../../types/dashboard';

export interface BarChartProps {
  data: DataPoint[];
  color?: string;
  width?: number;
  height?: number;
}

/**
 * BarChart - Pure chart component without card wrapper
 */
export function BarChart({
  data,
  color = '#22c55e',
  width = 300,
  height = 150,
}: BarChartProps): React.JSX.Element {
  // Last 7 days only
  const recentData = data.slice(-7);

  const padding = 20;
  const barWidth = (width - padding * 2) / recentData.length - 8;

  // Get max value for scaling
  const maxValue = Math.max(...recentData.map((d) => d.value));

  return (
    <YStack>
      <Svg width={width} height={height}>
        {recentData.map((point, index) => {
          const barHeight = (point.value / maxValue) * (height - padding * 2);
          const x = index * ((width - padding * 2) / recentData.length) + 4;
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
  );
}
