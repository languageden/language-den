/**
 * TypeScript interfaces for dashboard data structures
 */

/**
 * User information displayed in dashboard
 */
export interface UserInfo {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

/**
 * Learning statistics for the user
 */
export interface LearningStats {
  cardsLearned: number;
  currentStreak: number;
  totalReviews: number;
  accuracyRate: number;
}

/**
 * Review queue breakdown by urgency
 */
export interface ReviewQueue {
  overdue: number;
  dueToday: number;
  upcoming: number;
  total: number;
}

/**
 * Activity type discriminator
 */
export enum ActivityType {
  CARD_LEARNED = 'card_learned',
  STREAK_MILESTONE = 'streak_milestone',
  DECK_COMPLETED = 'deck_completed',
  PERFECT_REVIEW = 'perfect_review',
}

/**
 * Individual activity entry in the feed
 */
export interface Activity {
  id: string;
  type: ActivityType;
  description: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

/**
 * Complete dashboard data structure
 */
export interface DashboardData {
  user: UserInfo;
  greeting: string;
  stats: LearningStats;
  reviewQueue: ReviewQueue;
  recentActivity: Activity[];
  lastUpdated: Date;
}
