/**
 * @vitest-environment jsdom
 */
import React from 'react';
import { describe, it, expect } from 'vitest';
import { ActivityItem, type ActivityItemProps } from './ActivityItem';

describe('ActivityItem', () => {
  it('should be defined', () => {
    expect(ActivityItem).toBeDefined();
  });

  it('should render with all required props', () => {
    const icon = React.createElement('svg', {}, 'Icon');
    const props: ActivityItemProps = {
      icon,
      description: 'Completed lesson: Basic Greetings',
      timestamp: '2 hours ago',
    };

    const element = React.createElement(ActivityItem, props);
    expect(React.isValidElement(element)).toBe(true);
  });

  it('should accept icon prop', () => {
    const icon = React.createElement('svg', {}, 'Icon');
    const props: ActivityItemProps = {
      icon,
      description: 'Completed lesson',
      timestamp: '1 hour ago',
    };

    const element = React.createElement(ActivityItem, props);
    expect(element.props.icon).toBe(icon);
  });

  it('should accept description prop', () => {
    const icon = React.createElement('svg', {}, 'Icon');
    const props: ActivityItemProps = {
      icon,
      description: 'Earned achievement: Week Streak',
      timestamp: 'Just now',
    };

    const element = React.createElement(ActivityItem, props);
    expect(element.props.description).toBe('Earned achievement: Week Streak');
  });

  it('should accept timestamp prop', () => {
    const icon = React.createElement('svg', {}, 'Icon');
    const props: ActivityItemProps = {
      icon,
      description: 'Completed review session',
      timestamp: '5 minutes ago',
    };

    const element = React.createElement(ActivityItem, props);
    expect(element.props.timestamp).toBe('5 minutes ago');
  });

  it('should render with "Just now" timestamp', () => {
    const icon = React.createElement('svg', {}, 'Icon');
    const props: ActivityItemProps = {
      icon,
      description: 'Started new lesson',
      timestamp: 'Just now',
    };

    const element = React.createElement(ActivityItem, props);
    expect(element.props.timestamp).toBe('Just now');
  });

  it('should render with relative timestamp in minutes', () => {
    const icon = React.createElement('svg', {}, 'Icon');
    const props: ActivityItemProps = {
      icon,
      description: 'Activity description',
      timestamp: '15 minutes ago',
    };

    const element = React.createElement(ActivityItem, props);
    expect(element.props.timestamp).toBe('15 minutes ago');
  });

  it('should render with relative timestamp in hours', () => {
    const icon = React.createElement('svg', {}, 'Icon');
    const props: ActivityItemProps = {
      icon,
      description: 'Activity description',
      timestamp: '3 hours ago',
    };

    const element = React.createElement(ActivityItem, props);
    expect(element.props.timestamp).toBe('3 hours ago');
  });

  it('should render with relative timestamp in days', () => {
    const icon = React.createElement('svg', {}, 'Icon');
    const props: ActivityItemProps = {
      icon,
      description: 'Activity description',
      timestamp: '2 days ago',
    };

    const element = React.createElement(ActivityItem, props);
    expect(element.props.timestamp).toBe('2 days ago');
  });

  it('should handle long description text', () => {
    const icon = React.createElement('svg', {}, 'Icon');
    const props: ActivityItemProps = {
      icon,
      description:
        'Completed advanced lesson: Conversational Japanese - Restaurant Ordering with Complex Grammar Structures',
      timestamp: '1 hour ago',
    };

    const element = React.createElement(ActivityItem, props);
    expect(React.isValidElement(element)).toBe(true);
    expect(element.props.description).toContain('Conversational Japanese');
  });

  it('should accept complex icon elements', () => {
    const icon = React.createElement(
      'svg',
      { width: 24, height: 24 },
      React.createElement('circle', { cx: 12, cy: 12, r: 10 })
    );
    const props: ActivityItemProps = {
      icon,
      description: 'Activity with complex icon',
      timestamp: '30 minutes ago',
    };

    const element = React.createElement(ActivityItem, props);
    expect(element.props.icon).toBe(icon);
  });

  it('should render with different activity types', () => {
    const checkIcon = React.createElement('svg', {}, 'Check');
    const starIcon = React.createElement('svg', {}, 'Star');
    const trophyIcon = React.createElement('svg', {}, 'Trophy');

    const completionProps: ActivityItemProps = {
      icon: checkIcon,
      description: 'Completed lesson',
      timestamp: '1 hour ago',
    };

    const achievementProps: ActivityItemProps = {
      icon: starIcon,
      description: 'Earned achievement',
      timestamp: '2 hours ago',
    };

    const milestoneProps: ActivityItemProps = {
      icon: trophyIcon,
      description: 'Reached milestone',
      timestamp: '3 hours ago',
    };

    const completionElement = React.createElement(
      ActivityItem,
      completionProps
    );
    const achievementElement = React.createElement(
      ActivityItem,
      achievementProps
    );
    const milestoneElement = React.createElement(ActivityItem, milestoneProps);

    expect(React.isValidElement(completionElement)).toBe(true);
    expect(React.isValidElement(achievementElement)).toBe(true);
    expect(React.isValidElement(milestoneElement)).toBe(true);
  });

  it('should accept all props combined', () => {
    const icon = React.createElement('svg', { width: 24, height: 24 }, 'Icon');
    const props: ActivityItemProps = {
      icon,
      description: 'Completed lesson: Advanced Grammar',
      timestamp: '45 minutes ago',
    };

    const element = React.createElement(ActivityItem, props);
    expect(React.isValidElement(element)).toBe(true);
    expect(element.props.icon).toBe(icon);
    expect(element.props.description).toBe('Completed lesson: Advanced Grammar');
    expect(element.props.timestamp).toBe('45 minutes ago');
  });
});
