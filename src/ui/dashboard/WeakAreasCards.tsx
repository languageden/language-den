import { YStack, XStack, Text, Card } from 'tamagui';
import { ProgressBar } from '../ProgressBar';
import type { WeakArea } from '../../types/dashboard';
import { CardHeader } from '../CardHeader';
import { Target } from '@tamagui/lucide-icons';

export interface WeakAreasCardsProps {
  weakAreas: WeakArea[];
}

/**
 * WeakAreasCards - Display areas that need more practice
 */
export function WeakAreasCards({
  weakAreas,
}: WeakAreasCardsProps): React.JSX.Element {
  return (
    <Card p="$5" gap="$4" borderRadius="$6">
      <CardHeader title="Areas to Focus On" icon={<Target size={20} />} />

      <YStack gap="$4">
        {weakAreas.map((area) => (
          <YStack key={area.id} gap="$2">
            <XStack justify="space-between" items="center">
              <Text fontSize="$3" fontWeight="500" color="$color">
                {area.category}
              </Text>
              <Text fontSize="$2" color="$color" opacity={0.7}>
                {Math.round(area.accuracy * 100)}% accuracy
              </Text>
            </XStack>

            <ProgressBar progress={area.accuracy * 100} height={8} />

            <Text fontSize="$2" color="$color" opacity={0.6}>
              {area.cardsNeedingReview} cards need review
            </Text>
          </YStack>
        ))}
      </YStack>
    </Card>
  );
}
