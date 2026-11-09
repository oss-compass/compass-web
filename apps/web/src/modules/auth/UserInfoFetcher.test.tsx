import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import client from '@common/gqlClient';
import { cookieSetAuthRole } from '@common/utils/cookie';
import UserInfoFetcher from './UserInfoFetcher';
import { isStandaloneExperiencePath } from './userInfoRoutes';
import { resetUserInfo, userEvent, userInfoStore } from './UserInfoStore';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));
jest.mock('@common/gqlClient', () => ({
  __esModule: true,
  default: { request: jest.fn() },
}));
jest.mock('@common/utils/cookie', () => ({
  cookieSetAuthRole: jest.fn(),
  cookieSetAuthBoardRole: jest.fn(),
}));
jest.mock('@oss-compass/graphql', () => ({
  useUserinfoQuery: (gqlClient, variables, options) =>
    require('@tanstack/react-query').useQuery(
      ['userinfo'],
      () => gqlClient.request('userinfo', variables),
      options
    ),
}));

const router = { pathname: '/', asPath: '/', isReady: true };
const request = client.request as jest.Mock;
let queryClient: QueryClient;

beforeEach(() => {
  jest.clearAllMocks();
  resetUserInfo();
  Object.assign(router, { pathname: '/', asPath: '/', isReady: true });
  (useRouter as jest.Mock).mockReturnValue(router);
  request.mockResolvedValue({ currentUser: { id: 'account', roleLevel: 3 } });
  queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, cacheTime: 0 } },
  });
});
afterEach(() => queryClient.clear());

const renderFetcher = () => {
  const element = () => (
    <QueryClientProvider client={queryClient}>
      <UserInfoFetcher />
    </QueryClientProvider>
  );
  return { ...render(element()), element };
};

it.each([
  '/intelligent-analysis/experience/issue-contribution?repo=cann%2Frepo',
  '/intelligent-analysis/experience/overview',
  '/intelligent-analysis/cann/experience/ci-experience',
  '/intelligent-analysis/[org]/experience/[experienceType]',
  '/intelligent-analysis/community-experience/repo-management',
  '/intelligent-analysis/cann/community-experience/task-management',
  '/zh/intelligent-analysis/cann/experience/issue-contribution',
])('skips GraphQL on independent experience route %s', async (path) => {
  router.pathname = path;
  router.asPath = path;
  renderFetcher();
  await act(async () => userInfoStore.event$?.emit(userEvent.REFRESH));
  expect(request).not.toHaveBeenCalled();
  expect(cookieSetAuthRole).not.toHaveBeenCalled();
  expect(userInfoStore.loading).toBe(false);
});

it.each([
  '/intelligent-analysis/user-journey',
  '/intelligent-analysis/submit-project',
  '/intelligent-analysis/my-submissions',
  '/intelligent-analysis/experience-other',
  '/settings/profile',
])('preserves userinfo requests on existing account route %s', async (path) => {
  expect(isStandaloneExperiencePath(path)).toBe(false);
  router.pathname = path;
  router.asPath = path;
  renderFetcher();
  await waitFor(() => expect(userInfoStore.currentUser?.id).toBe('account'));
  expect(request).toHaveBeenCalledTimes(1);
});

it('uses the page route before asPath is ready, without a hydration request', async () => {
  Object.assign(router, {
    pathname: '/intelligent-analysis/[org]/experience/[experienceType]',
    asPath: '/',
    isReady: false,
  });
  const view = renderFetcher();
  router.isReady = true;
  view.rerender(view.element());
  await act(async () => userInfoStore.event$?.emit(userEvent.REFRESH));
  expect(request).not.toHaveBeenCalled();
});

it('waits for router readiness on account pages', async () => {
  router.isReady = false;
  const view = renderFetcher();
  expect(request).not.toHaveBeenCalled();
  router.isReady = true;
  view.rerender(view.element());
  await waitFor(() => expect(request).toHaveBeenCalledTimes(1));
});

it('suppresses refresh on experience pages and resumes when navigating back', async () => {
  router.pathname = '/settings/profile';
  const view = renderFetcher();
  await waitFor(() => expect(userInfoStore.currentUser?.id).toBe('account'));
  (cookieSetAuthRole as jest.Mock).mockClear();
  router.pathname = '/intelligent-analysis/cann/community-experience';
  view.rerender(view.element());
  await act(async () => userInfoStore.event$?.emit(userEvent.REFRESH));
  expect(request).toHaveBeenCalledTimes(1);
  expect(cookieSetAuthRole).not.toHaveBeenCalled();
  router.pathname = '/settings/profile';
  view.rerender(view.element());
  await waitFor(() => expect(request).toHaveBeenCalledTimes(2));
});
