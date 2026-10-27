import React from 'react';
import { render, screen, within } from '@testing-library/react';
import PainIssueTable from './PainIssueTable';
import type { IssuePainTracking } from '../types';
import { IssuePainTrackingStatus } from '../types';

describe('PainIssueTable with overview slim Issue data', () => {
  it('renders an archived Issue before the full detail request finishes', () => {
    render(
      <PainIssueTable
        issues={[{ number: '202', score: null, metric_code: '' }]}
        pagination={false}
      />
    );

    expect(screen.getByText('#202')).toBeInTheDocument();
  });
});

describe('PainIssueTable independent review operations', () => {
  it('locks only the pending-review row while a fixed valid Issue can retest', () => {
    const tracking = {
      trackingKey: 'repo#I3#metric',
      status: IssuePainTrackingStatus.PENDING,
      trackingType: 'fix',
      history: [],
      archivedIssues: [],
      activeIssues: [
        {
          number: '609',
          valid: null,
          fixed: false,
          invalid_review: { status: 'pending', reason: '非项目问题' },
        },
        { number: '610', valid: true, fixed: true, retest_status: 'pending' },
      ],
    } as unknown as IssuePainTracking;
    render(
      <PainIssueTable
        issues={[
          { number: '609', score: 20, metric_code: '' },
          { number: '610', score: 60, metric_code: '' },
        ]}
        tracking={tracking}
        operationsOnly
        onTrackingAction={jest.fn()}
        onRerun={jest.fn()}
      />
    );
    const pendingRow = screen.getByRole('row', { name: /#609\b/ });
    expect(
      within(pendingRow).getByText('非有效判定待审核')
    ).toBeInTheDocument();
    expect(within(pendingRow).getByRole('checkbox')).toBeDisabled();
    expect(
      within(pendingRow).queryByRole('button', { name: '判定为非有效问题' })
    ).not.toBeInTheDocument();
    const validRow = screen.getByRole('row', { name: /#610\b/ });
    expect(
      within(validRow).getByRole('button', { name: /发起复测/ })
    ).toBeEnabled();
    expect(within(validRow).getByRole('checkbox')).toBeEnabled();
  });
});

describe('PainIssueTable evidence actors', () => {
  it.each([
    { actor: 'maintainer', expected: 'maintainer' },
    { actor: { login: 'octocat', id: 1 }, expected: 'octocat' },
    { actor: { name: 'Maintainer' }, expected: 'Maintainer' },
    { actor: null, expected: '' },
    { actor: {}, expected: '' },
  ])('renders actor $actor safely', ({ actor, expected }) => {
    render(
      <PainIssueTable
        issues={[
          {
            number: '203',
            score: 40,
            metric_code: '',
            evidence: [
              {
                type: 'comment',
                actor,
                text: 'Evidence text',
                url: '',
                time: '',
              },
            ],
          },
        ]}
        pagination={false}
      />
    );
    expect(screen.getByText('Evidence text')).toBeInTheDocument();
    if (expected) expect(screen.getByText(`${expected}：`)).toBeInTheDocument();
    expect(screen.queryByText(/\[object Object\]/)).not.toBeInTheDocument();
  });
});
