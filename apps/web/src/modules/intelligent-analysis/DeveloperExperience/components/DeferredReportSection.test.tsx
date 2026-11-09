import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import DeferredReportSection from './DeferredReportSection';

const originalObserver = global.IntersectionObserver;
let notify: IntersectionObserverCallback;
let disconnect: jest.Mock;

beforeEach(() => {
  disconnect = jest.fn();
  global.IntersectionObserver = jest.fn((callback) => {
    notify = callback;
    return { observe: jest.fn(), disconnect, unobserve: jest.fn() };
  }) as unknown as typeof IntersectionObserver;
});
afterEach(() => {
  global.IntersectionObserver = originalObserver;
  window.history.replaceState(null, '', '/');
});

const Counter = () => {
  const [count, setCount] = React.useState(0);
  return (
    <button onClick={() => setCount((value) => value + 1)}>导出 {count}</button>
  );
};

it('mounts details near the viewport and preserves table state after scrolling away', () => {
  render(
    <DeferredReportSection anchorId="details">
      <Counter />
    </DeferredReportSection>
  );
  expect(screen.queryByRole('button')).toBeNull();
  act(() =>
    notify(
      [{ isIntersecting: true }] as IntersectionObserverEntry[],
      {} as IntersectionObserver
    )
  );
  fireEvent.click(screen.getByRole('button', { name: '导出 0' }));
  act(() =>
    notify(
      [{ isIntersecting: false }] as IntersectionObserverEntry[],
      {} as IntersectionObserver
    )
  );
  expect(screen.getByRole('button', { name: '导出 1' })).toBeInTheDocument();
  expect(disconnect).toHaveBeenCalled();
});

it('renders anchored details immediately', () => {
  window.history.replaceState(null, '', '/#details');
  render(
    <DeferredReportSection anchorId="details">
      <Counter />
    </DeferredReportSection>
  );
  expect(screen.getByRole('button')).toBeInTheDocument();
});

it('renders details when IntersectionObserver is unavailable', () => {
  global.IntersectionObserver = undefined;
  render(
    <DeferredReportSection anchorId="details">
      <Counter />
    </DeferredReportSection>
  );
  expect(screen.getByRole('button')).toBeInTheDocument();
});

it('disconnects the observer when navigating away', () => {
  const view = render(
    <DeferredReportSection anchorId="details">
      <Counter />
    </DeferredReportSection>
  );
  view.unmount();
  expect(disconnect).toHaveBeenCalled();
});
