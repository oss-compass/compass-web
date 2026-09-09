import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ContributorsDetailListQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { getContributorExport } from '../../tableDownload';
import MetricTable from './index';

let mockRouterQuery: Record<string, string>;
const mockHandleQueryParams = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({ query: mockRouterQuery }),
}));
jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));
jest.mock('@common/gqlClient', () => ({
  __esModule: true,
  default: { request: jest.fn() },
}));
jest.mock('@modules/analyze/hooks/useHandleQueryParams', () => ({
  useHandleQueryParams: () => ({ handleQueryParams: mockHandleQueryParams }),
}));
jest.mock('@modules/analyze/hooks/useVerifyDetailRangeQuery', () => ({
  __esModule: true,
  default: () => ({ data: undefined }),
}));
jest.mock('@modules/analyze/hooks/useIsCurrentUser', () => ({
  useIsCurrentUser: () => ({ isCurrentUser: () => false }),
}));
jest.mock('@common/components/Dialog', () => () => null);
jest.mock(
  '@common/components/Tooltip',
  () =>
    function Tooltip({ children }) {
      return <>{children}</>;
    }
);
jest.mock('@common/components/OrgEdit/ManageOrgEdit', () => () => null);
jest.mock('./DomainPersona', () => () => null);
jest.mock('./ContributorName', () => () => null);
jest.mock('./RolePersona', () => () => null);
jest.mock('./ContributorDropdown', () => () => null);
jest.mock('../../tableDownload', () => ({
  ...jest.requireActual('../../tableDownload'),
  getContributorExport: jest.fn().mockResolvedValue({
    data: { status: 'complete', download_path: '/fixture.csv' },
  }),
  getContributorPolling: jest.fn(),
  apiDownloadFiles: jest.fn((_path, _name, onFinish) => onFinish()),
}));

// Keep the real query hook and Download component; only simplify table controls.
jest.mock(
  '@common/components/Table',
  () =>
    function Table({ pagination, dataSource = [], loading, onChange }) {
      const changePage = (current, pageSize = pagination.pageSize) =>
        onChange(
          { ...pagination, current, pageSize },
          { contributor: ['alice'] },
          { field: 'contribution', order: 'descend' }
        );
      return (
        <div>
          <output aria-label="Current page">{pagination.current}</output>
          <output aria-label="Page size">{pagination.pageSize}</output>
          <output aria-label="Total contributors">
            {pagination.total ?? 'unknown'}
          </output>
          <output aria-label="Loading">{String(loading)}</output>
          <button onClick={() => changePage(5)}>Page 5</button>
          <button onClick={() => changePage(pagination.current + 1)}>
            Next page
          </button>
          <button onClick={() => changePage(1, 20)}>20 per page</button>
          {dataSource.map((item) => (
            <div key={item.contributor}>
              <span>{item.contributor}</span>
              <span>
                {item.contributionTypeList
                  .map((entry) => entry.contributionType)
                  .join(',')}
              </span>
            </div>
          ))}
        </div>
      );
    }
);

const mockRequest = client.request as jest.Mock;
const baseProps = {
  label: 'https://github.com/oss-compass',
  level: 'community',
  beginDate: new Date('2026-01-01T00:00:00Z'),
  endDate: new Date('2026-06-01T00:00:00Z'),
  commonFilterOpts: [
    { type: 'mileage_type', values: ['core', 'regular'] },
    { type: 'is_bot', values: ['false'] },
  ],
};
const columnFilters = [{ type: 'contributor', values: ['alice'] }];
const sortOpts = { type: 'contribution', direction: 'desc' };
let queryClient: QueryClient;

const response = (name: string, count = 120): ContributorsDetailListQuery => ({
  contributorsDetailList: {
    count,
    origin: 'github',
    items: [
      {
        contributor: name,
        contribution: 12,
        contributionTypeList: [
          { contributionType: 'code_author', contribution: 8 },
          { contributionType: 'issue_creation', contribution: 4 },
        ],
      },
    ],
  },
});

const renderTable = (props = baseProps) => {
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return render(<MetricTable {...props} />, { wrapper });
};
const goToPageFive = async () => {
  await screen.findByText('page-1-size-10');
  fireEvent.click(screen.getByRole('button', { name: '20 per page' }));
  await screen.findByText('page-1-size-20');
  fireEvent.click(screen.getByRole('button', { name: 'Page 5' }));
  await screen.findByText('page-5-size-20');
};

beforeEach(() => {
  jest.clearAllMocks();
  mockRouterQuery = {
    filterOpts: JSON.stringify(columnFilters),
    sortOpts: JSON.stringify(sortOpts),
  };
  queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: Infinity, cacheTime: Infinity },
    },
  });
  mockRequest.mockImplementation(({ variables }) =>
    Promise.resolve(response(`page-${variables.page}-size-${variables.per}`))
  );
});

afterEach(() => queryClient.clear());

describe('contributor report pagination', () => {
  it.each<[string, Partial<typeof baseProps>]>([
    [
      'mileage',
      {
        commonFilterOpts: [
          { type: 'mileage_type', values: ['core'] },
          baseProps.commonFilterOpts[1],
        ],
      },
    ],
    [
      'bots',
      {
        commonFilterOpts: [
          baseProps.commonFilterOpts[0],
          { type: 'is_bot', values: ['false', 'true'] },
        ],
      },
    ],
    [
      'repository selection',
      {
        commonFilterOpts: [
          ...baseProps.commonFilterOpts,
          {
            type: 'repo_urls',
            values: ['https://github.com/oss-compass/compass-web'],
          },
        ],
      },
    ],
    ['begin date', { beginDate: new Date('2026-02-01T00:00:00Z') }],
    ['end date', { endDate: new Date('2026-05-01T00:00:00Z') }],
    ['report label', { label: 'https://github.com/oss-compass/compass-web' }],
    ['report level', { level: 'repo' }],
  ])('requests page 1 immediately when %s changes', async (_name, changes) => {
    const { rerender } = renderTable();
    await goToPageFive();
    mockRequest.mockClear();

    const props = { ...baseProps, ...changes };
    const { commonFilterOpts, ...report } = props;
    rerender(<MetricTable {...props} />);

    await screen.findByText('page-1-size-20');
    expect(mockRequest).toHaveBeenCalledTimes(1);
    expect(mockRequest.mock.calls[0][0].variables).toEqual({
      ...report,
      filterOpts: [...columnFilters, ...commonFilterOpts],
      sortOpts,
      page: 1,
      per: 20,
    });
    expect(screen.getByLabelText('Current page')).toHaveTextContent('1');
    expect(screen.getByLabelText('Page size')).toHaveTextContent('20');
  });

  it('keeps the page for equivalent props and allows normal pagination', async () => {
    const { rerender } = renderTable();
    await goToPageFive();
    mockRequest.mockClear();

    rerender(
      <MetricTable
        {...baseProps}
        beginDate={new Date(baseProps.beginDate.getTime())}
        endDate={new Date(baseProps.endDate.getTime())}
        commonFilterOpts={baseProps.commonFilterOpts.map((option) => ({
          ...option,
          values: [...option.values],
        }))}
      />
    );

    expect(screen.getByLabelText('Current page')).toHaveTextContent('5');
    expect(mockRequest).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Next page' }));
    await screen.findByText('page-6-size-20');
  });

  it('keeps page 1 when returning to a cached report and preserves page size', async () => {
    mockRequest.mockImplementation(({ variables }) =>
      Promise.resolve(
        response(
          variables.label === 'another-report'
            ? 'other-report-result'
            : `page-${variables.page}-size-${variables.per}`
        )
      )
    );
    const { rerender } = renderTable();
    await goToPageFive();
    rerender(<MetricTable {...baseProps} label="another-report" />);
    await screen.findByText('other-report-result');
    mockRequest.mockClear();

    rerender(<MetricTable {...baseProps} />);

    expect(screen.getByLabelText('Current page')).toHaveTextContent('1');
    expect(screen.getByText('page-1-size-20')).toBeInTheDocument();
    expect(screen.queryByText('other-report-result')).not.toBeInTheDocument();
    expect(mockRequest).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Next page' }));
    await screen.findByText('page-2-size-20');
  });

  it('ignores an old page response that arrives after the new report', async () => {
    let resolveOldPage: (value: ContributorsDetailListQuery) => void;
    const oldPage = new Promise<ContributorsDetailListQuery>((resolve) => {
      resolveOldPage = resolve;
    });
    mockRequest.mockImplementation(({ variables }) => {
      if (variables.label === 'new-report')
        return Promise.resolve(response('new-result', 3));
      if (variables.page === 5) return oldPage;
      return Promise.resolve(response('initial-result'));
    });
    const { rerender } = renderTable();
    await screen.findByText('initial-result');
    fireEvent.click(screen.getByRole('button', { name: 'Page 5' }));
    await waitFor(() => expect(mockRequest).toHaveBeenCalledTimes(2));

    rerender(<MetricTable {...baseProps} label="new-report" />);
    await screen.findByText('new-result');
    expect(screen.queryByText('initial-result')).not.toBeInTheDocument();
    await act(async () => {
      resolveOldPage(response('old-result', 999));
      await oldPage;
    });
    await waitFor(() => expect(queryClient.isFetching()).toBe(0));

    expect(screen.getByText('new-result')).toBeInTheDocument();
    expect(screen.queryByText('old-result')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Current page')).toHaveTextContent('1');
    expect(screen.getByLabelText('Total contributors')).toHaveTextContent(
      /^3$/
    );
  });

  it('exports the same reset page, filters, dates and sort as the table', async () => {
    const { rerender } = renderTable();
    await goToPageFive();
    const commonFilterOpts = [{ type: 'mileage_type', values: ['guest'] }];
    rerender(
      <MetricTable {...baseProps} commonFilterOpts={commonFilterOpts} />
    );
    await screen.findByText('page-1-size-20');

    fireEvent.click(screen.getByText('analyze:metric_detail.download_data'));

    await waitFor(() => expect(getContributorExport).toHaveBeenCalledTimes(1));
    expect(getContributorExport).toHaveBeenCalledWith({
      label: baseProps.label,
      level: baseProps.level,
      begin_date: baseProps.beginDate,
      end_date: baseProps.endDate,
      page: 1,
      per: 20,
      filter_opts: [...columnFilters, ...commonFilterOpts],
      sort_opts: [sortOpts],
    });
  });

  it('derives contribution-filtered rows without modifying cached results', async () => {
    mockRouterQuery.filterOpts = JSON.stringify([
      { type: 'contribution_type', values: ['code_author'] },
    ]);
    const result = response('filtered-contributor');
    const item = result.contributorsDetailList.items[0];
    Object.freeze(item.contributionTypeList);
    Object.freeze(item);
    mockRequest.mockResolvedValue(result);

    renderTable();

    await screen.findByText('filtered-contributor');
    expect(screen.getByText('code_author')).toBeInTheDocument();
    expect(item.contributionTypeList).toHaveLength(2);
  });
});
