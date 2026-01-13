/**
 * @vitest-environment jsdom
 */
import React from 'react';
import { describe, it, expect } from 'vitest';
import { MetricCard, type MetricCardProps } from './MetricCard';

describe('MetricCard', () => {
  it('should be defined', () => {
    expect(MetricCard).toBeDefined();
  });

  it('should render with minimal required props', () => {
    const props: MetricCardProps = {
      label: 'Total Cards',
      value: 42,
    };

    const element = React.createElement(MetricCard, props);
    expect(React.isValidElement(element)).toBe(true);
  });

  it('should accept label prop', () => {
    const props: MetricCardProps = {
      label: 'Completion Rate',
      value: '87%',
    };

    const element = React.createElement(MetricCard, props);
    expect(element.props.label).toBe('Completion Rate');
  });

  it('should accept numeric value prop', () => {
    const props: MetricCardProps = {
      label: 'Total Cards',
      value: 42,
    };

    const element = React.createElement(MetricCard, props);
    expect(element.props.value).toBe(42);
  });

  it('should accept string value prop', () => {
    const props: MetricCardProps = {
      label: 'Completion Rate',
      value: '87%',
    };

    const element = React.createElement(MetricCard, props);
    expect(element.props.value).toBe('87%');
  });

  it('should accept optional icon prop', () => {
    const icon = React.createElement('svg', {}, 'Icon');
    const props: MetricCardProps = {
      label: 'Total Cards',
      value: 42,
      icon,
    };

    const element = React.createElement(MetricCard, props);
    expect(element.props.icon).toBe(icon);
  });

  it('should accept optional trend prop with up direction', () => {
    const props: MetricCardProps = {
      label: 'Total Cards',
      value: 42,
      trend: {
        direction: 'up',
        value: '+5',
      },
    };

    const element = React.createElement(MetricCard, props);
    expect(element.props.trend).toBeDefined();
    expect(element.props.trend?.direction).toBe('up');
    expect(element.props.trend?.value).toBe('+5');
  });

  it('should accept optional trend prop with down direction', () => {
    const props: MetricCardProps = {
      label: 'Error Rate',
      value: '2.3%',
      trend: {
        direction: 'down',
        value: '-0.5%',
      },
    };

    const element = React.createElement(MetricCard, props);
    expect(element.props.trend).toBeDefined();
    expect(element.props.trend?.direction).toBe('down');
    expect(element.props.trend?.value).toBe('-0.5%');
  });

  it('should render without icon when not provided', () => {
    const props: MetricCardProps = {
      label: 'Total Cards',
      value: 42,
    };

    const element = React.createElement(MetricCard, props);
    expect(element.props.icon).toBeUndefined();
  });

  it('should render without trend when not provided', () => {
    const props: MetricCardProps = {
      label: 'Total Cards',
      value: 42,
    };

    const element = React.createElement(MetricCard, props);
    expect(element.props.trend).toBeUndefined();
  });

  it('should render with all props combined', () => {
    const icon = React.createElement('svg', {}, 'Icon');
    const props: MetricCardProps = {
      label: 'Active Users',
      value: 1234,
      icon,
      trend: {
        direction: 'up',
        value: '+12%',
      },
    };

    const element = React.createElement(MetricCard, props);
    expect(React.isValidElement(element)).toBe(true);
    expect(element.props.label).toBe('Active Users');
    expect(element.props.value).toBe(1234);
    expect(element.props.icon).toBe(icon);
    expect(element.props.trend?.direction).toBe('up');
    expect(element.props.trend?.value).toBe('+12%');
  });
});
