import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ReportPrint from './index';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';
import useExtractShortIds from '@modules/analyze/hooks/useExtractShortIds';
import useQueryDateRange from '@modules/analyze/hooks/useQueryDateRange';
import useQueryMetricType from '@modules/analyze/hooks/useQueryMetricType';
import useVerifyDetailRangeQuery from '@modules/analyze/hooks/useVerifyDetailRangeQuery';
import { useStatusContext } from '@modules/analyze/context';

jest.mock(
  'next/dynamic',
  () => () =>
    function Preview({ selection }) {
      return (
        <pre aria-label="Captured report">{JSON.stringify(selection)}</pre>
      );
    }
);
jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      language: 'en',
      getFixedT: () => (_key, options) => options.defaultValue,
    },
  }),
}));
jest.mock('@modules/analyze/hooks/useCompareItems');
jest.mock('@modules/analyze/hooks/useExtractShortIds');
jest.mock('@modules/analyze/hooks/useQueryDateRange');
jest.mock('@modules/analyze/hooks/useQueryMetricType');
jest.mock('@modules/analyze/hooks/useVerifyDetailRangeQuery');
jest.mock('@modules/analyze/context');
jest.mock('@modules/analyze/store', () => ({
  chartUserSettingState: { repoType: 'governance' },
}));

const project = { label: 'project', shortCode: 'one', level: 'community' };
const dates = {
  timeStart: new Date('2026-01-01T00:00:00Z'),
  timeEnd: new Date('2026-06-30T00:00:00Z'),
};
const button = () =>
  screen.getByRole('button', { name: 'Print report / Save as PDF' });
beforeEach(() => {
  jest
    .mocked(useCompareItems)
    .mockReturnValue({ compareItems: [project] } as any);
  jest.mocked(useExtractShortIds).mockReturnValue({ shortIds: ['one'] } as any);
  jest.mocked(useQueryDateRange).mockReturnValue(dates as any);
  jest.mocked(useQueryMetricType).mockReturnValue('collaboration');
  jest
    .mocked(useVerifyDetailRangeQuery)
    .mockReturnValue({ isLoading: false } as any);
  jest
    .mocked(useStatusContext)
    .mockReturnValue({ status: 'success', isLoading: false } as any);
});

test('captures current effective parameters once, independent of later page changes', () => {
  const view = render(<ReportPrint />);
  fireEvent.click(button());
  const captured = JSON.parse(
    screen.getByLabelText('Captured report').textContent!
  );
  expect(captured).toMatchObject({
    projects: [project],
    start: dates.timeStart.toISOString(),
    end: dates.timeEnd.toISOString(),
    repoType: 'governance',
    language: 'en',
    topic: 'collaboration',
  });
  jest
    .mocked(useQueryDateRange)
    .mockReturnValue({ ...dates, timeStart: new Date('2026-05-01') } as any);
  jest.mocked(useCompareItems).mockReturnValue({
    compareItems: [{ ...project, label: 'changed' }],
  } as any);
  view.rerender(<ReportPrint />);
  expect(
    JSON.parse(screen.getByLabelText('Captured report').textContent!)
  ).toEqual(captured);
});

test.each([
  { timeStart: new Date('invalid'), timeEnd: dates.timeEnd },
  { timeStart: dates.timeStart, timeEnd: new Date('invalid') },
  { timeStart: dates.timeEnd, timeEnd: dates.timeStart },
])(
  'prevents an invalid or reversed date range from throwing on export',
  (range) => {
    jest.mocked(useQueryDateRange).mockReturnValue(range as any);
    render(<ReportPrint />);
    expect(button()).toBeDisabled();
  }
);

test('waits for contributor date-range verification to avoid capturing its temporary default', () => {
  jest.mocked(useQueryMetricType).mockReturnValue('contributor');
  jest
    .mocked(useVerifyDetailRangeQuery)
    .mockReturnValue({ isLoading: true } as any);
  const view = render(<ReportPrint />);
  expect(button()).toBeDisabled();
  jest
    .mocked(useVerifyDetailRangeQuery)
    .mockReturnValue({ isLoading: false } as any);
  view.rerender(<ReportPrint />);
  expect(button()).toBeEnabled();
});

test('does not export a comparison whose failed participants have been filtered out', () => {
  jest
    .mocked(useExtractShortIds)
    .mockReturnValue({ shortIds: ['one', 'failed'] } as any);
  render(<ReportPrint />);
  expect(button()).toBeDisabled();
});

test('blocks incomplete report status', () => {
  jest
    .mocked(useStatusContext)
    .mockReturnValue({ status: 'progress', isLoading: false } as any);
  render(<ReportPrint />);
  expect(button()).toBeDisabled();
});
