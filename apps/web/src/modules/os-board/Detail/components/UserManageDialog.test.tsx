import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import UserManageDialog from './UserManageDialog';

let resolvers: Array<(v: any) => void> = [];
const mockSearchAsync = jest.fn();

jest.mock('../../api/dashboard', () => ({
  useSearchUser: () => ({
    mutateAsync: (...args: any[]) => mockSearchAsync(...args),
  }),
  useAssignMembers: () => ({ mutateAsync: jest.fn(), isLoading: false }),
  useAuthorizedUsers: () => ({
    data: { data: [], total: 0 },
    isLoading: false,
    refetch: jest.fn(),
  }),
  useUpdateMemberRoles: () => ({}),
  useRemoveMembers: () => ({}),
}));

jest.mock('@oss-compass/ui', () => ({
  Button: (props: any) => <button {...props} />,
  Modal: ({ children, open }: any) => (open ? <div>{children}</div> : null),
}));

const searchFor = (value: string) => {
  fireEvent.change(screen.getByPlaceholderText('请输入被邀请者的用户名'), {
    target: { value },
  });
};

const flushDebounce = () => {
  act(() => {
    jest.advanceTimersByTime(350);
  });
};

beforeEach(() => {
  jest.useFakeTimers();
  resolvers = [];
  mockSearchAsync.mockReset();
  mockSearchAsync.mockImplementation(
    () =>
      new Promise((resolve) => {
        resolvers.push(resolve);
      })
  );
});

afterEach(() => {
  jest.useRealTimers();
});

describe('UserManageDialog user search', () => {
  it('does not reopen the dropdown when a stale response lands after the keyword was cleared', async () => {
    render(
      <UserManageDialog open={true} onClose={jest.fn()} dashboardId="d1" />
    );

    searchFor('alice');
    flushDebounce();
    expect(mockSearchAsync).toHaveBeenCalledTimes(1);

    searchFor('');
    expect(screen.queryByText('alice')).not.toBeInTheDocument();

    await act(async () => {
      resolvers[0]([{ id: 1, name: 'alice', email: '' }]);
    });

    expect(screen.queryByText('alice')).not.toBeInTheDocument();
  });

  it('keeps the newest search results when an older response resolves last', async () => {
    render(
      <UserManageDialog open={true} onClose={jest.fn()} dashboardId="d1" />
    );

    searchFor('a');
    flushDebounce();
    searchFor('ab');
    flushDebounce();
    expect(mockSearchAsync).toHaveBeenCalledTimes(2);

    await act(async () => {
      resolvers[1]([{ id: 2, name: 'bob', email: '' }]);
    });
    expect(screen.getByText('bob')).toBeInTheDocument();

    await act(async () => {
      resolvers[0]([{ id: 1, name: 'alice', email: '' }]);
    });

    expect(screen.queryByText('alice')).not.toBeInTheDocument();
    expect(screen.getByText('bob')).toBeInTheDocument();
  });
});
