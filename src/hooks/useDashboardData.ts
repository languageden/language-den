import { useState, useEffect } from 'react';
import type { DashboardData } from '../types/dashboard';
import { fetchMockDashboardData } from '../services/dashboard-mock-data';

/**
 * Custom React hook for fetching and managing dashboard state
 *
 * @returns Object containing dashboard data, loading state, and error
 *
 * @example
 * ```typescript
 * function DashboardScreen() {
 *   const { data, isLoading, error } = useDashboardData();
 *
 *   if (isLoading) return <LoadingSpinner />;
 *   if (error) return <ErrorMessage error={error} />;
 *   if (!data) return null;
 *
 *   return <Dashboard data={data} />;
 * }
 * ```
 */
export function useDashboardData(): {
  data: DashboardData | null;
  isLoading: boolean;
  error: Error | null;
} {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        setIsLoading(true);
        // Use async mock data service with simulated network delay
        const dashboardData = await fetchMockDashboardData();
        setData(dashboardData);
        setError(null);
      } catch (err) {
        setError(err as Error);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    }

    void fetchData();
  }, []);

  return { data, isLoading, error };
}
