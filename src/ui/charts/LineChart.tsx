import { YStack, XStack, Text, Card } from 'tamagui';
import Svg, { Polyline, Line, Circle } from 'react-native-svg';
import type { DataPoint } from '../../types/dashboard';

export interface LineChartProps {
  title: string;
  data: DataPoint[];
  color?: string;
  yAxisLabel?: string;
}

/**
 * LineChart - Display trend data over time with a simple line chart
 */
export function LineChart({
  title,
  data,
  color = '#0ea5e9',
}: LineChartProps): React.JSX.Element {
  const width = 300;
  const height = 150;
  const padding = 20;

  // Get min/max values for scaling
  const values = data.map((d) => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue || 1;

  // Create points for the line
  const points = data
    .map((point, index) => {
      const x = padding + (index / (data.length - 1)) * (width - padding * 2);
      const y = height - padding - ((point.value - minValue) / range) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <Card p="$5" gap="$3" borderRadius="$6">
      <Text fontSize="$4" fontWeight="600" color="$color">
        {title}
      </Text>

      <YStack>
        <Svg width={width} height={height}>
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => {
            const y = padding + (i * (height - padding * 2)) / 4;
            return (
              <Line
                key={i}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="#e5e5e5"
                strokeWidth="1"
              />
            );
          })}

          {/* Line */}
          <Polyline
            points={points}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {data.map((point, index) => {
            const x = padding + (index / (data.length - 1)) * (width - padding * 2);
            const y = height - padding - ((point.value - minValue) / range) * (height - padding * 2);
            return (
              <Circle key={index} cx={x} cy={y} r="4" fill={color} />
            );
          })}
        </Svg>

        {/* Stats below chart */}
        <XStack justifyContent="space-between" mt="$2">
          <Text fontSize="$2" color="$color" opacity={0.6}>
            Min: {minValue}
          </Text>
          <Text fontSize="$2" color="$color" opacity={0.6}>
            Max: {maxValue}
          </Text>
          <Text fontSize="$2" color="$color" opacity={0.6}>
            Avg: {Math.round(values.reduce((a, b) => a + b, 0) / values.length)}
          </Text>
        </XStack>
      </YStack>
    </Card>
  );
}
