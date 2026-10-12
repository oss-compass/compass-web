import React from 'react';
import { act, cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import useHashchangeEvent from './useHashchangeEvent';

describe('hash navigation state', () => {
  function View() {
    const currentId = useHashchangeEvent();
    return (
      <>
        <output data-testid="selected">{currentId || 'default'}</output>
        <div id="first" data-testid="first" className="base-card" />
        <div id="second" data-testid="second" className="base-card" />
      </>
    );
  }

  function navigate(hash: string) {
    act(() => {
      window.history.replaceState(null, '', `/${hash}`);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });
    act(() => {
      jest.advanceTimersByTime(200);
    });
  }

  beforeEach(() => {
    jest.useFakeTimers();
    window.history.replaceState(null, '', '/#first');
  });

  function mountView() {
    render(<View />);
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(screen.getByTestId('first')).toHaveClass('card-hash-active-border');
  }

  afterEach(() => {
    cleanup();
    window.history.replaceState(null, '', '/');
    jest.useRealTimers();
  });

  it('returns to the default view when navigation clears the fragment', () => {
    mountView();
    navigate('');
    expect(screen.getByTestId('selected')).toHaveTextContent('default');
    expect(screen.getByTestId('first')).not.toHaveClass(
      'card-hash-active-border'
    );
  });

  it('removes the old card highlight when the new fragment has no matching card', () => {
    mountView();
    navigate('#missing');
    expect(screen.getByTestId('selected')).toHaveTextContent('missing');
    expect(screen.getByTestId('first')).not.toHaveClass(
      'card-hash-active-border'
    );
  });

  it('moves the highlight to a valid destination and ignores its query suffix', () => {
    mountView();
    navigate('#second?tab=1');
    expect(screen.getByTestId('selected')).toHaveTextContent('second');
    expect(screen.getByTestId('first')).not.toHaveClass(
      'card-hash-active-border'
    );
    expect(screen.getByTestId('second')).toHaveClass('card-hash-active-border');
  });
});
