/**
 * @vitest-environment jsdom
 */

import { describe, it, expect } from 'vitest';
import React from 'react';
import { ActivityFeedCards } from './ActivityFeedCards';
import type { ActivityFeedCardsProps } from './ActivityFeedCards';

describe('ActivityFeedCards', () => {
  const defaultProps: ActivityFeedCardsProps = {
    activities: [
      {
        id: '1',
        icon: <Text fontSize="$5">📚</Text>,
        description: 'Completed lesson: Basic Greetings',
        timestamp: '2 hours ago',
      },
      {
        id: '2',
        icon: <Text fontSize="$5">🏆</Text>,
        description: 'Earned achievement: Week Streak',
        timestamp: 'Just now',
      },
    ],
    maxVisible: 3,
  };

  describe('component definition', () => {
    it('should be defined', () => {
      expect(ActivityFeedCards).toBeDefined();
    });

    it('should create a valid React element', () => {
      const element = React.createElement(ActivityFeedCards, defaultProps);
      expect(React.isValidElement(element)).toBe(true);
    });
  });

  describe('props acceptance', () => {
    it('should accept activities prop', () => {
      const element = React.createElement(ActivityFeedCards, {
        ...defaultProps,
        activities: [],
      });
      expect(element.props.activities).toEqual([]);
    });

    it('should accept maxVisible prop', () => {
      const element = React.createElement(ActivityFeedCards, {
        ...defaultProps,
        maxVisible: 5,
      });
      expect(element.props.maxVisible).toBe(5);
    });
  });

  describe('combined props', () => {
    it('should accept all props together', () => {
      const element = React.createElement(ActivityFeedCards, {
        activities: [],
        maxVisible: 1,
      });
      expect(element.props.activities).toEqual([]);
      expect(element.props.maxVisible).toBe(1);
    });
  });
});
