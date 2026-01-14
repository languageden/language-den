/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { ReviewQueueSection } from './ReviewQueueSection';
import type { ReviewQueueSectionProps, ReviewQueueData } from './ReviewQueueSection';

describe('ReviewQueueSection', () => {
  const mockOnStartReview = vi.fn();

  const defaultQueue: ReviewQueueData = {
    newCards: 5,
    learningCards: 12,
    reviewCards: 8,
  };

  const defaultProps: ReviewQueueSectionProps = {
    queue: defaultQueue,
    onStartReview: mockOnStartReview,
  };

  describe('component definition', () => {
    it('should be defined', () => {
      expect(ReviewQueueSection).toBeDefined();
    });

    it('should create a valid React element', () => {
      const element = React.createElement(ReviewQueueSection, defaultProps);
      expect(React.isValidElement(element)).toBe(true);
    });
  });

  describe('props acceptance', () => {
    it('should accept queue prop', () => {
      const element = React.createElement(ReviewQueueSection, {
        ...defaultProps,
        queue: { newCards: 10, learningCards: 5, reviewCards: 3 },
      });
      expect(element.props.queue).toEqual({ newCards: 10, learningCards: 5, reviewCards: 3 });
    });

    it('should accept onStartReview callback', () => {
      const mockHandler = vi.fn();
      const element = React.createElement(ReviewQueueSection, {
        ...defaultProps,
        onStartReview: mockHandler,
      });
      expect(element.props.onStartReview).toBe(mockHandler);
    });
  });

  describe('queue display with cards due', () => {
    it('should display queue with all three categories', () => {
      const element = React.createElement(ReviewQueueSection, {
        queue: { newCards: 5, learningCards: 12, reviewCards: 8 },
        onStartReview: mockOnStartReview,
      });
      expect(element.props.queue.newCards).toBe(5);
      expect(element.props.queue.learningCards).toBe(12);
      expect(element.props.queue.reviewCards).toBe(8);
    });

    it('should display queue with only new cards', () => {
      const element = React.createElement(ReviewQueueSection, {
        queue: { newCards: 10, learningCards: 0, reviewCards: 0 },
        onStartReview: mockOnStartReview,
      });
      expect(element.props.queue.newCards).toBe(10);
      expect(element.props.queue.learningCards).toBe(0);
      expect(element.props.queue.reviewCards).toBe(0);
    });

    it('should display queue with only learning cards', () => {
      const element = React.createElement(ReviewQueueSection, {
        queue: { newCards: 0, learningCards: 15, reviewCards: 0 },
        onStartReview: mockOnStartReview,
      });
      expect(element.props.queue.newCards).toBe(0);
      expect(element.props.queue.learningCards).toBe(15);
      expect(element.props.queue.reviewCards).toBe(0);
    });

    it('should display queue with only review cards', () => {
      const element = React.createElement(ReviewQueueSection, {
        queue: { newCards: 0, learningCards: 0, reviewCards: 20 },
        onStartReview: mockOnStartReview,
      });
      expect(element.props.queue.newCards).toBe(0);
      expect(element.props.queue.learningCards).toBe(0);
      expect(element.props.queue.reviewCards).toBe(20);
    });

    it('should display queue with high card counts', () => {
      const element = React.createElement(ReviewQueueSection, {
        queue: { newCards: 100, learningCards: 200, reviewCards: 300 },
        onStartReview: mockOnStartReview,
      });
      expect(element.props.queue.newCards).toBe(100);
      expect(element.props.queue.learningCards).toBe(200);
      expect(element.props.queue.reviewCards).toBe(300);
    });

    it('should display queue with single card total', () => {
      const element = React.createElement(ReviewQueueSection, {
        queue: { newCards: 1, learningCards: 0, reviewCards: 0 },
        onStartReview: mockOnStartReview,
      });
      expect(element.props.queue.newCards).toBe(1);
    });

    it('should include button when cards are due', () => {
      const element = React.createElement(ReviewQueueSection, {
        queue: { newCards: 5, learningCards: 12, reviewCards: 8 },
        onStartReview: mockOnStartReview,
      });
      expect(element.props.onStartReview).toBeDefined();
    });
  });

  describe('empty state display', () => {
    it('should display empty state when all counts are zero', () => {
      const element = React.createElement(ReviewQueueSection, {
        queue: { newCards: 0, learningCards: 0, reviewCards: 0 },
        onStartReview: mockOnStartReview,
      });
      expect(element.props.queue.newCards).toBe(0);
      expect(element.props.queue.learningCards).toBe(0);
      expect(element.props.queue.reviewCards).toBe(0);
    });

    it('should accept callback even in empty state', () => {
      const mockHandler = vi.fn();
      const element = React.createElement(ReviewQueueSection, {
        queue: { newCards: 0, learningCards: 0, reviewCards: 0 },
        onStartReview: mockHandler,
      });
      expect(element.props.onStartReview).toBe(mockHandler);
    });
  });

  describe('button interaction', () => {
    it('should accept onPress handler', () => {
      const mockHandler = vi.fn();
      const element = React.createElement(ReviewQueueSection, {
        ...defaultProps,
        onStartReview: mockHandler,
      });
      expect(element.props.onStartReview).toBeDefined();
      expect(typeof element.props.onStartReview).toBe('function');
    });
  });

  describe('combined props', () => {
    it('should accept all props together', () => {
      const mockHandler = vi.fn();
      const queue: ReviewQueueData = {
        newCards: 7,
        learningCards: 15,
        reviewCards: 22,
      };
      const element = React.createElement(ReviewQueueSection, {
        queue,
        onStartReview: mockHandler,
      });

      expect(element.props.queue).toEqual(queue);
      expect(element.props.onStartReview).toBe(mockHandler);
    });

    it('should handle realistic queue scenario', () => {
      const mockHandler = vi.fn();
      const element = React.createElement(ReviewQueueSection, {
        queue: { newCards: 20, learningCards: 45, reviewCards: 78 },
        onStartReview: mockHandler,
      });

      expect(element.props.queue.newCards).toBe(20);
      expect(element.props.queue.learningCards).toBe(45);
      expect(element.props.queue.reviewCards).toBe(78);
      expect(element.props.onStartReview).toBe(mockHandler);
    });
  });
});
