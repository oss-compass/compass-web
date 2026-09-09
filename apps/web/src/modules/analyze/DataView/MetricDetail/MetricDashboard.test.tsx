import React from 'react';
import { render, screen } from '@testing-library/react';
import { useMetricDashboardQuery } from '@oss-compass/graphql';
import MetricDashboard from './MetricDashboard';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { slugs: ['github.com', 'oss-compass', 'compass-web'] },
  }),
}));

jest.mock('@modules/analyze/hooks/useCompareItems', () => ({
  __esModule: true,
  default: () => ({
    compareItems: [
      { label: 'https://github.com/oss-compass/compass-web', level: 'repo' },
    ],
  }),
}));

jest.mock('@modules/analyze/hooks/useQueryDateRange', () => ({
  __esModule: true,
  default: () => ({ timeStart: '2026-01-01', timeEnd: '2026-02-01' }),
}));

jest.mock('@oss-compass/graphql', () => ({
  useMetricDashboardQuery: jest.fn(),
}));

jest.mock('@common/gqlClient', () => ({ __esModule: true, default: {} }));
jest.mock('@common/utils', () => jest.requireActual('@common/utils/number'));

const mockUseMetricDashboardQuery = useMetricDashboardQuery as jest.Mock;

describe.each([
  [
    'Issue',
    'issuesDetailOverview',
    'issueCompletionRatio',
    'issueCompletionCount',
  ],
  ['PR', 'pullsDetailOverview', 'pullCompletionRatio', 'pullCompletionCount'],
])('%s completion rate', (_name, overview, ratioField, countField) => {
  it.each([
    { ratio: 0, count: 0, expected: '0% (0)' },
    { ratio: 0, count: null, expected: '0% (0)' },
    { ratio: 0, count: undefined, expected: '0% (0)' },
    { ratio: 0.25, count: 3, expected: '25% (3)' },
    { ratio: 1, count: 12, expected: '100% (12)' },
    { ratio: 1 / 3, count: 4, expected: '33.3% (4)' },
    { ratio: null, count: 0, expected: '/' },
    { ratio: undefined, count: 0, expected: '/' },
  ])(
    'renders $expected for ratio $ratio and count $count',
    ({ ratio, count, expected }) => {
      mockUseMetricDashboardQuery.mockReturnValue({
        isLoading: false,
        data: { [overview]: { [ratioField]: ratio, [countField]: count } },
      });

      render(<MetricDashboard />);

      expect(screen.getByText(expected)).toBeInTheDocument();
    }
  );
});
