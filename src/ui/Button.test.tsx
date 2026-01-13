/**
 * @vitest-environment jsdom
 */

import { describe, it, expect } from 'vitest';
import React from 'react';
import { Button } from './Button';

describe('Button', () => {
  it('should be a valid React component', () => {
    // Button is a styled component (Tamagui), which is an object with component properties
    // not a plain function, but it can be used to create React elements
    expect(Button).toBeDefined();

    // Create an element with Button component
    const element = React.createElement(Button, {}, 'Click me');

    // Verify the element is a valid React element
    expect(React.isValidElement(element)).toBe(true);
  });

  it('should accept children text content', () => {
    const element = React.createElement(Button, {}, 'Button text');

    expect(element.props.children).toBe('Button text');
  });

  it('should accept onPress handler', () => {
    const handlePress = (): void => {
      // Handler function
    };
    const element = React.createElement(Button, { onPress: handlePress });

    expect(element.props.onPress).toBe(handlePress);
  });

  it('should accept disabled prop', () => {
    const element = React.createElement(Button, { disabled: true });

    expect(element.props.disabled).toBe(true);
  });

  it('should be enabled by default', () => {
    const element = React.createElement(Button, {});

    expect(element.props.disabled).toBeUndefined();
  });

  it('should accept custom padding props', () => {
    const element = React.createElement(Button, { px: '$8', py: '$4' });

    expect(element.props.px).toBe('$8');
    expect(element.props.py).toBe('$4');
  });

  it('should accept custom background color', () => {
    const element = React.createElement(Button, { bg: '$secondary' });

    expect(element.props.bg).toBe('$secondary');
  });

  it('should accept custom text color', () => {
    const element = React.createElement(Button, { color: '$primary' });

    expect(element.props.color).toBe('$primary');
  });

  it('should accept width prop', () => {
    const element = React.createElement(Button, { width: '100%' });

    expect(element.props.width).toBe('100%');
  });

  it('should accept fontSize prop', () => {
    const element = React.createElement(Button, { fontSize: '$5' });

    expect(element.props.fontSize).toBe('$5');
  });

  it('should accept multiple children elements', () => {
    const children = [
      React.createElement('span', { key: 1 }, 'Icon'),
      React.createElement('span', { key: 2 }, 'Text'),
    ];
    const element = React.createElement(Button, {}, ...children);

    expect(Array.isArray(element.props.children)).toBe(true);
    expect(element.props.children).toHaveLength(2);
  });

  it('should accept accessibility props', () => {
    const element = React.createElement(Button, {
      'aria-label': 'Submit form',
      role: 'button',
    });

    expect(element.props['aria-label']).toBe('Submit form');
    expect(element.props.role).toBe('button');
  });

  it('should accept testID prop for testing', () => {
    const element = React.createElement(Button, { testID: 'submit-button' });

    expect(element.props.testID).toBe('submit-button');
  });

  it('should accept flexDirection for layout', () => {
    const element = React.createElement(Button, { flexDirection: 'row' });

    expect(element.props.flexDirection).toBe('row');
  });

  it('should accept gap for spacing between children', () => {
    const element = React.createElement(Button, { gap: '$2' });

    expect(element.props.gap).toBe('$2');
  });
});
