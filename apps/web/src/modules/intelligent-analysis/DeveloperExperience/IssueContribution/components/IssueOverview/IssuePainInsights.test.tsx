import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server.node';
import type { IssueOverviewTopPain } from '../../types';
import { IssuePainProgressOverview } from './IssuePainInsights';

// Keep the real parent, progress classification, React rendering and Ant Design.
// Capture the chart's input instead of mounting its canvas; the unrelated detail
// modal and sparkline are outside these progress/denominator regressions.
jest.mock(
  '../../../../UserJourney/OverviewDashboard/OverviewSummaryBlock',
  () => ({
    TrendChart: ({ points }) => (
      <div data-trend-points={JSON.stringify(points)} />
    ),
    TrendWindowPicker: () => null,
  })
);
jest.mock('./IssuePainDetailModal', () => () => null);
jest.mock('./IssueTrendSparkline', () => () => null);

const PERIOD = '2026-10-01_to_2026-10-07';
const pain = (
  trackingStatus: number | string,
  values: Partial<IssueOverviewTopPain> = {}
): IssueOverviewTopPain =>
  ({
    community: 'fixture/repo',
    period: PERIOD,
    prio: 'P0',
    trackingType: 'fix',
    trackingStatus,
    ...values,
  } as IssueOverviewTopPain);

const render = (pains: IssueOverviewTopPain[]) => {
  const root = document.createElement('div');
  root.innerHTML = renderToStaticMarkup(
    <IssuePainProgressOverview
      pains={pains}
      repos={[]}
      reportHref={() => '/'}
    />
  );
  return root;
};

const card = (root: HTMLElement, label: string) =>
  Array.from(root.querySelectorAll('.ov-item'))
    .find((item) => item.querySelector('.ov-label')?.textContent === label)
    ?.querySelector('.ov-value')?.textContent;

const priority = (root: HTMLElement, index = 0) =>
  root.querySelectorAll('.pain-priority-row')[index];

const priorityRate = (root: HTMLElement, index = 0) =>
  priority(root, index).querySelector('.pain-priority-rate')?.textContent;

const widths = (root: HTMLElement, index = 0) =>
  Array.from(
    priority(root, index).querySelectorAll<HTMLButtonElement>(
      '.pain-status-bar button'
    )
  ).map((button) => button.style.width);

const trend = (root: HTMLElement) =>
  JSON.parse(
    root
      .querySelector('[data-trend-points]')
      ?.getAttribute('data-trend-points') || '[]'
  );

describe('Issue pain progress denominators', () => {
  it('excludes invalid issues from the overview closure denominator', () => {
    expect(card(render([pain(5), pain(6)]), '闭环率')).toBe('100.0%');
  });

  it('excludes invalid issues from a priority closure denominator', () => {
    expect(priorityRate(render([pain(5), pain(6)]))).toBe('100.0%');
  });

  it('excludes invalid issues from the weekly closure denominator', () => {
    expect(trend(render([pain(5), pain(6)]))[0].closeRate).toBe(100);
  });

  it('gives resolved tracked issues the complete priority bar', () => {
    expect(widths(render([pain(5), pain(6)]))).toEqual(['100%']);
  });

  it('gives pending tracked issues the complete priority bar', () => {
    expect(widths(render([pain(1), pain(6)]))).toEqual(['100%']);
  });

  it('retains pending and in-progress issues in the denominator', () => {
    const root = render([pain(1), pain(2), pain(5), pain(6), pain(6)]);
    expect(card(root, '闭环率')).toBe('33.3%');
    expect(priorityRate(root)).toBe('33.3%');
    expect(trend(root)[0].closeRate).toBeCloseTo(100 / 3);
  });

  it('excludes historical and invalid issues without hiding their total', () => {
    const root = render([
      pain(5),
      pain(6),
      pain(6, { trackingType: 'observe' }),
    ]);
    expect(card(root, '闭环率')).toBe('100.0%');
    expect(card(root, '问题总数')).toBe('3');
    expect(card(root, '历史感知痛点（需关注）')).toBe('1');
  });

  it('partitions each priority bar using only its own tracked issues', () => {
    const root = render([
      pain(5),
      pain(6),
      pain(1, { prio: 'P1' }),
      pain(6, { prio: 'P1' }),
      pain(2, { prio: 'P2' }),
      pain(6, { prio: 'P2' }),
      pain(5, { prio: 'P3' }),
      pain(1, { prio: 'P3' }),
      pain(6, { prio: 'P3' }),
    ]);
    expect([0, 1, 2, 3].map((index) => widths(root, index))).toEqual([
      ['100%'],
      ['100%'],
      ['100%'],
      ['50%', '50%'],
    ]);
  });

  it('keeps the overview and weekly zero-tracked convention for invalid-only data', () => {
    const root = render([pain(6)]);
    expect(card(root, '闭环率')).toBe('0.0%');
    expect(trend(root)[0].closeRate).toBe(0);
    expect(card(root, '问题总数')).toBe('1');
  });

  it('uses the existing neutral priority convention when every issue is invalid', () => {
    const root = render([pain(6)]);
    expect(priorityRate(root)).toBe('100.0%');
    expect(widths(root)).toEqual([]);
    expect(
      priority(root).querySelector('.pain-status-no-tracking')?.textContent
    ).toBe('0');
  });

  it('preserves the existing historical-only conventions', () => {
    const root = render([
      pain(1, { trackingType: 'observe' }),
      pain(5, { trackingType: 'observe' }),
    ]);
    expect(card(root, '闭环率')).toBe('0.0%');
    expect(priorityRate(root)).toBe('100.0%');
    expect(trend(root)[0].closeRate).toBe(0);
  });

  it('preserves the empty overview and empty trend state', () => {
    const root = render([]);
    expect(card(root, '闭环率')).toBe('0.0%');
    expect(priorityRate(root)).toBe('100.0%');
    expect(root.querySelector('.pain-trend-empty')?.textContent).toBe(
      '所选时间范围暂无数据'
    );
  });

  it('preserves a fully resolved tracked sample', () => {
    const root = render([pain(5), pain(5)]);
    expect(card(root, '闭环率')).toBe('100.0%');
    expect(priorityRate(root)).toBe('100.0%');
    expect(trend(root)[0].closeRate).toBe(100);
  });

  it('preserves a partially resolved tracked sample', () => {
    const root = render([pain(5), pain(7)]);
    expect(card(root, '闭环率')).toBe('50.0%');
    expect(widths(root)).toEqual(['50%', '50%']);
    expect(trend(root)[0].closeRate).toBe(50);
  });

  it('preserves a tracked sample with no resolved issues', () => {
    const root = render([pain(1), pain(2), pain(3), pain(7)]);
    expect(card(root, '闭环率')).toBe('0.0%');
    expect(priorityRate(root)).toBe('0.0%');
    expect(trend(root)[0].closeRate).toBe(0);
  });

  it('uses the existing classifier for string status values', () => {
    expect(card(render([pain('5'), pain('6')]), '闭环率')).toBe('100.0%');
  });

  it('keeps exclusions within their own weekly period and retains raw counts', () => {
    const second = '2026-10-08_to_2026-10-14';
    const root = render([
      pain(5),
      pain(6),
      pain(1, { period: second }),
      pain(6, { period: second }),
    ]);
    expect(
      trend(root).map(({ closeRate, total, p0 }) => ({ closeRate, total, p0 }))
    ).toEqual([
      { closeRate: 100, total: 2, p0: 2 },
      { closeRate: 0, total: 2, p0: 2 },
    ]);
  });

  it('does not mutate the input sample', () => {
    const pains = [pain(5), pain(6), pain(2)];
    const original = JSON.stringify(pains);
    pains.forEach(Object.freeze);
    Object.freeze(pains);
    render(pains);
    expect(JSON.stringify(pains)).toBe(original);
  });
});
