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
