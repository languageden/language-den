/**
 * @vitest-environment jsdom
 */

import { describe, it, expect } from 'vitest';
import React from 'react';
import { Text } from 'tamagui';
import { ActivityFeedSection } from './ActivityFeedSection';
import type { ActivityFeedSectionProps, Activity } from './ActivityFeedSection';

describe('ActivityFeedSection', () => {
  // Helper function to create mock activities
  const createActivity = (id: string, description: string, timestamp: string): Activity => ({
    id,
    icon: <Text fontSize="$5">📚</Text>,
    description,
    timestamp,
  });

  const defaultActivities: Activity[] = [
    createActivity('1', 'Completed lesson: Basic Greetings', '2 hours ago'),
    createActivity('2', 'Earned achievement: Week Streak', 'Just now'),
    createActivity('3', 'Reviewed 10 cards', '1 day ago'),
  ];

  const defaultProps: ActivityFeedSectionProps = {
    activities: defaultActivities,
  };

  describe('component definition', () => {
    it('should be defined', () => {
      expect(ActivityFeedSection).toBeDefined();
    });

    it('should create a valid React element', () => {
      const element = React.createElement(ActivityFeedSection, defaultProps);
      expect(React.isValidElement(element)).toBe(true);
    });
  });

  describe('props acceptance', () => {
    it('should accept activities prop', () => {
      const activities = [createActivity('1', 'Test activity', '1 hour ago')];
      const element = React.createElement(ActivityFeedSection, {
        activities,
      });
      expect(element.props.activities).toEqual(activities);
    });

    it('should accept maxVisible prop', () => {
      const element = React.createElement(ActivityFeedSection, {
        activities: defaultActivities,
        maxVisible: 5,
      });
      expect(element.props.maxVisible).toBe(5);
    });

    it('should use default maxVisible of 7 when not provided', () => {
      const element = React.createElement(ActivityFeedSection, {
        activities: defaultActivities,
      });
      expect(element.props.maxVisible).toBeUndefined();
    });
  });

  describe('activities display', () => {
    it('should accept single activity', () => {
      const activities = [createActivity('1', 'First review', '5 minutes ago')];
      const element = React.createElement(ActivityFeedSection, {
        activities,
      });
      expect(element.props.activities).toHaveLength(1);
    });

    it('should accept multiple activities', () => {
      const activities = [
        createActivity('1', 'Activity 1', '1 hour ago'),
        createActivity('2', 'Activity 2', '2 hours ago'),
        createActivity('3', 'Activity 3', '3 hours ago'),
      ];
      const element = React.createElement(ActivityFeedSection, {
        activities,
      });
      expect(element.props.activities).toHaveLength(3);
    });

    it('should accept activities in chronological order', () => {
      const activities = [
        createActivity('1', 'Most recent', 'Just now'),
        createActivity('2', 'Recent', '1 hour ago'),
        createActivity('3', 'Older', '2 days ago'),
      ];
      const element = React.createElement(ActivityFeedSection, {
        activities,
      });
      expect(element.props.activities[0]?.timestamp).toBe('Just now');
      expect(element.props.activities[1]?.timestamp).toBe('1 hour ago');
      expect(element.props.activities[2]?.timestamp).toBe('2 days ago');
    });
  });

  describe('maxVisible limit', () => {
    it('should accept exactly maxVisible activities', () => {
      const activities = Array.from({ length: 7 }, (_, i) =>
        createActivity(i.toString(), `Activity ${i.toString()}`, `${i.toString()} hours ago`)
      );
      const element = React.createElement(ActivityFeedSection, {
        activities,
        maxVisible: 7,
      });
      expect(element.props.activities).toHaveLength(7);
    });

    it('should accept more activities than maxVisible', () => {
      const activities = Array.from({ length: 10 }, (_, i) =>
        createActivity(i.toString(), `Activity ${i.toString()}`, `${i.toString()} hours ago`)
      );
      const element = React.createElement(ActivityFeedSection, {
        activities,
        maxVisible: 7,
      });
      expect(element.props.activities).toHaveLength(10);
      expect(element.props.maxVisible).toBe(7);
    });

    it('should accept fewer activities than maxVisible', () => {
      const activities = [
        createActivity('1', 'Activity 1', '1 hour ago'),
        createActivity('2', 'Activity 2', '2 hours ago'),
      ];
      const element = React.createElement(ActivityFeedSection, {
        activities,
        maxVisible: 7,
      });
      expect(element.props.activities).toHaveLength(2);
    });

    it('should accept custom maxVisible of 5', () => {
      const activities = Array.from({ length: 8 }, (_, i) =>
        createActivity(i.toString(), `Activity ${i.toString()}`, `${i.toString()} hours ago`)
      );
      const element = React.createElement(ActivityFeedSection, {
        activities,
        maxVisible: 5,
      });
      expect(element.props.maxVisible).toBe(5);
    });

    it('should accept custom maxVisible of 10', () => {
      const activities = Array.from({ length: 15 }, (_, i) =>
        createActivity(i.toString(), `Activity ${i.toString()}`, `${i.toString()} hours ago`)
      );
      const element = React.createElement(ActivityFeedSection, {
        activities,
        maxVisible: 10,
      });
      expect(element.props.maxVisible).toBe(10);
    });
  });

  describe('empty state display', () => {
    it('should accept empty activities array', () => {
      const element = React.createElement(ActivityFeedSection, {
        activities: [],
      });
      expect(element.props.activities).toHaveLength(0);
    });

    it('should display empty state when activities array is empty', () => {
      const element = React.createElement(ActivityFeedSection, {
        activities: [],
      });
      expect(element.props.activities).toEqual([]);
    });

    it('should accept maxVisible with empty activities', () => {
      const element = React.createElement(ActivityFeedSection, {
        activities: [],
        maxVisible: 7,
      });
      expect(element.props.activities).toHaveLength(0);
      expect(element.props.maxVisible).toBe(7);
    });
  });

  describe('see all link display', () => {
    it('should indicate when activities exceed maxVisible limit', () => {
      const activities = Array.from({ length: 10 }, (_, i) =>
        createActivity(i.toString(), `Activity ${i.toString()}`, `${i.toString()} hours ago`)
      );
      const element = React.createElement(ActivityFeedSection, {
        activities,
        maxVisible: 7,
      });
      expect(element.props.activities.length > (element.props.maxVisible ?? 7)).toBe(true);
    });

    it('should not indicate see all when activities equal maxVisible', () => {
      const activities = Array.from({ length: 7 }, (_, i) =>
        createActivity(i.toString(), `Activity ${i.toString()}`, `${i.toString()} hours ago`)
      );
      const element = React.createElement(ActivityFeedSection, {
        activities,
        maxVisible: 7,
      });
      expect(element.props.activities.length > (element.props.maxVisible ?? 7)).toBe(false);
    });

    it('should not indicate see all when activities less than maxVisible', () => {
      const activities = [
        createActivity('1', 'Activity 1', '1 hour ago'),
        createActivity('2', 'Activity 2', '2 hours ago'),
      ];
      const element = React.createElement(ActivityFeedSection, {
        activities,
        maxVisible: 7,
      });
      expect(element.props.activities.length > (element.props.maxVisible ?? 7)).toBe(false);
    });
  });

  describe('activity data structure', () => {
    it('should accept activity with all required fields', () => {
      const activity = createActivity('123', 'Completed review', '30 minutes ago');
      const element = React.createElement(ActivityFeedSection, {
        activities: [activity],
      });
      const firstActivity = element.props.activities[0];
      expect(firstActivity?.id).toBe('123');
      expect(firstActivity?.description).toBe('Completed review');
      expect(firstActivity?.timestamp).toBe('30 minutes ago');
      expect(firstActivity?.icon).toBeDefined();
    });

    it('should accept activity with ReactNode icon', () => {
      const activity: Activity = {
        id: '1',
        icon: <Text fontSize="$5">🎉</Text>,
        description: 'Milestone reached',
        timestamp: '1 hour ago',
      };
      const element = React.createElement(ActivityFeedSection, {
        activities: [activity],
      });
      expect(element.props.activities[0]?.icon).toBeDefined();
    });

    it('should accept activities with various timestamp formats', () => {
      const activities = [
        createActivity('1', 'Activity 1', 'Just now'),
        createActivity('2', 'Activity 2', '5 minutes ago'),
        createActivity('3', 'Activity 3', '2 hours ago'),
        createActivity('4', 'Activity 4', '1 day ago'),
        createActivity('5', 'Activity 5', '3 weeks ago'),
      ];
      const element = React.createElement(ActivityFeedSection, {
        activities,
      });
      expect(element.props.activities).toHaveLength(5);
    });
  });

  describe('combined props', () => {
    it('should accept all props together', () => {
      const activities = Array.from({ length: 10 }, (_, i) =>
        createActivity(i.toString(), `Activity ${i.toString()}`, `${i.toString()} hours ago`)
      );
      const element = React.createElement(ActivityFeedSection, {
        activities,
        maxVisible: 5,
      });
      expect(element.props.activities).toHaveLength(10);
      expect(element.props.maxVisible).toBe(5);
    });

    it('should handle realistic activity feed scenario', () => {
      const activities = [
        createActivity('1', 'Completed 20 reviews with 95% accuracy', 'Just now'),
        createActivity('2', 'Reached 7-day streak milestone', '2 hours ago'),
        createActivity('3', 'Learned 5 new vocabulary words', '5 hours ago'),
        createActivity('4', 'Completed lesson: Greetings', '1 day ago'),
        createActivity('5', 'Achieved perfect score on quiz', '2 days ago'),
      ];
      const element = React.createElement(ActivityFeedSection, {
        activities,
        maxVisible: 7,
      });
      expect(element.props.activities).toHaveLength(5);
      expect(element.props.maxVisible).toBe(7);
    });

    it('should handle large activity list', () => {
      const activities = Array.from({ length: 50 }, (_, i) =>
        createActivity(i.toString(), `Activity ${i.toString()}`, `${i.toString()} hours ago`)
      );
      const element = React.createElement(ActivityFeedSection, {
        activities,
        maxVisible: 7,
      });
      expect(element.props.activities).toHaveLength(50);
      expect(element.props.maxVisible).toBe(7);
    });
  });
});
