// @vitest-environment node

import { describe, it, expect } from 'vitest';
import {
  getMockDashboardData,
  fetchMockDashboardData,
} from './dashboard-mock-data';
import { ActivityType } from '../types/dashboard';

describe('getMockDashboardData', () => {
  it('returns complete dashboard data structure', () => {
    const data = getMockDashboardData();

    expect(data).toBeDefined();
    expect(data.user).toBeDefined();
    expect(data.stats).toBeDefined();
    expect(data.reviewQueue).toBeDefined();
    expect(data.recentActivity).toBeDefined();
    expect(data.lastUpdated).toBeInstanceOf(Date);
  });

  it('returns default greeting when not specified', () => {
    const data = getMockDashboardData();

    expect(data.greeting).toBe('Good morning');
  });

  it('returns custom greeting when specified', () => {
    const data = getMockDashboardData('Good evening');

    expect(data.greeting).toBe('Good evening');
  });

  it('returns valid user information', () => {
    const data = getMockDashboardData();

    expect(data.user.id).toBe('mock-user-123');
    expect(data.user.name).toBe('Alex Johnson');
    expect(data.user.email).toBe('alex.johnson@example.com');
    expect(data.user.avatarUrl).toBeDefined();
  });

  it('returns realistic learning statistics', () => {
    const data = getMockDashboardData();

    expect(data.stats.cardsLearned).toBe(247);
    expect(data.stats.currentStreak).toBe(12);
    expect(data.stats.totalReviews).toBe(1834);
    expect(data.stats.accuracyRate).toBe(0.87);
  });

  it('returns review queue with breakdown', () => {
    const data = getMockDashboardData();

    expect(data.reviewQueue.overdue).toBe(5);
    expect(data.reviewQueue.dueToday).toBe(23);
    expect(data.reviewQueue.upcoming).toBe(67);
    expect(data.reviewQueue.total).toBe(95);
  });

  it('returns array of recent activities', () => {
    const data = getMockDashboardData();

    expect(Array.isArray(data.recentActivity)).toBe(true);
    expect(data.recentActivity.length).toBeGreaterThan(0);
  });

  it('returns activities with valid structure', () => {
    const data = getMockDashboardData();
    const activity = data.recentActivity[0];

    if (!activity) {
      throw new Error('Expected at least one activity');
    }

    expect(activity).toBeDefined();
    expect(activity.id).toBeDefined();
    expect(activity.type).toBeDefined();
    expect(activity.description).toBeDefined();
    expect(activity.timestamp).toBeInstanceOf(Date);
  });

  it('returns activities with all ActivityType variants', () => {
    const data = getMockDashboardData();
    const types = data.recentActivity.map((a) => a.type);

    expect(types).toContain(ActivityType.CARD_LEARNED);
    expect(types).toContain(ActivityType.STREAK_MILESTONE);
    expect(types).toContain(ActivityType.DECK_COMPLETED);
    expect(types).toContain(ActivityType.PERFECT_REVIEW);
  });

  it('returns activities with metadata', () => {
    const data = getMockDashboardData();
    const activityWithMetadata = data.recentActivity[0];

    if (!activityWithMetadata) {
      throw new Error('Expected at least one activity');
    }

    expect(activityWithMetadata.metadata).toBeDefined();
  });

  it('returns activities sorted by timestamp (most recent first)', () => {
    const data = getMockDashboardData();
    const timestamps = data.recentActivity.map((a) => a.timestamp.getTime());

    for (let i = 1; i < timestamps.length; i++) {
      const prev = timestamps[i - 1];
      const curr = timestamps[i];
      if (prev === undefined || curr === undefined) {
        throw new Error('Expected valid timestamps');
      }
      expect(prev).toBeGreaterThanOrEqual(curr);
    }
  });

  it('returns new Date object for lastUpdated on each call', () => {
    const data1 = getMockDashboardData();
    // Small delay to ensure different timestamps
    const data2 = getMockDashboardData();

    expect(data1.lastUpdated).toBeInstanceOf(Date);
    expect(data2.lastUpdated).toBeInstanceOf(Date);
    // Both should be recent (within last second)
    const now = Date.now();
    expect(now - data1.lastUpdated.getTime()).toBeLessThan(1000);
    expect(now - data2.lastUpdated.getTime()).toBeLessThan(1000);
  });
});

describe('fetchMockDashboardData', () => {
  it('returns promise that resolves to dashboard data', async () => {
    const data = await fetchMockDashboardData(0);

    expect(data).toBeDefined();
    expect(data.user).toBeDefined();
    expect(data.stats).toBeDefined();
  });

  it('applies default delay of 500ms when not specified', async () => {
    const startTime = Date.now();
    await fetchMockDashboardData();
    const endTime = Date.now();
    const elapsed = endTime - startTime;

    // Should take at least 500ms (allow some margin for test execution)
    expect(elapsed).toBeGreaterThanOrEqual(450);
  });

  it('applies custom delay when specified', async () => {
    const startTime = Date.now();
    await fetchMockDashboardData(100);
    const endTime = Date.now();
    const elapsed = endTime - startTime;

    // Should take at least 100ms (allow some margin for test execution)
    expect(elapsed).toBeGreaterThanOrEqual(90);
    // Should not take too long (no more than 200ms)
    expect(elapsed).toBeLessThan(200);
  });

  it('returns data with default greeting when not specified', async () => {
    const data = await fetchMockDashboardData(0);

    expect(data.greeting).toBe('Good morning');
  });

  it('returns data with custom greeting when specified', async () => {
    const data = await fetchMockDashboardData(0, 'Good afternoon');

    expect(data.greeting).toBe('Good afternoon');
  });

  it('returns same mock data structure as getMockDashboardData', async () => {
    const syncData = getMockDashboardData();
    const asyncData = await fetchMockDashboardData(0);

    // Compare structure (not exact equality since timestamps differ)
    expect(asyncData.user.id).toBe(syncData.user.id);
    expect(asyncData.stats.cardsLearned).toBe(syncData.stats.cardsLearned);
    expect(asyncData.reviewQueue.total).toBe(syncData.reviewQueue.total);
    expect(asyncData.recentActivity.length).toBe(
      syncData.recentActivity.length,
    );
  });
});
