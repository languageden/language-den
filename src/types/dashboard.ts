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
  vocabularySize: number;
  cardsMastered: number;
  cardsLearning: number;
  cardsNew: number;
  studyTimeToday: number; // in minutes
  studyTimeWeek: number; // in minutes
  studyTimeMonth: number; // in minutes
  wordsLearnedToday: number;
  wordsLearnedWeek: number;
  wordsLearnedMonth: number;
  practiceSessionsCompleted: number;
  fluencyScore: number; // 0-100
  nextReviewIn: number; // minutes until next review
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
 * Study goal with progress tracking
 */
export interface StudyGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string; // "cards", "minutes", "words", etc.
  deadline?: Date;
}

/**
 * Data point for charts
 */
export interface DataPoint {
  date: string; // ISO date string
  value: number;
}

/**
 * Progress trends over time
 */
export interface ProgressTrends {
  dailyStudyTime: DataPoint[]; // Last 30 days
  dailyWordsLearned: DataPoint[]; // Last 30 days
  weeklyAccuracy: DataPoint[]; // Last 12 weeks
  dailyReviews: DataPoint[]; // Last 7 days
}

/**
 * Weak area that needs focus
 */
export interface WeakArea {
  id: string;
  category: string; // "Grammar", "Vocabulary", "Listening", etc.
  accuracy: number; // 0-1
  cardsNeedingReview: number;
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
  studyGoals: StudyGoal[];
  progressTrends: ProgressTrends;
  weakAreas: WeakArea[];
  lastUpdated: Date;
}
