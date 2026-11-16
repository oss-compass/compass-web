import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import type { Repos } from '../api/common';
import RepoSelect from './index';

jest.mock('@tanstack/react-query', () => ({ useQuery: jest.fn() }), {
  virtual: true,
});
jest.mock(
  '@modules/submitProject/api',
  () => ({ defaultPageSize: 2, getRepos: jest.fn(), getOrgRepos: jest.fn() }),
  { virtual: true }
);
jest.mock('ahooks', () => ({ useDebounce: (value: string) => value }), {
  virtual: true,
});
jest.mock(
  '@modules/auth',
  () => ({
    useSubmitUser: () => ({
      submitUser: { nickname: 'owner', account: 'owner', provider: 'github' },
    }),
  }),
  { virtual: true }
);
jest.mock(
  'react-i18next',
  () => ({ useTranslation: () => ({ t: (key: string) => key }) }),
  { virtual: true }
);
jest.mock('react-icons/cg', () => ({ CgSpinner: () => null }), {
  virtual: true,
});
jest.mock(
  '@common/utils',
  () => ({ removeExtname: (value: string) => value.replace(/\.git$/, '') }),
  { virtual: true }
);
jest.mock(
  '@common/components/Input',
  () => {
    const React = require('react');
    return {
      __esModule: true,
      default: (props: React.InputHTMLAttributes<HTMLInputElement>) =>
        React.createElement('input', props),
    };
  },
  { virtual: true }
);
jest.mock(
  '@modules/submitProject/Form/SelectRepoSource',
  () => {
    const React = require('react');
    return {
      __esModule: true,
      default: ({ onChange }: { onChange: (value: unknown) => void }) =>
        React.createElement(
          'button',
          {
            onClick: () => onChange({ login: 'another-owner', isUser: false }),
          },
          'change-owner'
        ),
    };
  },
  { virtual: true }
);
jest.mock('./Loading', () => ({ __esModule: true, default: () => null }));
jest.mock('./RepoItem', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ name, updateAt }: { name: string; updateAt: string }) =>
      React.createElement(
        'div',
        {
          'data-testid': 'repository',
          'data-updated-at': updateAt,
        },
        name
      ),
  };
});

const mockedUseQuery = useQuery as jest.Mock;

const repository = (id: number, name = `repo-${id}`): Repos => ({
  id,
  name,
  full_name: `owner/${name}`,
  language: 'TypeScript',
  html_url: `https://github.com/owner/${name}`,
  updated_at: '2026-10-15T00:00:00Z',
});

const deliverPage = (repositories: Repos[]) => {
  const queryOptions =
    mockedUseQuery.mock.calls[mockedUseQuery.mock.calls.length - 1][2];
  act(() => queryOptions.onSuccess({ data: repositories }));
};

const renderedNames = () =>
  screen.queryAllByTestId('repository').map((element) => element.textContent);

describe('repository selector page responses', () => {
  beforeEach(() => {
    mockedUseQuery.mockReset().mockReturnValue({
      isLoading: false,
      isFetching: false,
      isError: false,
      error: null,
    });
  });

  it('renders the initial page in API order', () => {
    render(<RepoSelect onConfirm={jest.fn()} />);
    deliverPage([repository(1), repository(2)]);
    expect(renderedNames()).toEqual(['owner/repo-1', 'owner/repo-2']);
  });

  it('does not append duplicate cards when the first page is refetched', () => {
    render(<RepoSelect onConfirm={jest.fn()} />);
    deliverPage([repository(1), repository(2)]);
    deliverPage([repository(1), repository(2)]);
    expect(renderedNames()).toEqual(['owner/repo-1', 'owner/repo-2']);
  });

  it('appends a new page without dropping earlier repositories', () => {
    render(<RepoSelect onConfirm={jest.fn()} />);
    deliverPage([repository(1), repository(2)]);
    fireEvent.click(screen.getByText('submit_project:load_more'));
    deliverPage([repository(3), repository(4)]);
    expect(renderedNames()).toEqual([
      'owner/repo-1',
      'owner/repo-2',
      'owner/repo-3',
      'owner/repo-4',
    ]);
  });

  it('does not append duplicate cards when a later page is refetched', () => {
    render(<RepoSelect onConfirm={jest.fn()} />);
    deliverPage([repository(1), repository(2)]);
    fireEvent.click(screen.getByText('submit_project:load_more'));
    deliverPage([repository(3), repository(4)]);
    deliverPage([repository(3), repository(4)]);
    expect(renderedNames()).toEqual([
      'owner/repo-1',
      'owner/repo-2',
      'owner/repo-3',
      'owner/repo-4',
    ]);
  });

  it('updates an existing repository in place when its data changes', () => {
    render(<RepoSelect onConfirm={jest.fn()} />);
    deliverPage([repository(1), repository(2)]);
    deliverPage([
      {
        ...repository(1, 'renamed'),
        updated_at: '2026-10-15T01:00:00Z',
      },
    ]);
    expect(renderedNames()).toEqual(['owner/renamed', 'owner/repo-2']);
    expect(
      screen.getAllByTestId('repository')[0].getAttribute('data-updated-at')
    ).toBe('2026-10-15T01:00:00Z');
  });

  it('merges overlapping pages by repository ID', () => {
    render(<RepoSelect onConfirm={jest.fn()} />);
    deliverPage([repository(1), repository(2)]);
    fireEvent.click(screen.getByText('submit_project:load_more'));
    deliverPage([repository(2), repository(3)]);
    expect(renderedNames()).toEqual([
      'owner/repo-1',
      'owner/repo-2',
      'owner/repo-3',
    ]);
  });

  it('keeps distinct repositories that share a short name', () => {
    render(<RepoSelect onConfirm={jest.fn()} />);
    deliverPage([
      repository(1, 'shared'),
      { ...repository(2, 'shared'), full_name: 'another-owner/shared' },
    ]);
    expect(renderedNames()).toEqual(['owner/shared', 'another-owner/shared']);
  });

  it('clears the previous owner before accepting another owner response', () => {
    render(<RepoSelect onConfirm={jest.fn()} />);
    deliverPage([repository(1), repository(2)]);
    fireEvent.click(screen.getByText('change-owner'));
    deliverPage([repository(3)]);
    expect(renderedNames()).toEqual(['owner/repo-3']);
  });

  it('keeps loaded repositories when a subsequent page is empty', () => {
    render(<RepoSelect onConfirm={jest.fn()} />);
    deliverPage([repository(1), repository(2)]);
    fireEvent.click(screen.getByText('submit_project:load_more'));
    deliverPage([]);
    expect(renderedNames()).toEqual(['owner/repo-1', 'owner/repo-2']);
  });
});
