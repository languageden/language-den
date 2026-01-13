import type {
  DashboardData,
  Activity,
  UserInfo,
  LearningStats,
  ReviewQueue,
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
