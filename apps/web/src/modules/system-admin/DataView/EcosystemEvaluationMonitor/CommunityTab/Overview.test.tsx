import React from 'react';
import { render, act } from '@testing-library/react';
import * as echarts from 'echarts';
import CommunityOverview from './Overview';

jest.mock('echarts', () => ({
  __esModule: true,
  getInstanceByDom: jest.fn(() => null),
  init: jest.fn(() => ({
    setOption: jest.fn(),
    dispose: jest.fn(),
    resize: jest.fn(),
  })),
}));

jest.mock('../../../hooks', () => ({
  useCommunityUpdateOverview: () => ({
    data: undefined,
    isLoading: false,
    error: undefined,
  }),
  useCommunityPlatformOverview: () => ({
    data: undefined,
    isLoading: false,
    error: undefined,
  }),
}));

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe('CommunityOverview chart lifecycle', () => {
  it('removes the chart resize listeners on unmount', () => {
    jest.useFakeTimers();

    const addSpy = jest.spyOn(window, 'addEventListener');
    const removeSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = render(<CommunityOverview />);

    // both charts schedule their deferred initialization
    expect(jest.getTimerCount()).toBeGreaterThanOrEqual(2);

    // let the deferred chart initialization run
    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect((echarts.init as jest.Mock).mock.calls.length).toBe(2);

    const addedResizeListeners = addSpy.mock.calls.filter(
      ([type]) => type === 'resize'
    ).length;
    expect(addedResizeListeners).toBe(2);

    unmount();

    const removedResizeListeners = removeSpy.mock.calls.filter(
      ([type]) => type === 'resize'
    ).length;
    expect(removedResizeListeners).toBe(2);

    jest.useRealTimers();
  });
});
