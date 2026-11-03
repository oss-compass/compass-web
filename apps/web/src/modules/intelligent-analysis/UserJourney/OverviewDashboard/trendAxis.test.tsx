import React from 'react';
import { render, screen } from '@testing-library/react';
import { getAdaptiveTrendAxis } from './trendAxis';
import { TrendChart } from './OverviewSummaryBlock';

it('keeps count ranges close to the data with integer ticks', () => {
  expect(getAdaptiveTrendAxis(447)).toEqual({
    max: 500,
    ticks: [500, 375, 250, 125, 0],
  });
  for (const count of [0, 1, 5, 19, 99, 447, 980, 10000]) {
    const axis = getAdaptiveTrendAxis(count);
    expect(axis.max).toBeGreaterThan(count);
    expect(axis.ticks.every(Number.isInteger)).toBe(true);
  }
});

it('scales small closure rates without exceeding 100%', () => {
  expect(getAdaptiveTrendAxis(3.6, true)).toEqual({
    max: 4,
    ticks: [4, 3, 2, 1, 0],
  });
  expect(getAdaptiveTrendAxis(100, true).max).toBe(100);
  expect(getAdaptiveTrendAxis(0, true).max).toBeGreaterThan(0);
  expect(getAdaptiveTrendAxis(NaN).max).toBeGreaterThan(0);
});

const points = [
  {
    weekStart: '2026-10-05',
    weekEnd: '2026-10-11',
    label: '10-11',
    total: 447,
    p0: 100,
    p1: 100,
    p2: 100,
    p3: 147,
    closeRate: 3.6,
  },
];

it('uses adaptive axes only for the contribution chart that opts in', () => {
  const { rerender } = render(
    <TrendChart points={points} fitContainerHeight adaptiveAxes />
  );
  for (const label of [
    '500',
    '375',
    '250',
    '125',
    '4%',
    '3%',
    '2%',
    '1%',
    '0%',
  ]) {
    expect(screen.getByText(label)).toBeInTheDocument();
  }
  expect(screen.queryByText('1000')).not.toBeInTheDocument();
  rerender(<TrendChart points={points} />);
  for (const label of [
    '1000',
    '750',
    '500',
    '250',
    '100%',
    '75%',
    '50%',
    '25%',
    '0%',
  ]) {
    expect(screen.getByText(label)).toBeInTheDocument();
  }
  expect(screen.queryByText('4%')).not.toBeInTheDocument();
});

it('places the total directly above the rendered stack rather than the total-count height', () => {
  render(
    <TrendChart
      points={[{ ...points[0], p0: 85, p1: 51, p2: 60, p3: 54 }]}
      fitContainerHeight
      adaptiveAxes
    />
  );
  // 实际堆叠为 250，绘图区为 32..156，Y 轴上限为 500。
  const stackTop = 156 - (250 / 500) * (156 - 32);
  expect(Number(screen.getByText('447').getAttribute('y'))).toBe(stackTop - 8);
});

it('keeps the total visible and separates the rate label when their positions collide', () => {
  render(
    <TrendChart
      points={[
        {
          ...points[0],
          total: 400,
          p0: 100,
          p1: 100,
          p2: 100,
          p3: 100,
          closeRate: 3.4,
        },
      ]}
      adaptiveAxes
    />
  );
  const totalY = Number(screen.getByText('400').getAttribute('y'));
  const rateY = Number(screen.getByText('3.4%').getAttribute('y'));
  expect(Math.abs(totalY - rateY)).toBeGreaterThanOrEqual(18);
});
