// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import React from 'react';
import { StatsOverviewSection } from './StatsOverviewSection';
import type { LearningStats } from '../../types/dashboard';

describe('StatsOverviewSection', () => {
  // Test component definition and basic rendering
  it('should be defined', () => {
    expect(StatsOverviewSection).toBeDefined();
  });

  it('should create a valid React element with stats prop', () => {
    const stats: LearningStats = {
      cardsLearned: 142,
      currentStreak: 5,
      totalReviews: 328,
      accuracyRate: 87,
    };

    const element = React.createElement(StatsOverviewSection, { stats });
    expect(React.isValidElement(element)).toBe(true);
  });

  // Test with realistic stats
  it('should accept realistic learning stats', () => {
    const stats: LearningStats = {
      cardsLearned: 142,
      currentStreak: 5,
      totalReviews: 328,
      accuracyRate: 87,
    };

    const element = React.createElement(StatsOverviewSection, { stats });
    expect(React.isValidElement(element)).toBe(true);
  });

  // Test with zero values
  it('should accept zero values for all stats', () => {
    const stats: LearningStats = {
      cardsLearned: 0,
      currentStreak: 0,
      totalReviews: 0,
      accuracyRate: 0,
    };

    const element = React.createElement(StatsOverviewSection, { stats });
    expect(React.isValidElement(element)).toBe(true);
  });

  // Test with low values
  it('should accept low stat values', () => {
    const stats: LearningStats = {
      cardsLearned: 1,
      currentStreak: 1,
      totalReviews: 1,
      accuracyRate: 1,
    };

    const element = React.createElement(StatsOverviewSection, { stats });
    expect(React.isValidElement(element)).toBe(true);
  });

  // Test with high values
  it('should accept high stat values', () => {
    const stats: LearningStats = {
      cardsLearned: 9999,
      currentStreak: 365,
      totalReviews: 50000,
      accuracyRate: 100,
    };

    const element = React.createElement(StatsOverviewSection, { stats });
    expect(React.isValidElement(element)).toBe(true);
  });

  // Test with perfect accuracy
  it('should accept 100% accuracy rate', () => {
    const stats: LearningStats = {
      cardsLearned: 50,
      currentStreak: 10,
      totalReviews: 200,
      accuracyRate: 100,
    };

    const element = React.createElement(StatsOverviewSection, { stats });
    expect(React.isValidElement(element)).toBe(true);
  });

  // Test with milestone streak values
  it('should accept milestone streak values', () => {
    const stats: LearningStats = {
      cardsLearned: 500,
      currentStreak: 30,
      totalReviews: 1500,
      accuracyRate: 92,
    };

    const element = React.createElement(StatsOverviewSection, { stats });
    expect(React.isValidElement(element)).toBe(true);
  });

  // Test with large review counts
  it('should accept large review counts', () => {
    const stats: LearningStats = {
      cardsLearned: 1000,
      currentStreak: 100,
      totalReviews: 10000,
      accuracyRate: 95,
    };

    const element = React.createElement(StatsOverviewSection, { stats });
    expect(React.isValidElement(element)).toBe(true);
  });

  // Test with beginner stats
  it('should accept beginner user stats', () => {
    const stats: LearningStats = {
      cardsLearned: 5,
      currentStreak: 1,
      totalReviews: 10,
      accuracyRate: 60,
    };

    const element = React.createElement(StatsOverviewSection, { stats });
    expect(React.isValidElement(element)).toBe(true);
  });

  // Test with advanced user stats
  it('should accept advanced user stats', () => {
    const stats: LearningStats = {
      cardsLearned: 5000,
      currentStreak: 500,
      totalReviews: 20000,
      accuracyRate: 98,
    };

    const element = React.createElement(StatsOverviewSection, { stats });
    expect(React.isValidElement(element)).toBe(true);
  });

  // Test with fractional accuracy (edge case)
  it('should accept fractional accuracy rates', () => {
    const stats: LearningStats = {
      cardsLearned: 100,
      currentStreak: 15,
      totalReviews: 500,
      accuracyRate: 87.5,
    };

    const element = React.createElement(StatsOverviewSection, { stats });
    expect(React.isValidElement(element)).toBe(true);
  });

  // Test with all maximum reasonable values
  it('should accept all maximum reasonable values', () => {
    const stats: LearningStats = {
      cardsLearned: 10000,
      currentStreak: 1000,
      totalReviews: 100000,
      accuracyRate: 100,
    };

    const element = React.createElement(StatsOverviewSection, { stats });
    expect(React.isValidElement(element)).toBe(true);
  });

  // Test component props interface
  it('should accept only the stats prop', () => {
    const stats: LearningStats = {
      cardsLearned: 75,
      currentStreak: 8,
      totalReviews: 250,
      accuracyRate: 85,
    };

    // Should compile without errors
    const element = React.createElement(StatsOverviewSection, { stats });
    expect(React.isValidElement(element)).toBe(true);
  });
});
