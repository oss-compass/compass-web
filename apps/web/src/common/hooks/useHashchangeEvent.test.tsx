import { renderHook, act, waitFor, screen } from '@testing-library/react';
import useHashchangeEvent from './useHashchangeEvent';

describe('useHashchangeEvent', () => {
  afterEach(() => {
    window.location.hash = '';
  });

  it('returns the initial hash without the query string', () => {
    window.location.hash = '#organizations_activity_overview?tab=1';
    const { result } = renderHook(() => useHashchangeEvent());
    expect(result.current).toBe('organizations_activity_overview');
  });

  it('tracks hashchange events', async () => {
    window.location.hash = '';
    const { result } = renderHook(() => useHashchangeEvent());
    expect(result.current).toBe('');

    act(() => {
      window.location.hash = '#contribution_last';
    });
    await waitFor(() => expect(result.current).toBe('contribution_last'));
  });

  it('does not throw when the hash contains a malformed percent sequence', () => {
    window.location.hash = '#contributors%';
    jest.useFakeTimers();
    try {
      const { result } = renderHook(() => useHashchangeEvent());
      expect(result.current).toBe('contributors%');
      act(() => {
        jest.advanceTimersByTime(200);
      });
    } finally {
      jest.useRealTimers();
    }
  });

  it('highlights the matching card after the debounce', () => {
    document.body.innerHTML =
      '<div id="organizations_activity_overview" class="base-card" data-testid="hash-card"></div>';
    window.location.hash = '#organizations_activity_overview';
    jest.useFakeTimers();
    try {
      renderHook(() => useHashchangeEvent());
      act(() => {
        jest.advanceTimersByTime(200);
      });
      expect(screen.getByTestId('hash-card')).toHaveClass(
        'card-hash-active-border'
      );
    } finally {
      jest.useRealTimers();
      document.body.innerHTML = '';
    }
  });
});
