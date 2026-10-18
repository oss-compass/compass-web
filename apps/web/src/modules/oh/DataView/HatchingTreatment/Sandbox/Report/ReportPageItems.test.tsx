import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock(
  '@modules/oh/DataView/HatchingTreatment/Sandbox/Report/GetReportData',
  () => ({
    __esModule: true,
    default: ({ shortCode }: { shortCode: string }) => (
      <div>report:{shortCode}</div>
    ),
  })
);

import ReportPageItems from './ReportPageItems';

describe('ReportPageItems (sandbox)', () => {
  it('shows the not-found state when the report list is empty', () => {
    render(<ReportPageItems reportItems={[]} />);

    expect(screen.getByText('common:error.url_404')).toBeInTheDocument();
  });

  it('renders the report for a single item', () => {
    render(<ReportPageItems reportItems={[{ shortCode: 'xyz' }]} />);

    expect(screen.getByText('report:xyz')).toBeInTheDocument();
  });
});
