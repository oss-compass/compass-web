import React from 'react';
import { render, screen } from '@testing-library/react';
import PainIssueTable from './PainIssueTable';

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
