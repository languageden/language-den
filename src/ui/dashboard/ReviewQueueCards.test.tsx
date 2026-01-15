/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { ReviewQueueCards } from './ReviewQueueCards';
import type {
  ReviewQueueCardsProps,
  ReviewQueueData,
} from './ReviewQueueCards';

describe('ReviewQueueCards', () => {
  const mockOnStartReview = vi.fn();

  const defaultQueue: ReviewQueueData = {
    newCards: 5,
    learningCards: 12,
    reviewCards: 8,
  };

  const defaultProps: ReviewQueueCardsProps = {
    queue: defaultQueue,
    onStartReview: mockOnStartReview,
  };

  describe('component definition', () => {
    it('should be defined', () => {
      expect(ReviewQueueCards).toBeDefined();
    });

    it('should create a valid React element', () => {
      const element = React.createElement(ReviewQueueCards, defaultProps);
      expect(React.isValidElement(element)).toBe(true);
    });
  });

  describe('props acceptance', () => {
    it('should accept queue prop', () => {
      const element = React.createElement(ReviewQueueCards, {
        ...defaultProps,
        queue: { newCards: 10, learningCards: 5, reviewCards: 3 },
      });
      expect(element.props.queue).toEqual({
        newCards: 10,
        learningCards: 5,
        reviewCards: 3,
      });
    });

    it('should accept onStartReview callback', () => {
      const mockHandler = vi.fn();
      const element = React.createElement(ReviewQueueCards, {
        ...defaultProps,
        onStartReview: mockHandler,
      });
      expect(element.props.onStartReview).toBe(mockHandler);
    });
  });

  describe('queue breakdown', () => {
    it('should handle empty queue', () => {
      const element = React.createElement(ReviewQueueCards, {
        queue: { newCards: 0, learningCards: 0, reviewCards: 0 },
        onStartReview: mockOnStartReview,
      });
      expect(element.props.queue).toEqual({
        newCards: 0,
        learningCards: 0,
        reviewCards: 0,
      });
    });

    it('should handle only new cards', () => {
      const element = React.createElement(ReviewQueueCards, {
        queue: { newCards: 10, learningCards: 0, reviewCards: 0 },
        onStartReview: mockOnStartReview,
      });
      expect(element.props.queue).toEqual({
        newCards: 10,
        learningCards: 0,
        reviewCards: 0,
      });
    });

    it('should handle only learning cards', () => {
      const element = React.createElement(ReviewQueueCards, {
        queue: { newCards: 0, learningCards: 15, reviewCards: 0 },
        onStartReview: mockOnStartReview,
      });
      expect(element.props.queue).toEqual({
        newCards: 0,
        learningCards: 15,
        reviewCards: 0,
      });
    });

    it('should handle only review cards', () => {
      const element = React.createElement(ReviewQueueCards, {
        queue: { newCards: 0, learningCards: 0, reviewCards: 20 },
        onStartReview: mockOnStartReview,
      });
      expect(element.props.queue).toEqual({
        newCards: 0,
        learningCards: 0,
        reviewCards: 20,
      });
    });

    it('should handle mixed queue types', () => {
      const element = React.createElement(ReviewQueueCards, {
        queue: { newCards: 8, learningCards: 12, reviewCards: 5 },
        onStartReview: mockOnStartReview,
      });
      expect(element.props.queue).toEqual({
        newCards: 8,
        learningCards: 12,
        reviewCards: 5,
      });
    });
  });

  describe('combined props', () => {
    it('should accept all props together', () => {
      const mockHandler = vi.fn();
      const element = React.createElement(ReviewQueueCards, {
        queue: { newCards: 3, learningCards: 7, reviewCards: 11 },
        onStartReview: mockHandler,
      });

      expect(element.props.queue).toEqual({
        newCards: 3,
        learningCards: 7,
        reviewCards: 11,
      });
      expect(element.props.onStartReview).toBe(mockHandler);
    });
  });
});
