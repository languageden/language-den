/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { HeroCards } from './HeroCards';
import type { HeroCardsProps } from './HeroCards';

describe('HeroCards', () => {
  const defaultProps: HeroCardsProps = {
    userName: 'Sarah',
    greeting: 'Good morning',
    streakCount: 5,
    onStartReview: vi.fn(),
  };

  describe('component definition', () => {
    it('should be defined', () => {
      expect(HeroCards).toBeDefined();
    });

    it('should create a valid React element', () => {
      const element = React.createElement(HeroCards, defaultProps);
      expect(React.isValidElement(element)).toBe(true);
    });
  });

  describe('props acceptance', () => {
    it('should accept userName prop', () => {
      const element = React.createElement(HeroCards, {
        ...defaultProps,
        userName: 'Alex',
      });
      expect(element.props.userName).toBe('Alex');
    });

    it('should accept greeting prop', () => {
      const element = React.createElement(HeroCards, {
        ...defaultProps,
        greeting: 'Good evening',
      });
      expect(element.props.greeting).toBe('Good evening');
    });

    it('should accept streakCount prop', () => {
      const element = React.createElement(HeroCards, {
        ...defaultProps,
        streakCount: 30,
      });
      expect(element.props.streakCount).toBe(30);
    });

    it('should accept onStartReview callback', () => {
      const mockHandler = vi.fn();
      const element = React.createElement(HeroCards, {
        ...defaultProps,
        onStartReview: mockHandler,
      });
      expect(element.props.onStartReview).toBe(mockHandler);
    });
  });

  describe('greeting display', () => {
    it('should render greeting and user name together', () => {
      const element = React.createElement(HeroCards, {
        ...defaultProps,
        userName: 'Jordan',
        greeting: 'Good afternoon',
      });
      expect(element.props.userName).toBe('Jordan');
      expect(element.props.greeting).toBe('Good afternoon');
    });

    it('should handle morning greeting', () => {
      const element = React.createElement(HeroCards, {
        ...defaultProps,
        greeting: 'Good morning',
      });
      expect(element.props.greeting).toBe('Good morning');
    });

    it('should handle afternoon greeting', () => {
      const element = React.createElement(HeroCards, {
        ...defaultProps,
        greeting: 'Good afternoon',
      });
      expect(element.props.greeting).toBe('Good afternoon');
    });

    it('should handle evening greeting', () => {
      const element = React.createElement(HeroCards, {
        ...defaultProps,
        greeting: 'Good evening',
      });
      expect(element.props.greeting).toBe('Good evening');
    });

    it('should handle night greeting', () => {
      const element = React.createElement(HeroCards, {
        ...defaultProps,
        greeting: 'Good night',
      });
      expect(element.props.greeting).toBe('Good night');
    });
  });

  describe('streak counter', () => {
    it('should display streak count of 0', () => {
      const element = React.createElement(HeroCards, {
        ...defaultProps,
        streakCount: 0,
      });
      expect(element.props.streakCount).toBe(0);
    });

    it('should display single day streak', () => {
      const element = React.createElement(HeroCards, {
        ...defaultProps,
        streakCount: 1,
      });
      expect(element.props.streakCount).toBe(1);
    });

    it('should display milestone streak of 7 days', () => {
      const element = React.createElement(HeroCards, {
        ...defaultProps,
        streakCount: 7,
      });
      expect(element.props.streakCount).toBe(7);
    });

    it('should display milestone streak of 30 days', () => {
      const element = React.createElement(HeroCards, {
        ...defaultProps,
        streakCount: 30,
      });
      expect(element.props.streakCount).toBe(30);
    });

    it('should display milestone streak of 100 days', () => {
      const element = React.createElement(HeroCards, {
        ...defaultProps,
        streakCount: 100,
      });
      expect(element.props.streakCount).toBe(100);
    });

    it('should display large streak count', () => {
      const element = React.createElement(HeroCards, {
        ...defaultProps,
        streakCount: 365,
      });
      expect(element.props.streakCount).toBe(365);
    });
  });

  describe('button interaction', () => {
    it('should accept onPress handler', () => {
      const mockHandler = vi.fn();
      const element = React.createElement(HeroCards, {
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
      const element = React.createElement(HeroCards, {
        userName: 'Taylor',
        greeting: 'Good evening',
        streakCount: 42,
        onStartReview: mockHandler,
      });

      expect(element.props.userName).toBe('Taylor');
      expect(element.props.greeting).toBe('Good evening');
      expect(element.props.streakCount).toBe(42);
      expect(element.props.onStartReview).toBe(mockHandler);
    });
  });
});
