import { YStack, Text, Card } from 'tamagui';
import Svg, { Circle } from 'react-native-svg';
import { CardHeader } from '../CardHeader';
import { TrendingUp } from '@tamagui/lucide-icons';

export interface ProgressRingCardsProps {
  title: string;
  current: number;
  target: number;
  unit: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

/**
 * ProgressRingCards - Circular progress indicator
 */
export function ProgressRingCards({
  title,
  current,
  target,
  unit,
  size = 120,
  strokeWidth = 12,
  color = '#0ea5e9',
}: ProgressRingCardsProps): React.JSX.Element {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = Math.min(current / target, 1);
  const strokeDashoffset = circumference - progress * circumference;
  const percentage = Math.round((current / target) * 100);

  return (
    <Card p="$5" gap="$4" borderRadius="$6">
      <CardHeader title={title} icon={<TrendingUp size={28} />} />

      <YStack position="relative" items="center" justify="center">
        <Svg width={size} height={size}>
          {/* Background circle */}
          <Circle
            stroke="#e5e5e5"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <Circle
            stroke={color}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>

        {/* Center text */}
        <YStack position="absolute" items="center" justify="center">
          <Text fontSize="$8" fontWeight="800" color="$color">
            {percentage}%
          </Text>
        </YStack>
      </YStack>

      <YStack items="center" gap="$1">
        <Text fontSize="$6" fontWeight="700" color="$color">
          {current}
        </Text>
        <Text fontSize="$3" color="$color" opacity={0.7}>
          of {target} {unit}
        </Text>
      </YStack>
    </Card>
  );
}
