import { YStack, XStack, Text, Card } from 'tamagui';
import { ProgressBar } from '../ProgressBar';
import type { WeakArea } from '../../types/dashboard';

export interface WeakAreasSectionProps {
  weakAreas: WeakArea[];
}

/**
 * WeakAreasSection - Display areas that need more practice
 */
export function WeakAreasSection({
  weakAreas,
}: WeakAreasSectionProps): React.JSX.Element {
  return (
    <Card p="$5" gap="$4" borderRadius="$6">
      <Text fontSize="$4" fontWeight="600" color="$color">
        Areas to Focus On
      </Text>

      <YStack gap="$4">
        {weakAreas.map((area) => (
          <YStack key={area.id} gap="$2">
            <XStack justifyContent="space-between" alignItems="center">
              <Text fontSize="$3" fontWeight="500" color="$color">
                {area.category}
              </Text>
              <Text fontSize="$2" color="$color" opacity={0.7}>
                {Math.round(area.accuracy * 100)}% accuracy
              </Text>
            </XStack>

            <ProgressBar
              progress={area.accuracy * 100}
              height={8}
              color={area.accuracy < 0.7 ? '#ef4444' : '#f59e0b'}
            />

            <Text fontSize="$2" color="$color" opacity={0.6}>
              {area.cardsNeedingReview} cards need review
            </Text>
          </YStack>
        ))}
      </YStack>
    </Card>
  );
}
