import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import client from '@common/gqlClient';
import OrgEdit from './index';
import OrgInput from './OrgInput';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key, i18n: { language: 'en' } }),
}));
jest.mock('@common/gqlClient', () => ({
  __esModule: true,
  default: { request: jest.fn() },
}));
jest.mock('react-hot-toast', () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

const request = client.request as jest.Mock;
const clients: QueryClient[] = [];
const mutations = () =>
  request.mock.calls
    .map(([params]) => params)
    .filter(({ document }) => document.includes('mutation modifyUserOrgs'))
    .map(({ variables }) => variables);
const searchRequests = () =>
  request.mock.calls
    .map(([params]) => params.variables.keyword)
    .filter((keyword) => keyword !== undefined);

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

afterEach(() => {
  clients.splice(0).forEach((queryClient) => queryClient.clear());
  jest.clearAllMocks();
});

const renderWithQueries = (
  element: React.ReactElement,
  search: (
    keyword: string
  ) => Promise<{ orgFuzzySearch: { orgName: string }[] }> = (keyword) =>
    Promise.resolve({ orgFuzzySearch: [{ orgName: keyword }] })
) => {
  request.mockImplementation(({ document, variables }) => {
    if (document.includes('mutation modifyUserOrgs')) {
      return Promise.resolve({ modifyUserOrgs: { status: 'true' } });
    }
    return search(variables.keyword);
  });
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, cacheTime: 0 } },
    logger: { log: console.log, warn: console.warn, error: jest.fn() },
  });
  clients.push(queryClient);
  return {
    queryClient,
    ...render(
      <QueryClientProvider client={queryClient}>{element}</QueryClientProvider>
    ),
  };
};

const editOrganization = () => (
  <OrgEdit
    organizations={[
      {
        orgName: 'Original Org',
        firstDate: '2020-01-01',
        lastDate: '2021-01-01',
      },
    ]}
    type="edit"
    index={0}
    provider="github"
    setShowEdit={jest.fn()}
    onSuccess={jest.fn()}
  />
);
const nameInput = () => screen.getByPlaceholderText('common:org_name');
const confirm = () =>
  fireEvent.click(screen.getByRole('button', { name: 'common:btn.confirm' }));
const expectSubmittedName = async (name: string) => {
  await waitFor(() => expect(mutations()).toHaveLength(1));
  expect(mutations()[0]).toEqual({
    platform: 'github',
    organizations: [
      { orgName: name, firstDate: '2020-01-01', lastDate: '2021-01-01' },
    ],
  });
};

describe('organization input and form values', () => {
  it('keeps an unchanged organization and dates when confirming', async () => {
    renderWithQueries(editOrganization());
    confirm();
    await expectSubmittedName('Original Org');
  });

  it('validates a cleared name instead of submitting the previous organization', async () => {
    renderWithQueries(editOrganization());
    fireEvent.change(nameInput(), { target: { value: '' } });
    confirm();

    await waitFor(() =>
      expect(nameInput()).toHaveClass('ant-input-status-error')
    );
    expect(mutations()).toHaveLength(0);
  });

  it('submits typed text even when matching suggestions have not been selected', async () => {
    renderWithQueries(editOrganization());
    fireEvent.focus(nameInput());
    fireEvent.change(nameInput(), { target: { value: 'New Org' } });
    await screen.findByText('New Org');
    confirm();

    await expectSubmittedName('New Org');
  });

  it('keeps explicit suggestion selection working', async () => {
    renderWithQueries(editOrganization());
    fireEvent.focus(nameInput());
    fireEvent.change(nameInput(), { target: { value: 'New Org' } });
    fireEvent.click(await screen.findByText('New Org'));
    confirm();

    await expectSubmittedName('New Org');
  });

  it('reports free text immediately without waiting for autocomplete', () => {
    const onChange = jest.fn();
    renderWithQueries(
      <OrgInput value="" onChange={onChange} placeholder="Organization" />,
      () => new Promise(() => {})
    );
    fireEvent.change(screen.getByPlaceholderText('Organization'), {
      target: { value: 'Unlisted Org' },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('Unlisted Org');
  });

  it('submits current text while autocomplete is still pending', async () => {
    renderWithQueries(editOrganization(), (keyword) =>
      keyword === 'Pending Org'
        ? new Promise(() => {})
        : Promise.resolve({ orgFuzzySearch: [{ orgName: keyword }] })
    );
    fireEvent.change(nameInput(), { target: { value: 'Pending Org' } });
    await waitFor(() => expect(searchRequests()).toContain('Pending Org'));
    confirm();

    await expectSubmittedName('Pending Org');
  });

  it('submits current text after autocomplete fails', async () => {
    const { queryClient } = renderWithQueries(editOrganization(), (keyword) =>
      keyword === 'Offline Org'
        ? Promise.reject(new Error('Autocomplete unavailable'))
        : Promise.resolve({ orgFuzzySearch: [{ orgName: keyword }] })
    );
    fireEvent.change(nameInput(), { target: { value: 'Offline Org' } });
    await waitFor(() => expect(searchRequests()).toContain('Offline Org'));
    await waitFor(() => expect(queryClient.isFetching()).toBe(0));
    confirm();

    await expectSubmittedName('Offline Org');
  });

  it('does not overwrite newer text when an earlier empty search completes', async () => {
    let resolveEarlier: (result: {
      orgFuzzySearch: { orgName: string }[];
    }) => void;
    const earlierResult = new Promise<{
      orgFuzzySearch: { orgName: string }[];
    }>((resolve) => {
      resolveEarlier = resolve;
    });
    renderWithQueries(editOrganization(), (keyword) =>
      keyword === 'Earlier Org'
        ? earlierResult
        : Promise.resolve({ orgFuzzySearch: [{ orgName: keyword }] })
    );
    fireEvent.change(nameInput(), { target: { value: 'Earlier Org' } });
    await waitFor(() => expect(searchRequests()).toContain('Earlier Org'));
    fireEvent.change(nameInput(), { target: { value: 'Latest Org' } });
    await act(async () => {
      resolveEarlier({ orgFuzzySearch: [] });
      await earlierResult;
      // React Query batches observer callbacks on the next notification tick.
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    confirm();

    expect(nameInput()).toHaveValue('Latest Org');
    await expectSubmittedName('Latest Org');
  });
});
