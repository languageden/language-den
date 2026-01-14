import type {
  DashboardData,
  Activity,
  UserInfo,
  LearningStats,
  ReviewQueue,
  StudyGoal,
  ProgressTrends,
  WeakArea,
  DataPoint,
} from '../types/dashboard';
import { ActivityType } from '../types/dashboard';

/**
 * Mock user information
 */
const mockUser: UserInfo = {
  id: 'mock-user-123',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  avatarUrl: 'https://i.pravatar.cc/150?img=12',
};

/**
 * Mock learning statistics
 */
const mockStats: LearningStats = {
  cardsLearned: 247,
  currentStreak: 12,
  totalReviews: 1834,
  accuracyRate: 0.87,
  vocabularySize: 1456,
  cardsMastered: 189,
  cardsLearning: 58,
  cardsNew: 45,
  studyTimeToday: 45,
  studyTimeWeek: 312,
  studyTimeMonth: 1248,
  wordsLearnedToday: 12,
  wordsLearnedWeek: 87,
  wordsLearnedMonth: 324,
  practiceSessionsCompleted: 156,
  fluencyScore: 68,
  nextReviewIn: 45,
};

/**
 * Mock review queue breakdown
 */
const mockReviewQueue: ReviewQueue = {
  overdue: 5,
  dueToday: 23,
  upcoming: 67,
  total: 95,
};

/**
 * Mock study goals
 */
const mockStudyGoals: StudyGoal[] = [
  {
    id: 'goal-1',
    title: 'Daily Study Time',
    target: 60,
    current: 45,
    unit: 'minutes',
  },
  {
    id: 'goal-2',
    title: 'Weekly Words Learned',
    target: 100,
    current: 87,
    unit: 'words',
  },
  {
    id: 'goal-3',
    title: 'Master 200 Cards',
    target: 200,
    current: 189,
    unit: 'cards',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days from now
  },
];

/**
 * Generate mock progress trends
 */
function generateMockProgressTrends(): ProgressTrends {
  const now = new Date();

  // Generate last 30 days of study time
  const dailyStudyTime: DataPoint[] = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(now);
    date.setDate(date.getDate() - (29 - i));
    const dateStr = date.toISOString().split('T')[0];
    return {
      date: dateStr || '',
      value: Math.floor(Math.random() * 40) + 20, // 20-60 minutes
    };
  });

  // Generate last 30 days of words learned
  const dailyWordsLearned: DataPoint[] = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(now);
    date.setDate(date.getDate() - (29 - i));
    const dateStr = date.toISOString().split('T')[0];
    return {
      date: dateStr || '',
      value: Math.floor(Math.random() * 15) + 5, // 5-20 words
    };
  });

  // Generate last 12 weeks of accuracy
  const weeklyAccuracy: DataPoint[] = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(now);
    date.setDate(date.getDate() - (11 - i) * 7);
    const dateStr = date.toISOString().split('T')[0];
    return {
      date: dateStr || '',
      value: Math.floor(Math.random() * 15) + 80, // 80-95%
    };
  });

  // Generate last 7 days of reviews
  const dailyReviews: DataPoint[] = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(now);
    date.setDate(date.getDate() - (6 - i));
    const dateStr = date.toISOString().split('T')[0];
    return {
      date: dateStr || '',
      value: Math.floor(Math.random() * 40) + 10, // 10-50 reviews
    };
  });

  return {
    dailyStudyTime,
    dailyWordsLearned,
    weeklyAccuracy,
    dailyReviews,
  };
}

/**
 * Mock weak areas
 */
const mockWeakAreas: WeakArea[] = [
  {
    id: 'weak-1',
    category: 'Past Tense Conjugations',
    accuracy: 0.62,
    cardsNeedingReview: 23,
  },
  {
    id: 'weak-2',
    category: 'Food Vocabulary',
    accuracy: 0.71,
    cardsNeedingReview: 15,
  },
  {
    id: 'weak-3',
    category: 'Subjunctive Mood',
    accuracy: 0.58,
    cardsNeedingReview: 31,
  },
];

/**
 * Mock recent activity entries
 */
const mockActivities: Activity[] = [
  {
    id: 'activity-1',
    type: ActivityType.CARD_LEARNED,
    description: 'Learned 5 new vocabulary words',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    metadata: { cardCount: 5, deckName: 'Spanish Basics' },
  },
  {
    id: 'activity-2',
    type: ActivityType.STREAK_MILESTONE,
    description: 'Reached a 12-day learning streak!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    metadata: { streakDays: 12 },
  },
  {
    id: 'activity-3',
    type: ActivityType.PERFECT_REVIEW,
    description: 'Perfect score on 10 card review session',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    metadata: { cardCount: 10, accuracy: 1.0 },
  },
  {
    id: 'activity-4',
    type: ActivityType.DECK_COMPLETED,
    description: 'Completed French Grammar deck',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    metadata: { deckName: 'French Grammar', cardCount: 50 },
  },
  {
    id: 'activity-5',
    type: ActivityType.CARD_LEARNED,
    description: 'Learned 8 new phrases',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    metadata: { cardCount: 8, deckName: 'Travel Phrases' },
  },
];

/**
 * Get mock dashboard data with realistic values
 *
 * @param greeting - Optional custom greeting message
 * @returns Complete DashboardData object with mock values
 *
 * @example
 * ```typescript
 * const dashboardData = getMockDashboardData();
 * console.log(dashboardData.user.name); // "Alex Johnson"
 * console.log(dashboardData.stats.cardsLearned); // 247
 * ```
 *
 * @example
 * ```typescript
 * const dashboardData = getMockDashboardData('Good evening');
 * console.log(dashboardData.greeting); // "Good evening"
 * ```
 */
export function getMockDashboardData(
  greeting = 'Good morning',
): DashboardData {
  return {
    user: mockUser,
    greeting,
    stats: mockStats,
    reviewQueue: mockReviewQueue,
    recentActivity: mockActivities,
    studyGoals: mockStudyGoals,
    progressTrends: generateMockProgressTrends(),
    weakAreas: mockWeakAreas,
    lastUpdated: new Date(),
  };
}

/**
 * Simulate async data fetch with delay
 *
 * @param delayMs - Delay in milliseconds (default: 500ms)
 * @param greeting - Optional custom greeting message
 * @returns Promise resolving to DashboardData
 *
 * @example
 * ```typescript
 * const data = await fetchMockDashboardData(1000);
 * console.log(data.user.name); // "Alex Johnson" (after 1 second)
 * ```
 */
export async function fetchMockDashboardData(
  delayMs = 500,
  greeting?: string,
): Promise<DashboardData> {
  await new Promise((resolve) => setTimeout(resolve, delayMs));
  return getMockDashboardData(greeting);
}
