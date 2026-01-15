import { ScrollView, YStack, XStack, Text, H1 } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeroCards } from '../src/ui/dashboard/HeroCards';
import { ReviewQueueCards } from '../src/ui/dashboard/ReviewQueueCards';
import { ActivityFeedCards } from '../src/ui/dashboard/ActivityFeedCards';
import { WeakAreasCards } from '../src/ui/dashboard/WeakAreasCards';
import { MetricCard } from '../src/ui/MetricCard';
import { StudySummaryCard } from '../src/ui/dashboard/StudySummaryCard';
import { VocabularyProgressCard } from '../src/ui/dashboard/VocabularyProgressCard';
import { AchievementCard } from '../src/ui/dashboard/AchievementCard';
import { BarChartCards } from '../src/ui/charts/BarChartCards';
import { ProgressRingCards } from '../src/ui/charts/ProgressRingCards';
import { ProgressBarCard } from '../src/ui/charts/ProgressBarCard';
import {
  BookOpen,
  Brain,
  Target,
  Zap,
  Trophy,
  Clock,
  TrendingUp,
} from '@tamagui/lucide-icons';
import type { Activity as ActivityFeedActivity } from '../src/ui/dashboard/ActivityFeedCards';
import { useDashboardData } from '../src/hooks/useDashboardData';
import { getTimeBasedGreeting } from '../src/domain/get-time-based-greeting';

/**
 * Dashboard screen - Main entry point for the Language Den app
 *
 * Enhanced dashboard with professional layout featuring:
 * - Personalized greeting with current streak
 * - Rich visual hierarchy with varied card types
 * - Integrated charts and progress indicators
 * - Achievement cards with progress tracking
 * - Improved spacing and visual balance
 *
 * Features:
 * - Loading state while fetching data
 * - Error state with user-friendly message
 * - Scrollable content with safe area insets
 * - Responsive layout that works on all platforms (iOS, Android, Web)
 * - Enhanced card variety with icons and better visual hierarchy
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
        <Text fontSize="$5" color="$color" opacity={0.7}>
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
          <Text fontSize="$3" color="$color" opacity={0.7}>
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
        <Text fontSize="$5" color="$color" opacity={0.7}>
          No data available
        </Text>
      </YStack>
    );
  }

  // Get time-based greeting
  const timeGreeting = getTimeBasedGreeting();

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
  const activities: ActivityFeedActivity[] = data.recentActivity.map(
    (activity) => ({
      id: activity.id,
      icon: null,
      description: activity.description,
      timestamp: formatRelativeTime(activity.timestamp),
      activityType: activity.type,
    })
  );

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
      <ScrollView pt={insets.top + 16} pb={insets.bottom + 16}>
        {/* Content wrapper with better layout */}
        <YStack width="100%" px="$4" gap="$6">
          {/* Hero Section */}
          <HeroCards
            userName={data.user.name}
            greeting={timeGreeting.greeting}
            streakCount={data.stats.currentStreak}
            onStartReview={handleStartReview}
          />

          {/* 4-column grid layout */}
          <XStack gap="$4" flexWrap="wrap">
            {/* Column 1 - Key Stats */}
            <YStack width={340} gap="$5" p="$4">
              <ReviewQueueCards
                queue={reviewQueue}
                onStartReview={handleStartReview}
              />

              {/* Enhanced Metrics with better spacing */}
              <MetricCard
                label="Fluency Score"
                value={data.stats.fluencyScore.toString()}
                icon={<Target size={28} />}
                trend={{ direction: 'up', value: '+3 pts' }}
              />

              <MetricCard
                label="Vocabulary Size"
                value={data.stats.vocabularySize.toLocaleString()}
                icon={<BookOpen size={28} />}
              />

              <AchievementCard
                achievement={{
                  title: '30-Day Streak',
                  description: 'Incredible consistency! Keep it going!',
                  icon: <Trophy size={32} />,
                  unlocked: true,
                }}
              />

              <MetricCard
                label="Total Reviews"
                value={data.stats.totalReviews.toLocaleString()}
                icon={<Zap size={28} />}
                trend={{ direction: 'up', value: '+127 today' }}
              />
            </YStack>

            {/* Column 2 - Study Time */}
            <YStack width={340} gap="$5" p="$4">
              <StudySummaryCard
                todayMinutes={data.stats.studyTimeToday}
                weekMinutes={data.stats.studyTimeWeek}
                monthMinutes={data.stats.studyTimeMonth}
                dailyData={data.progressTrends.dailyStudyTime}
              />

              {data.studyGoals[0] && (
                <ProgressRingCards
                  title={data.studyGoals[0].title}
                  current={data.studyGoals[0].current}
                  target={data.studyGoals[0].target}
                  unit={data.studyGoals[0].unit}
                />
              )}

              <BarChartCards
                title="Daily Reviews (Last 7 Days)"
                data={data.progressTrends.dailyReviews}
              />
            </YStack>

            {/* Column 3 - Learning Progress */}
            <YStack width={340} gap="$5" p="$4">
              <VocabularyProgressCard
                todayWords={data.stats.wordsLearnedToday}
                weekWords={data.stats.wordsLearnedWeek}
                monthWords={data.stats.wordsLearnedMonth}
                dailyData={data.progressTrends.dailyWordsLearned}
                weeklyGoal={100}
              />

              <MetricCard
                label="Practice Sessions"
                value={data.stats.practiceSessionsCompleted.toString()}
                icon={<Brain size={28} />}
              />

              <MetricCard
                label="Cards Mastered"
                value={data.stats.cardsMastered.toString()}
                icon={<Trophy size={28} />}
                trend={{ direction: 'up', value: '+12' }}
              />

              <MetricCard
                label="Cards Learning"
                value={data.stats.cardsLearning.toString()}
                icon={<Clock size={28} />}
              />

              <MetricCard
                label="Accuracy Rate"
                value={`${Math.round(data.stats.accuracyRate * 100)}%`}
                icon={<TrendingUp size={28} />}
                trend={{ direction: 'up', value: '+2%' }}
              />
            </YStack>

            {/* Column 4 - Queue & Activity */}
            <YStack width={340} gap="$5" p="$4">
              {data.studyGoals[1] && (
                <ProgressBarCard
                  title={data.studyGoals[1].title}
                  current={data.studyGoals[1].current}
                  target={data.studyGoals[1].target}
                  unit={data.studyGoals[1].unit}
                />
              )}

              <WeakAreasCards weakAreas={data.weakAreas} />

              <ActivityFeedCards activities={activities} />
            </YStack>
          </XStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
