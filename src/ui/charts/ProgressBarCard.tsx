import { YStack, XStack, Text, Card } from 'tamagui';
import { ProgressBar } from '../ProgressBar';

export interface ProgressBarCardProps {
  title: string;
  current: number;
  target: number;
  unit: string;
  showPercentage?: boolean;
}

/**
 * ProgressBarCard - Card with a horizontal progress bar
 */
export function ProgressBarCard({
  title,
  current,
  target,
  unit,
  showPercentage = true,
}: ProgressBarCardProps): React.JSX.Element {
  const progress = Math.min((current / target) * 100, 100);
  const percentage = Math.round(progress);

  return (
    <Card p="$5" gap="$4" borderRadius="$6">
      <YStack gap="$2">
        <XStack justifyContent="space-between" alignItems="center">
          <Text fontSize="$4" fontWeight="600" color="$color">
            {title}
          </Text>
          {showPercentage && (
            <Text fontSize="$3" fontWeight="600" color="$color">
              {percentage}%
            </Text>
          )}
        </XStack>

        <ProgressBar progress={progress} height={12} />

        <XStack justifyContent="space-between" alignItems="center">
          <Text fontSize="$2" color="$color" opacity={0.7}>
            {current} / {target} {unit}
          </Text>
          {target - current > 0 && (
            <Text fontSize="$2" color="$color" opacity={0.7}>
              {target - current} remaining
            </Text>
          )}
        </XStack>
      </YStack>
    </Card>
  );
}
