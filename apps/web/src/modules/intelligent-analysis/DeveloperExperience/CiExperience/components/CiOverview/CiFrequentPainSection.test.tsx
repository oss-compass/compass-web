import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import CiFrequentPainSection from './CiFrequentPainSection';
import type { CiTopIssue } from './communityMetrics';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })),
  });
});

const issue = (
  key: string,
  kb: string,
  status: CiTopIssue['status'] = 'pending'
): CiTopIssue => ({
  key,
  problemKey: key,
  repo: key,
  slug: key,
  workflow: 'ci',
  day: '2026-11-03',
  kb,
  title: `实际问题 ${key}`,
  pri: 'P2',
  status,
  dim: '稳定性',
  journeyStages: ['编译'],
  impact: {},
});

it('limits the ranking to five groups and opens details matching each closure view', async () => {
  const issues = [
    issue('one', '执行失败'),
    issue('two', '执行失败', 'confirmed'),
    issue('three', '执行失败', 'fixed'),
    ...Array.from({ length: 5 }, (_, index) =>
      issue(`extra-${index}`, `其他问题${index}`)
    ),
  ];
  render(
    <CiFrequentPainSection
      issues={issues}
      reportHref={(repo) => `/ci?repo=${repo}`}
    />
  );
  expect(screen.getByRole('heading', { name: 'TOP 问题' })).toBeInTheDocument();
  const card = within(screen.getByRole('region', { name: '高频问题 TOP5' }));
  expect(
    card.getAllByRole('button', { name: /^查看.*的问题数，/ })
  ).toHaveLength(5);
  fireEvent.click(
    card.getByRole('button', { name: '查看执行失败的问题数，3项' })
  );
  let dialog = within(screen.getByRole('dialog'));
  expect(
    dialog.getAllByRole('link', { name: '查看报告', exact: true })
  ).toHaveLength(3);
  fireEvent.click(dialog.getByRole('button', { name: 'Close', exact: true }));
  await waitFor(() =>
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  );

  fireEvent.click(card.getByRole('radio', { name: '未闭环', exact: true }));
  fireEvent.click(
    card.getByRole('button', { name: '查看执行失败的未闭环问题数，2项' })
  );
  dialog = within(screen.getByRole('dialog'));
  expect(
    dialog.getAllByRole('link', { name: '查看报告', exact: true })
  ).toHaveLength(2);
  expect(dialog.queryByText('已闭环')).not.toBeInTheDocument();
  fireEvent.click(dialog.getByRole('button', { name: 'Close', exact: true }));
  await waitFor(() =>
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  );

  fireEvent.click(card.getByRole('radio', { name: '已闭环', exact: true }));
  fireEvent.click(
    card.getByRole('button', { name: '查看执行失败的已闭环问题数，1项' })
  );
  dialog = within(screen.getByRole('dialog'));
  expect(
    dialog.getByRole('link', { name: '查看报告', exact: true })
  ).toHaveAttribute('href', '/ci?repo=three');
  expect(dialog.getByText('已闭环')).toBeInTheDocument();
});

it('shows an empty result without placeholder problems', () => {
  render(<CiFrequentPainSection issues={[]} reportHref={() => '/ci'} />);
  expect(screen.getByText('暂无匹配问题')).toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: /^查看.*的问题数，/ })
  ).not.toBeInTheDocument();
});
