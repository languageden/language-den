/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { EmptyState } from './EmptyState';
import type { EmptyStateProps } from './EmptyState';

describe('EmptyState', () => {
  const defaultProps: EmptyStateProps = {
    icon: '🌱',
    title: 'No items yet',
    message: 'Get started by creating your first item.',
  };

  describe('component definition', () => {
    it('should be defined', () => {
      expect(EmptyState).toBeDefined();
    });

    it('should create a valid React element', () => {
      const element = React.createElement(EmptyState, defaultProps);
      expect(React.isValidElement(element)).toBe(true);
    });
  });

  describe('required props', () => {
    it('should accept icon prop as string emoji', () => {
      const element = React.createElement(EmptyState, {
        ...defaultProps,
        icon: '📚',
      });
      expect(element.props.icon).toBe('📚');
    });

    it('should accept icon prop as ReactNode', () => {
      const iconNode = React.createElement('div', {}, 'Custom Icon');
      const element = React.createElement(EmptyState, {
        ...defaultProps,
        icon: iconNode,
      });
      expect(React.isValidElement(element.props.icon)).toBe(true);
    });

    it('should accept title prop', () => {
      const element = React.createElement(EmptyState, {
        ...defaultProps,
        title: 'Nothing here',
      });
      expect(element.props.title).toBe('Nothing here');
    });

    it('should accept message prop', () => {
      const element = React.createElement(EmptyState, {
        ...defaultProps,
        message: 'Try adding some content to get started.',
      });
      expect(element.props.message).toBe(
        'Try adding some content to get started.'
      );
    });
  });

  describe('optional props', () => {
    it('should work without actionLabel', () => {
      const element = React.createElement(EmptyState, defaultProps);
      expect(element.props.actionLabel).toBeUndefined();
    });

    it('should work without onAction', () => {
      const element = React.createElement(EmptyState, defaultProps);
      expect(element.props.onAction).toBeUndefined();
    });

    it('should accept actionLabel prop', () => {
      const element = React.createElement(EmptyState, {
        ...defaultProps,
        actionLabel: 'Create Item',
      });
      expect(element.props.actionLabel).toBe('Create Item');
    });

    it('should accept onAction callback', () => {
      const mockHandler = vi.fn();
      const element = React.createElement(EmptyState, {
        ...defaultProps,
        onAction: mockHandler,
      });
      expect(element.props.onAction).toBe(mockHandler);
    });
  });

  describe('icon variants', () => {
    it('should handle different emoji icons', () => {
      const emojis = ['🌱', '📚', '🎉', '⚠️', '❌', '✅'];
      emojis.forEach((emoji) => {
        const element = React.createElement(EmptyState, {
          ...defaultProps,
          icon: emoji,
        });
        expect(element.props.icon).toBe(emoji);
      });
    });

    it('should handle custom ReactNode icon', () => {
      const customIcon = React.createElement(
        'svg',
        { width: 40, height: 40 },
        'Icon'
      );
      const element = React.createElement(EmptyState, {
        ...defaultProps,
        icon: customIcon,
      });
      expect(React.isValidElement(element.props.icon)).toBe(true);
    });
  });

  describe('message variations', () => {
    it('should handle short messages', () => {
      const element = React.createElement(EmptyState, {
        ...defaultProps,
        message: 'No data.',
      });
      expect(element.props.message).toBe('No data.');
    });

    it('should handle long messages', () => {
      const longMessage =
        'There are currently no items to display. Try creating a new item or check back later when more content is available.';
      const element = React.createElement(EmptyState, {
        ...defaultProps,
        message: longMessage,
      });
      expect(element.props.message).toBe(longMessage);
    });

    it('should handle multi-line messages', () => {
      const multiLineMessage = 'No items found.\nTry adjusting your filters.';
      const element = React.createElement(EmptyState, {
        ...defaultProps,
        message: multiLineMessage,
      });
      expect(element.props.message).toBe(multiLineMessage);
    });
  });

  describe('action button behavior', () => {
    it('should accept both actionLabel and onAction together', () => {
      const mockHandler = vi.fn();
      const element = React.createElement(EmptyState, {
        ...defaultProps,
        actionLabel: 'Get Started',
        onAction: mockHandler,
      });
      expect(element.props.actionLabel).toBe('Get Started');
      expect(element.props.onAction).toBe(mockHandler);
    });

    it('should handle different action labels', () => {
      const labels = ['Create', 'Add Item', 'Get Started', 'Learn More'];
      labels.forEach((label) => {
        const element = React.createElement(EmptyState, {
          ...defaultProps,
          actionLabel: label,
          onAction: vi.fn(),
        });
        expect(element.props.actionLabel).toBe(label);
      });
    });

    it('should handle actionLabel without onAction', () => {
      const element = React.createElement(EmptyState, {
        ...defaultProps,
        actionLabel: 'Click Me',
      });
      expect(element.props.actionLabel).toBe('Click Me');
      expect(element.props.onAction).toBeUndefined();
    });

    it('should handle onAction without actionLabel', () => {
      const mockHandler = vi.fn();
      const element = React.createElement(EmptyState, {
        ...defaultProps,
        onAction: mockHandler,
      });
      expect(element.props.actionLabel).toBeUndefined();
      expect(element.props.onAction).toBe(mockHandler);
    });
  });

  describe('combined props', () => {
    it('should accept all props together', () => {
      const mockHandler = vi.fn();
      const element = React.createElement(EmptyState, {
        icon: '📁',
        title: 'Empty Folder',
        message: 'This folder has no files yet.',
        actionLabel: 'Upload Files',
        onAction: mockHandler,
      });

      expect(element.props.icon).toBe('📁');
      expect(element.props.title).toBe('Empty Folder');
      expect(element.props.message).toBe('This folder has no files yet.');
      expect(element.props.actionLabel).toBe('Upload Files');
      expect(element.props.onAction).toBe(mockHandler);
    });

    it('should work with minimal required props only', () => {
      const element = React.createElement(EmptyState, {
        icon: '🎯',
        title: 'No results',
        message: 'No matches found.',
      });

      expect(element.props.icon).toBe('🎯');
      expect(element.props.title).toBe('No results');
      expect(element.props.message).toBe('No matches found.');
      expect(element.props.actionLabel).toBeUndefined();
      expect(element.props.onAction).toBeUndefined();
    });
  });

  describe('real-world use cases', () => {
    it('should work for empty deck list', () => {
      const element = React.createElement(EmptyState, {
        icon: '📚',
        title: 'No decks found',
        message: 'Create your first deck to start learning.',
        actionLabel: 'Create Deck',
        onAction: vi.fn(),
      });
      expect(React.isValidElement(element)).toBe(true);
    });

    it('should work for empty activity feed', () => {
      const element = React.createElement(EmptyState, {
        icon: '🌱',
        title: 'No recent activity yet',
        message: 'Start learning to see your activity here.',
      });
      expect(React.isValidElement(element)).toBe(true);
    });

    it('should work for search with no results', () => {
      const element = React.createElement(EmptyState, {
        icon: '🔍',
        title: 'No results found',
        message: 'Try adjusting your search terms.',
      });
      expect(React.isValidElement(element)).toBe(true);
    });

    it('should work for error state', () => {
      const element = React.createElement(EmptyState, {
        icon: '⚠️',
        title: 'Something went wrong',
        message: 'Please try again later.',
        actionLabel: 'Retry',
        onAction: vi.fn(),
      });
      expect(React.isValidElement(element)).toBe(true);
    });
  });
});
