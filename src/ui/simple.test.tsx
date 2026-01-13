/**
 * @vitest-environment jsdom
 *
 * Example React component test demonstrating the testing setup.
 * This test uses jsdom environment for React components.
 */
import { describe, it, expect } from 'vitest';
import * as React from 'react';

// Simple example component
function Greeting({ name }: { name: string }): React.JSX.Element {
  return React.createElement('div', null, `Hello, ${name}!`);
}

describe('React component testing', () => {
  it('can create a React element', () => {
    const element = React.createElement('div', null, 'Hello');
    expect(element).toBeTruthy();
    expect(element.type).toBe('div');
  });

  it('can render a component with props', () => {
    const greeting = React.createElement(Greeting, { name: 'World' });
    expect(greeting.props.name).toBe('World');
  });
});
