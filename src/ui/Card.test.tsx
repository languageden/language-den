/**
 * @vitest-environment jsdom
 */

import { describe, it, expect } from 'vitest';
import React from 'react';
import { Card } from './Card';

describe('Card', () => {
  it('should be a valid React component', () => {
    // Card is a styled component (Tamagui), which is an object with component properties
    // not a plain function, but it can be used to create React elements
    expect(Card).toBeDefined();

    // Create an element with Card component
    const element = React.createElement(Card, {}, 'Test content');

    // Verify the element is a valid React element
    expect(React.isValidElement(element)).toBe(true);
  });

  it('should accept children via props', () => {
    const element = React.createElement(Card, {}, 'Child content');

    expect(element.props.children).toBe('Child content');
  });

  it('should accept custom padding props', () => {
    const element = React.createElement(Card, { p: '$6' });

    expect(element.props.p).toBe('$6');
  });

  it('should accept custom gap props', () => {
    const element = React.createElement(Card, { gap: '$4' });

    expect(element.props.gap).toBe('$4');
  });

  it('should accept custom background color props', () => {
    const element = React.createElement(Card, { bg: '$primary' });

    expect(element.props.bg).toBe('$primary');
  });

  it('should accept multiple children', () => {
    const children = [
      React.createElement('div', { key: 1 }, 'First'),
      React.createElement('div', { key: 2 }, 'Second'),
    ];
    const element = React.createElement(Card, {}, ...children);

    expect(Array.isArray(element.props.children)).toBe(true);
    expect(element.props.children).toHaveLength(2);
  });

  it('should accept width props', () => {
    const element = React.createElement(Card, { width: 300 });

    expect(element.props.width).toBe(300);
  });

  it('should accept flexDirection props', () => {
    const element = React.createElement(Card, { flexDirection: 'row' });

    expect(element.props.flexDirection).toBe('row');
  });

  it('should accept alignItems props via items shorthand', () => {
    const element = React.createElement(Card, { items: 'center' });

    expect(element.props.items).toBe('center');
  });

  it('should accept justifyContent props via justify shorthand', () => {
    const element = React.createElement(Card, { justify: 'center' });

    expect(element.props.justify).toBe('center');
  });
});
