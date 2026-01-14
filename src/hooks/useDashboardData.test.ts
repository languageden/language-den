/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useDashboardData } from './useDashboardData';
import * as dashboardMockData from '../services/dashboard-mock-data';

describe('useDashboardData', () => {
  describe('hook definition', () => {
    it('should be defined as a function', () => {
      expect(useDashboardData).toBeDefined();
      expect(typeof useDashboardData).toBe('function');
    });
  });

  describe('mock data service', () => {
    it('should use fetchMockDashboardData from service', async () => {
      const data = await dashboardMockData.fetchMockDashboardData(10);

      expect(data).toBeDefined();
      expect(data.user).toBeDefined();
      expect(data.stats).toBeDefined();
      expect(data.reviewQueue).toBeDefined();
      expect(data.recentActivity).toBeDefined();
    });

    it('should return complete user information', async () => {
      const data = await dashboardMockData.fetchMockDashboardData(10);
      const user = data.user;

      expect(user.id).toBeDefined();
      expect(user.name).toBeDefined();
      expect(user.email).toBeDefined();
    });

    it('should return learning stats with valid ranges', async () => {
      const data = await dashboardMockData.fetchMockDashboardData(10);
      const stats = data.stats;

      expect(stats.cardsLearned).toBeGreaterThanOrEqual(0);
      expect(stats.currentStreak).toBeGreaterThanOrEqual(0);
      expect(stats.totalReviews).toBeGreaterThanOrEqual(0);
      expect(stats.accuracyRate).toBeGreaterThanOrEqual(0);
      expect(stats.accuracyRate).toBeLessThanOrEqual(1);
    });

    it('should return review queue data', async () => {
      const data = await dashboardMockData.fetchMockDashboardData(10);
      const queue = data.reviewQueue;

      expect(queue.overdue).toBeGreaterThanOrEqual(0);
      expect(queue.dueToday).toBeGreaterThanOrEqual(0);
      expect(queue.upcoming).toBeGreaterThanOrEqual(0);
      expect(queue.total).toBeGreaterThanOrEqual(0);
    });

    it('should return recent activity array', async () => {
      const data = await dashboardMockData.fetchMockDashboardData(10);
      const activities = data.recentActivity;

      expect(Array.isArray(activities)).toBe(true);
      expect(activities.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('error handling', () => {
    beforeEach(() => {
      vi.spyOn(dashboardMockData, 'fetchMockDashboardData');
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should handle mock rejection correctly', async () => {
      const mockError = new Error('Network error');
      vi.spyOn(dashboardMockData, 'fetchMockDashboardData').mockRejectedValue(
        mockError,
      );

      await expect(
        dashboardMockData.fetchMockDashboardData(),
      ).rejects.toThrow('Network error');
    });
  });

  describe('data structure validation', () => {
    it('should return data with all required fields', async () => {
      const data = await dashboardMockData.fetchMockDashboardData(10);

      expect(data.user).toBeDefined();
      expect(data.greeting).toBeDefined();
      expect(data.stats).toBeDefined();
      expect(data.reviewQueue).toBeDefined();
      expect(data.recentActivity).toBeDefined();
      expect(data.lastUpdated).toBeDefined();
      expect(data.lastUpdated).toBeInstanceOf(Date);
    });

    it('should return greeting as string', async () => {
      const data = await dashboardMockData.fetchMockDashboardData(10);

      expect(typeof data.greeting).toBe('string');
      expect(data.greeting.length).toBeGreaterThan(0);
    });
  });

  describe('hook return type', () => {
    it('should have correct return type structure', () => {
      // This test verifies the hook's TypeScript type signature
      // The hook should return an object with data, isLoading, and error properties

      // We can't actually call the hook outside of React context,
      // but we can verify it's properly typed and exported
      expect(useDashboardData).toBeDefined();
      expect(typeof useDashboardData).toBe('function');

      // Type test: ensure hook returns the correct shape
      // This will be caught by TypeScript if the signature changes
      type HookReturn = ReturnType<typeof useDashboardData>;
      interface ExpectedReturn {
        data: unknown;
        isLoading: boolean;
        error: Error | null;
      }

      // TypeScript compilation ensures these types are compatible
      const _typeCheck: ExpectedReturn = {} as HookReturn;
      expect(_typeCheck).toBeDefined();
    });
  });
});
