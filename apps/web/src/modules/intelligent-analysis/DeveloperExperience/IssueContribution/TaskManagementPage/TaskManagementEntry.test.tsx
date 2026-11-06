import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskManagementEntry from './TaskManagementEntry';
import { fetchIssueTaskManagementAccess } from '../data';
import { buildIssueTaskManagementHref } from '../../routes';

jest.mock('../data', () => ({ fetchIssueTaskManagementAccess: jest.fn() }));
jest.mock(
  'next/link',
  () =>
    function MockLink({
      href,
      children,
    }: {
      href: string;
      children: React.ReactNode;
    }) {
      return <a href={href}>{children}</a>;
    }
);
const mockAccess = jest.mocked(fetchIssueTaskManagementAccess);
afterEach(() => jest.clearAllMocks());

it('always shows the entry without checking login or permissions', () => {
  render(<TaskManagementEntry />);
  expect(screen.getByRole('link', { name: '任务管理' })).toBeInTheDocument();
  expect(mockAccess).not.toHaveBeenCalled();
});
it('keeps the selected organization in the management link', () => {
  render(<TaskManagementEntry org="cann" />);
  expect(screen.getByRole('link', { name: '任务管理' })).toHaveAttribute(
    'href',
    buildIssueTaskManagementHref({ org: 'cann' })
  );
});
