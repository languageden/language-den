import { XStack, YStack, Text } from 'tamagui';

/**
 * Props for CardHeader component
 */
export interface CardHeaderProps {
  /** The title text for header */
  title: string;
  /** Optional icon element to display alongside the title */
  icon?: React.ReactNode;
}

/**
 * CardHeader - Consistent header component for dashboard cards
 *
 * Provides standardized styling for card headers with:
 * - Title with uppercase transform and consistent styling
 * - Optional icon positioned to the left of title
 * - Same styling as MetricCard header for consistency
 *
 * @example
 * <CardHeader title="Review Queue" icon={<Icon />} />
 *
 * @example
 * <CardHeader title="Areas to Focus On" />
 */
export function CardHeader({
  title,
  icon,
}: CardHeaderProps): React.JSX.Element {
  return (
    <XStack gap="$1" items="center">
      {/* Title */}
      <Text
        fontSize="$3"
        color="$color"
        opacity={0.7}
        fontWeight="500"
        textTransform="uppercase"
        letterSpacing={0.5}
        flex={1}
      >
        {title}
      </Text>

      {/* Icon */}
      {icon && (
        <YStack width="$2" height="$2" items="flex-start" justify="flex-start">
          {icon}
        </YStack>
      )}
    </XStack>
  );
}
