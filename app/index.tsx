import { ScrollView, YStack, Text, H1 } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeroSection } from '../src/ui/dashboard/HeroSection';
import { StatsOverviewSection } from '../src/ui/dashboard/StatsOverviewSection';
import { ReviewQueueSection } from '../src/ui/dashboard/ReviewQueueSection';
import { ActivityFeedSection } from '../src/ui/dashboard/ActivityFeedSection';
import type { Activity as ActivityFeedActivity } from '../src/ui/dashboard/ActivityFeedSection';
import { useDashboardData } from '../src/hooks/useDashboardData';
import { getTimeBasedGreeting } from '../src/domain/get-time-based-greeting';
import { ActivityType } from '../src/types/dashboard';

/**
 * Dashboard screen - Main entry point for the Language Den app
 *
 * Displays a comprehensive overview of the user's learning progress including:
 * - Personalized greeting with current streak
 * - Learning statistics overview (cards learned, streak, reviews, accuracy)
 * - Review queue status with breakdown
 * - Recent activity feed
 *
 * Features:
 * - Loading state while fetching data
 * - Error state with user-friendly message
 * - Scrollable content with safe area insets
 * - Responsive layout that works on all platforms (iOS, Android, Web)
 */
export default function DashboardScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const { data, isLoading, error } = useDashboardData();

  // Loading state
  if (isLoading) {
    return (
      <YStack
        flex={1}
        items="center"
        justify="center"
        bg="$background"
        pt={insets.top}
        pb={insets.bottom}
      >
        <Text fontSize="$5" color="$secondary">
          Loading your dashboard...
        </Text>
      </YStack>
    );
  }

  // Error state
  if (error) {
    return (
      <YStack
        flex={1}
        items="center"
        justify="center"
        bg="$background"
        pt={insets.top}
        pb={insets.bottom}
        gap="$3"
        px="$6"
      >
        <Text fontSize="$8">⚠️</Text>
        <H1 fontSize="$6" fontWeight="700" color="$color">
          Oops! Something went wrong
        </H1>
        <YStack width="100%" items="center">
          <Text fontSize="$3" color="$secondary">
            {error.message}
          </Text>
        </YStack>
      </YStack>
    );
  }

  // Data should be present if not loading and no error
  if (!data) {
    return (
      <YStack
        flex={1}
        items="center"
        justify="center"
        bg="$background"
        pt={insets.top}
        pb={insets.bottom}
      >
        <Text fontSize="$5" color="$secondary">
          No data available
        </Text>
      </YStack>
    );
  }

  // Get time-based greeting
  const timeGreeting = getTimeBasedGreeting();

  // Map activity type to icon
  const getActivityIcon = (type: ActivityType): React.ReactNode => {
    switch (type) {
      case ActivityType.CARD_LEARNED:
        return <Text fontSize="$5">📚</Text>;
      case ActivityType.STREAK_MILESTONE:
        return <Text fontSize="$5">🔥</Text>;
      case ActivityType.DECK_COMPLETED:
        return <Text fontSize="$5">🎉</Text>;
      case ActivityType.PERFECT_REVIEW:
        return <Text fontSize="$5">⭐</Text>;
      default:
        return <Text fontSize="$5">✨</Text>;
    }
  };

  // Format timestamp to relative time
  const formatRelativeTime = (timestamp: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) {
      return 'Just now';
    } else if (diffMinutes < 60) {
      return `${diffMinutes.toString()} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffHours < 24) {
      return `${diffHours.toString()} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      return `${diffDays.toString()} ${diffDays === 1 ? 'day' : 'days'} ago`;
    }
  };

  // Convert dashboard activities to activity feed format
  const activities: ActivityFeedActivity[] = data.recentActivity.map((activity) => ({
    id: activity.id,
    icon: getActivityIcon(activity.type),
    description: activity.description,
    timestamp: formatRelativeTime(activity.timestamp),
  }));

  // Calculate review queue for ReviewQueueSection
  const reviewQueue = {
    newCards: Math.floor(data.reviewQueue.dueToday * 0.3), // Approximate breakdown
    learningCards: Math.floor(data.reviewQueue.dueToday * 0.4),
    reviewCards: Math.floor(data.reviewQueue.dueToday * 0.3),
  };

  // Handle navigation actions (placeholder for now)
  const handleStartReview = (): void => {
    // TODO: Navigate to review screen when implemented
  };

  // Main dashboard content
  return (
    <YStack flex={1} bg="$background">
      <ScrollView
        pt={insets.top + 16}
        pb={insets.bottom + 16}
        px={16}
      >
        <YStack gap="$4">
          {/* Hero Section with greeting and streak */}
          <HeroSection
            userName={data.user.name}
            greeting={timeGreeting.greeting}
            greetingIcon={timeGreeting.icon}
            streakCount={data.stats.currentStreak}
            onStartReview={handleStartReview}
          />

          {/* Stats Overview Grid */}
          <StatsOverviewSection
            stats={{
              ...data.stats,
              accuracyRate: Math.round(data.stats.accuracyRate * 100),
            }}
          />

          {/* Review Queue Status */}
          <ReviewQueueSection queue={reviewQueue} onStartReview={handleStartReview} />

          {/* Recent Activity Feed */}
          <ActivityFeedSection activities={activities} />
        </YStack>
      </ScrollView>
    </YStack>
  );
}
