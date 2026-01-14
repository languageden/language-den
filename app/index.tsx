import { ScrollView, YStack, XStack, Text, H1 } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeroSection } from '../src/ui/dashboard/HeroSection';
import { ReviewQueueSection } from '../src/ui/dashboard/ReviewQueueSection';
import { ActivityFeedSection } from '../src/ui/dashboard/ActivityFeedSection';
import { WeakAreasSection } from '../src/ui/dashboard/WeakAreasSection';
import { MetricCard } from '../src/ui/MetricCard';
import { LineChart } from '../src/ui/charts/LineChart';
import { BarChart } from '../src/ui/charts/BarChart';
import { ProgressRing } from '../src/ui/charts/ProgressRing';
import { ProgressBarCard } from '../src/ui/charts/ProgressBarCard';
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
  const getActivityIcon = (_type: ActivityType): React.ReactNode => {
    // No icons for now - will be replaced with proper visual indicators
    return null;
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
      >
        {/* Centered content wrapper */}
        <YStack width="100%" maxWidth={1600} alignSelf="center" px="$4">
          {/* 4-column grid layout */}
          <XStack
            gap="$4"
            alignItems="flex-start"
            flexWrap="wrap"
          >
            {/* Column 1 - Welcome & Key Stats */}
            <YStack
              flexBasis="23%"
              flexGrow={1}
              flexShrink={1}
              minWidth={280}
              gap="$4"
            >
              <HeroSection
                userName={data.user.name}
                greeting={timeGreeting.greeting}
                streakCount={data.stats.currentStreak}
                onStartReview={handleStartReview}
              />

              <MetricCard
                label="Fluency Score"
                value={data.stats.fluencyScore.toString()}
                trend={{ direction: 'up', value: '+3 pts' }}
              />

              <MetricCard
                label="Vocabulary Size"
                value={data.stats.vocabularySize.toLocaleString()}
              />

              <MetricCard
                label="Next Review"
                value={`${data.stats.nextReviewIn}m`}
              />
            </YStack>

            {/* Column 2 - Study Time & Progress */}
            <YStack
              flexBasis="23%"
              flexGrow={1}
              flexShrink={1}
              minWidth={280}
              gap="$4"
            >
              <MetricCard
                label="Study Time Today"
                value={`${data.stats.studyTimeToday}m`}
              />

              <MetricCard
                label="Study Time This Week"
                value={`${Math.round(data.stats.studyTimeWeek / 60)}h ${data.stats.studyTimeWeek % 60}m`}
              />

              <MetricCard
                label="Study Time This Month"
                value={`${Math.round(data.stats.studyTimeMonth / 60)}h`}
              />

              {data.studyGoals[0] && (
                <ProgressRing
                  title={data.studyGoals[0].title}
                  current={data.studyGoals[0].current}
                  target={data.studyGoals[0].target}
                  unit={data.studyGoals[0].unit}
                />
              )}

              <BarChart
                title="Daily Reviews (Last 7 Days)"
                data={data.progressTrends.dailyReviews}
                yAxisLabel="Reviews"
              />
            </YStack>

            {/* Column 3 - Learning Stats & Cards */}
            <YStack
              flexBasis="23%"
              flexGrow={1}
              flexShrink={1}
              minWidth={280}
              gap="$4"
            >
              <MetricCard
                label="Words Learned Today"
                value={data.stats.wordsLearnedToday.toString()}
              />

              <MetricCard
                label="Words This Week"
                value={data.stats.wordsLearnedWeek.toString()}
              />

              <MetricCard
                label="Words This Month"
                value={data.stats.wordsLearnedMonth.toString()}
              />

              <MetricCard
                label="Practice Sessions"
                value={data.stats.practiceSessionsCompleted.toString()}
              />

              <MetricCard
                label="Cards Mastered"
                value={data.stats.cardsMastered.toString()}
              />

              <MetricCard
                label="Cards Learning"
                value={data.stats.cardsLearning.toString()}
              />

              <MetricCard
                label="New Cards"
                value={data.stats.cardsNew.toString()}
              />
            </YStack>

            {/* Column 4 - Charts & Activity */}
            <YStack
              flexBasis="23%"
              flexGrow={1}
              flexShrink={1}
              minWidth={280}
              gap="$4"
            >
              <MetricCard
                label="Total Reviews"
                value={data.stats.totalReviews.toLocaleString()}
              />

              <MetricCard
                label="Accuracy Rate"
                value={`${Math.round(data.stats.accuracyRate * 100)}%`}
                trend={{ direction: 'up', value: '+2%' }}
              />

              {data.studyGoals[1] && (
                <ProgressBarCard
                  title={data.studyGoals[1].title}
                  current={data.studyGoals[1].current}
                  target={data.studyGoals[1].target}
                  unit={data.studyGoals[1].unit}
                />
              )}

              <ReviewQueueSection queue={reviewQueue} onStartReview={handleStartReview} />

              <WeakAreasSection weakAreas={data.weakAreas} />

              <ActivityFeedSection activities={activities} />
            </YStack>
          </XStack>

          {/* Full-width charts section */}
          <YStack gap="$4" mt="$4">
            <XStack gap="$4" flexWrap="wrap">
              <YStack flex={1} minWidth={300}>
                <LineChart
                  title="Study Time Trend (Last 30 Days)"
                  data={data.progressTrends.dailyStudyTime}
                  yAxisLabel="Minutes"
                  color="#0ea5e9"
                />
              </YStack>
              <YStack flex={1} minWidth={300}>
                <LineChart
                  title="Words Learned (Last 30 Days)"
                  data={data.progressTrends.dailyWordsLearned}
                  yAxisLabel="Words"
                  color="#22c55e"
                />
              </YStack>
            </XStack>
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
