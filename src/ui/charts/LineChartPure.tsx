import { YStack, XStack, Text } from 'tamagui';
import Svg, { Polyline, Line, Circle } from 'react-native-svg';
import type { DataPoint } from '../../types/dashboard';

export interface LineChartPureProps {
  data: DataPoint[];
  color?: string;
  width?: number;
  height?: number;
  showStats?: boolean;
}

/**
 * LineChartPure - Pure chart component without card wrapper
 */
export function LineChartPure({
  data,
  color = '#0ea5e9',
  width = 300,
  height = 150,
  showStats = true,
}: LineChartPureProps): React.JSX.Element {
  const padding = 20;

  // Get min/max values for scaling
  const values = data.map((d) => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue || 1;

  // Create points for the line
  const points = data
    .map((point, index) => {
      const x = 10 + (index / (data.length - 1)) * (width - padding * 2 - 10);
      const y =
        height -
        padding -
        ((point.value - minValue) / range) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <YStack>
      <Svg width={width} height={height}>
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => {
          const y = padding + (i * (height - padding * 2)) / 4;
          return (
            <Line
              key={i}
              x1={0}
              y1={y}
              x2={width - padding * 2}
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
          const x =
            10 + (index / (data.length - 1)) * (width - padding * 2 - 10);
          const y =
            height -
            padding -
            ((point.value - minValue) / range) * (height - padding * 2);
          return <Circle key={index} cx={x} cy={y} r="4" fill={color} />;
        })}
      </Svg>

      {/* Stats below chart */}
      {showStats && (
        <XStack justify="space-between" mt="$2">
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
      )}
    </YStack>
  );
}
