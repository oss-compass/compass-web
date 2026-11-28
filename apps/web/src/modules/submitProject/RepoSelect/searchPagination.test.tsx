import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { defaultPageSize, Repos } from '../api/common';
import RepoSelect from './index';

jest.mock('axios');
jest.mock('@modules/auth', () => ({
  useSubmitUser: () => ({
    submitUser: { nickname: 'owner', account: 'owner', provider: 'github' },
  }),
}));
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));
jest.mock('@modules/submitProject/Form/SelectRepoSource', () => ({
  __esModule: true,
  default: ({ onChange }) => (
    <button onClick={() => onChange({ login: 'team', isUser: false })}>
      Select organization
    </button>
  ),
}));

const mockedGet = axios.get as jest.MockedFunction<typeof axios.get>;
const repository = (id: number, name = `repo-${id}`): Repos => ({
  id,
  name,
  full_name: `owner/${name}`,
  language: 'TypeScript',
  html_url: `https://github.com/owner/${name}`,
  updated_at: '2026-01-01T00:00:00Z',
});
const firstPage = Array.from({ length: defaultPageSize }, (_, i) =>
  repository(i)
);

let queryClient: QueryClient;

beforeEach(() => {
  mockedGet.mockReset();
  queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, cacheTime: 0 } },
  });
});

afterEach(() => queryClient.clear());

const renderSelector = () => {
  const onConfirm = jest.fn();
  render(
    <QueryClientProvider client={queryClient}>
      <RepoSelect onConfirm={onConfirm} />
    </QueryClientProvider>
  );
  return { onConfirm };
};

const searchFor = (value: string) => {
  fireEvent.change(screen.getByPlaceholderText('submit_project:search'), {
    target: { value },
  });
};

describe('repository search pagination', () => {
  it.each(['user', 'organization'])(
    'can load and select a matching repository from the next %s page',
    async (source) => {
      mockedGet.mockImplementation(async (_url, config) => ({
        data:
          config?.params.page === 2
            ? [repository(defaultPageSize, 'target')]
            : firstPage,
      }));
      const { onConfirm } = renderSelector();
      await screen.findByText('owner/repo-0');

      if (source === 'organization') {
        fireEvent.click(screen.getByText('Select organization'));
        await screen.findByText('owner/repo-0');
      }
      searchFor('target');
      await screen.findByText('submit_project:no_result');
      fireEvent.click(screen.getByText('submit_project:load_more'));

      await screen.findByText('owner/target');
      expect(mockedGet).toHaveBeenLastCalledWith(
        source === 'user'
          ? 'https://api.github.com/users/owner/repos'
          : 'https://api.github.com/orgs/team/repos',
        expect.objectContaining({
          params: expect.objectContaining({
            page: 2,
            per_page: defaultPageSize,
          }),
        })
      );
      fireEvent.click(
        screen.getByRole('button', { name: 'submit_project:pick_it' })
      );
      expect(onConfirm).toHaveBeenCalledWith('https://github.com/owner/target');
      expect(
        screen.queryByText('submit_project:load_more')
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('submit_project:no_result')
      ).not.toBeInTheDocument();
    }
  );

  it('keeps pagination available for existing matches without fetching twice', async () => {
    mockedGet.mockResolvedValueOnce({ data: firstPage });
    mockedGet.mockImplementationOnce(() => new Promise(() => {}));
    renderSelector();
    await screen.findByText('owner/repo-0');
    searchFor('repo-0');
    await waitFor(() =>
      expect(screen.queryByText('owner/repo-1')).not.toBeInTheDocument()
    );

    fireEvent.click(screen.getByText('submit_project:load_more'));
    const fetching = await screen.findByText('submit_project:fetching');
    fireEvent.click(fetching);
    expect(mockedGet).toHaveBeenCalledTimes(2);
    expect(screen.getByText('owner/repo-0')).toBeInTheDocument();
  });

  it('does not offer more pages after an exhausted search', async () => {
    mockedGet.mockResolvedValue({ data: [repository(0)] });
    renderSelector();
    await screen.findByText('owner/repo-0');
    searchFor('missing');

    await screen.findByText('submit_project:no_result');
    expect(
      screen.queryByText('submit_project:load_more')
    ).not.toBeInTheDocument();
  });

  it('does not offer more pages when the repository request fails', async () => {
    mockedGet.mockRejectedValue({
      response: { data: { message: 'Unavailable' } },
    });
    renderSelector();
    await screen.findByText('Unavailable');
    searchFor('target');

    await screen.findByText('submit_project:no_result');
    expect(
      screen.queryByText('submit_project:load_more')
    ).not.toBeInTheDocument();
  });
});
