import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import client from '@common/gqlClient';
import {
  ConfigValue,
  DEFAULT_CONFIG,
  StatusContextProvider,
} from '@modules/analyze/context';
import { Level } from '@modules/analyze/constant';
import MetricDetail from './index';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));
jest.mock('next/router', () => ({
  useRouter: () => ({ query: { slugs: 'a' } }),
}));
jest.mock('@common/gqlClient', () => ({
  __esModule: true,
  default: { request: jest.fn() },
}));
jest.mock('@modules/analyze/hooks/useHandleQueryParams', () => ({
  useHandleQueryParams: () => ({ handleQueryParams: jest.fn() }),
}));
jest.mock('@common/components/Tab', () => () => null);
jest.mock(
  '@modules/analyze/components/NavBar/MerticDatePicker',
  () => () => null
);
jest.mock('@modules/analyze/components/NavBar/LabelItems', () => () => null);
jest.mock('antd', () => ({ Select: () => null }));
jest.mock(
  './MetricContributor',
  () =>
    function MetricContributor() {
      return <div>Contributor details</div>;
    }
);
jest.mock(
  './MetricIssue',
  () =>
    function MetricIssue() {
      return <div>Issue details</div>;
    }
);
jest.mock(
  './MetricPr',
  () =>
    function MetricPr() {
      return <div>PR details</div>;
    }
);

const request = client.request as jest.Mock;
let queryClient: QueryClient;
const ready: ConfigValue = {
  ...DEFAULT_CONFIG,
  status: 'success',
  verifiedItems: [
    {
      label: 'https://github.com/compass/a',
      shortCode: 'a',
      level: Level.REPO,
      status: 'success',
      collections: [],
    },
  ],
};
function mount(status = ready) {
  return render(
    <QueryClientProvider client={queryClient}>
      <StatusContextProvider value={status}>
        <MetricDetail />
      </StatusContextProvider>
    </QueryClientProvider>
  );
}
beforeEach(() => {
  request.mockReset();
  queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
    logger: { log: console.log, warn: console.warn, error: () => {} },
  });
});
afterEach(() => queryClient.clear());
it.each(['pending', 'progress'])(
  'gates the detail route while the task is %s',
  async (status) => {
    mount({ ...ready, status });
    expect(
      screen.getByText(
        'analyze:the_current_project_is_under_analysis_please_visit'
      )
    ).toBeInTheDocument();
    expect(request).not.toHaveBeenCalled();
    expect(screen.queryByText('Contributor details')).not.toBeInTheDocument();
  }
);
it('gates task failure without querying the detail date range', () => {
  mount({ ...ready, status: 'error' });
  expect(screen.getByRole('alert')).toBeInTheDocument();
  expect(request).not.toHaveBeenCalled();
});
it('shows loading while the detail date range is being verified', () => {
  request.mockReturnValue(new Promise(() => {}));
  mount();
  expect(
    screen.getByRole('status', { name: 'common:loading' })
  ).toBeInTheDocument();
  expect(screen.queryByText('Contributor details')).not.toBeInTheDocument();
});
it('retries a failed date verification before mounting detail data', async () => {
  request
    .mockRejectedValueOnce(new Error('Verification failed'))
    .mockResolvedValueOnce({
      verifyDetailDataRange: { status: true, labelAdmin: false },
    });
  mount();
  await screen.findByRole('alert');
  expect(screen.queryByText('Contributor details')).not.toBeInTheDocument();
  fireEvent.click(
    screen.getByRole('button', { name: 'common:error.try_again' })
  );
  expect(await screen.findByText('Contributor details')).toBeInTheDocument();
  expect(request).toHaveBeenCalledTimes(2);
});
it('does not interpret the date-permission boolean as task progress', async () => {
  request.mockResolvedValue({
    verifyDetailDataRange: { status: false, labelAdmin: false },
  });
  mount();
  expect(await screen.findByText('Contributor details')).toBeInTheDocument();
  expect(
    screen.queryByText(
      'analyze:the_current_project_is_under_analysis_please_visit'
    )
  ).not.toBeInTheDocument();
});
