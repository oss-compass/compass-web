import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import EcosystemQueue from './EcosystemEvaluationMonitor/QueueTab/QueueOverview';
import TpcQueue from './SelectionEvaluationTPCMonitor/QueueTab/QueueOverview';
import { useQueueChartData } from '@modules/system-admin/hooks/useQueueChartApi';
import { useTpcQueueChartData } from '@modules/system-admin/hooks/useTpcQueueChartApi';

jest.mock('@modules/system-admin/hooks/useQueueChartApi', () => ({
  useQueueChartData: jest.fn(),
}));
jest.mock('@modules/system-admin/hooks/useTpcQueueChartApi', () => ({
  useTpcQueueChartData: jest.fn(),
}));
jest.mock('echarts', () => ({}));
jest.mock('antd', () => ({
  Card: ({ title, children }) => (
    <section>
      {title}
      {children}
    </section>
  ),
  Alert: () => null,
}));
jest.mock('@common/components/DateRangePicker', () => ({
  __esModule: true,
  default: ({ onChange }) => (
    <div>
      {['1M', '3M', '6M', '1Y', 'Since 2000'].map((range) => (
        <button key={range} onClick={() => onChange(range)}>
          {range}
        </button>
      ))}
      <button
        onClick={() =>
          onChange('custom', { start: '2025-01-02', end: '2025-02-03' })
        }
      >
        custom
      </button>
    </div>
  ),
}));

describe.each([
  { name: 'ecosystem', Component: EcosystemQueue, query: useQueueChartData },
  { name: 'TPC', Component: TpcQueue, query: useTpcQueueChartData },
])('$name queue calendar range', ({ Component, query }) => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    (query as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
    });
  });
  afterEach(() => jest.useRealTimers());

  function expectDates(begin: string, end: string) {
    expect(query).toHaveBeenLastCalledWith(
      expect.objectContaining({ begin_date: begin, end_date: end })
    );
  }

  it.each([4, 23])('keeps local calendar dates at hour %s', (hour) => {
    jest.setSystemTime(new Date(2026, 2, 15, hour));
    render(<Component />);
    expectDates('2026-02-15', '2026-03-15');
  });

  it('clamps a one-month range at the end of February', () => {
    jest.setSystemTime(new Date(2026, 2, 31, 12));
    render(<Component />);
    expectDates('2026-02-28', '2026-03-31');
  });

  it('clamps a six-month range instead of overflowing into May', () => {
    jest.setSystemTime(new Date(2026, 9, 31, 12));
    render(<Component />);
    fireEvent.click(screen.getByRole('button', { name: '6M' }));
    expectDates('2026-04-30', '2026-10-31');
  });

  it('clamps leap day when selecting the previous year', () => {
    jest.setSystemTime(new Date(2024, 1, 29, 12));
    render(<Component />);
    fireEvent.click(screen.getByRole('button', { name: '1Y' }));
    expectDates('2023-02-28', '2024-02-29');
  });

  it('keeps the fixed history start date', () => {
    jest.setSystemTime(new Date(2026, 2, 15, 12));
    render(<Component />);
    fireEvent.click(screen.getByRole('button', { name: 'Since 2000' }));
    expectDates('2000-01-01', '2026-03-15');
  });

  it('preserves explicit custom dates', () => {
    jest.setSystemTime(new Date(2026, 2, 15, 12));
    render(<Component />);
    fireEvent.click(screen.getByRole('button', { name: 'custom' }));
    expectDates('2025-01-02', '2025-02-03');
  });
});
