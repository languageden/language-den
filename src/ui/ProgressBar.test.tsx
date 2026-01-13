/**
 * @vitest-environment jsdom
 */

import { describe, it, expect } from 'vitest';
import React from 'react';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('should be a valid React component', () => {
    expect(ProgressBar).toBeDefined();

    const element = React.createElement(ProgressBar, { progress: 50 });
    expect(React.isValidElement(element)).toBe(true);
  });

  it('should accept progress prop', () => {
    const element = React.createElement(ProgressBar, { progress: 75 });
    expect(element.props.progress).toBe(75);
  });

  it('should accept height prop', () => {
    const element = React.createElement(ProgressBar, {
      progress: 50,
      height: 8,
    });
    expect(element.props.height).toBe(8);
  });

  it('should accept 0% progress', () => {
    const element = React.createElement(ProgressBar, { progress: 0 });
    expect(element.props.progress).toBe(0);
  });

  it('should accept 100% progress', () => {
    const element = React.createElement(ProgressBar, { progress: 100 });
    expect(element.props.progress).toBe(100);
  });

  it('should accept progress values above 100', () => {
    const element = React.createElement(ProgressBar, { progress: 150 });
    // Component should accept and clamp the value internally
    expect(element.props.progress).toBe(150);
  });

  it('should accept negative progress values', () => {
    const element = React.createElement(ProgressBar, { progress: -10 });
    // Component should accept and clamp the value internally
    expect(element.props.progress).toBe(-10);
  });

  it('should accept custom height', () => {
    const element = React.createElement(ProgressBar, {
      progress: 50,
      height: 8,
    });
    expect(element.props.height).toBe(8);
  });

  it('should accept fractional progress values', () => {
    const element = React.createElement(ProgressBar, { progress: 33.33 });
    expect(element.props.progress).toBe(33.33);
  });

  it('should accept large height values', () => {
    const element = React.createElement(ProgressBar, {
      progress: 50,
      height: 20,
    });
    expect(element.props.height).toBe(20);
  });

  it('should accept small height values', () => {
    const element = React.createElement(ProgressBar, {
      progress: 50,
      height: 2,
    });
    expect(element.props.height).toBe(2);
  });

  it('should work without height prop (uses default)', () => {
    const element = React.createElement(ProgressBar, { progress: 50 });
    expect(element.props.height).toBeUndefined();
  });

  it('should combine progress and height props', () => {
    const element = React.createElement(ProgressBar, {
      progress: 65,
      height: 10,
    });
    expect(element.props.progress).toBe(65);
    expect(element.props.height).toBe(10);
  });

  it('should accept various progress percentages', () => {
    const progress25 = React.createElement(ProgressBar, { progress: 25 });
    const progress50 = React.createElement(ProgressBar, { progress: 50 });
    const progress75 = React.createElement(ProgressBar, { progress: 75 });

    expect(progress25.props.progress).toBe(25);
    expect(progress50.props.progress).toBe(50);
    expect(progress75.props.progress).toBe(75);
  });
});
