import React from 'react';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { ConfigProvider, message, unstableSetRender } from 'antd';
import { createRoot, Root } from 'react-dom/client';
import zhCN from 'antd/locale/zh_CN';
import axios, {
  AxiosHeaders,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import jsCookie from 'js-cookie';
import UserManagement from './index';

const LIST_URL = '/api/v2/admin/manage_user_list';

type ListRequest = {
  keywords: string;
  page: number;
  per_page: number;
  role_levels?: number[];
};

type ListResponse = {
  total: number;
  page: number;
  per_page: number;
  data: {
    id: number;
    name: string;
    email: string;
    role_level: number;
    role_level_desc: string;
    last_sign_in_at: string;
    created_at: string;
  }[];
};

type PendingRequest = {
  body: ListRequest;
  settled: boolean;
  succeed: (body: ListResponse) => void;
  fail: (error: Error) => void;
};

// These are local example records, not real accounts or a replacement producer.
// Each complete page matches admin.rb's total/page/per_page/data response shape.
const pageOf = (
  prefix: string,
  count: number,
  firstId: number
): ListResponse => ({
  total: count,
  page: 1,
  per_page: 20,
  data: Array.from({ length: count }, (_, index) => ({
    id: firstId + index,
    name: prefix + ' user ' + (index + 1),
    email: prefix.toLowerCase() + (index + 1) + '@example.test',
    role_level: 0,
    role_level_desc: '普通用户',
    last_sign_in_at: '2026-10-01 08:00:00',
    created_at: '2026-09-01 08:00:00',
  })),
});

const seedPage = pageOf('Seed', 1, 100);
const olderPage = pageOf('Older', 2, 200);
const newerPage = pageOf('Newer', 3, 300);

function expectLoading(container: HTMLElement, active: boolean) {
  // Real AntD Table Spin has no named status role; inspect its rendered marker.
  // No MyTable, AntD, React state, or product function is replaced in this suite.
  // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
  expect(container.querySelector('.ant-spin-spinning') !== null).toBe(active);
}

function expectPage(body: ListResponse) {
  for (const user of body.data) {
    expect(screen.getByText(user.name, { exact: true })).toBeTruthy();
    expect(screen.getByText(user.email, { exact: true })).toBeTruthy();
  }
  expect(
    screen.getByText(
      '第 1-' + body.data.length + ' 条/共 ' + body.total + ' 条',
      { exact: true }
    )
  ).toBeTruthy();
  const currentPages = screen.getAllByTitle(String(body.page));
  // AntD marks the actual current pagination item by this rendered class.
  const hasCurrentPage = currentPages.some(
    // eslint-disable-next-line testing-library/no-node-access
    (item) => item.classList.contains('ant-pagination-item-active')
  );
  expect(hasCurrentPage).toBe(true);
  expect(
    screen.getByText(new RegExp('^' + body.per_page + ' *条/页$'))
  ).toBeTruthy();
}

function searchFor(keywords: string) {
  fireEvent.change(screen.getByPlaceholderText('搜索用户名或邮箱'), {
    target: { value: keywords },
  });
  fireEvent.click(screen.getByRole('button', { name: /^搜\s*索$/ }));
}

describe('UserManagement list request ownership', () => {
  let requests: PendingRequest[];
  let previousLocale: string | undefined;

  const antDRoots = new Map<Element | DocumentFragment, Root>();
  const originalRenderer = unstableSetRender();
  const originalMatchMedia = Object.getOwnPropertyDescriptor(
    window,
    'matchMedia'
  );

  beforeAll(() => {
    // JSDOM does not expose this browser resource; no layout or query state is simulated.
    if (typeof window.matchMedia !== 'function') {
      Object.defineProperty(window, 'matchMedia', {
        configurable: true,
        value: (media: string) => ({
          matches: false,
          media,
          onchange: null,
          addListener() {},
          removeListener() {},
          addEventListener() {},
          removeEventListener() {},
          dispatchEvent() {
            return true;
          },
        }),
      });
    }
    // AntD v5's supported React 19 registration uses the real React DOM client.
    // Keep the actual message, Table, Spin and pagination implementations rendered.
    unstableSetRender((node, container) => {
      let root = antDRoots.get(container);
      if (!root) {
        root = createRoot(container);
        antDRoots.set(container, root);
      }
      root.render(node);
      return async () => {
        await Promise.resolve();
        root.unmount();
        antDRoots.delete(container);
      };
    });
  });

  afterAll(async () => {
    try {
      await act(async () => {
        antDRoots.forEach((root) => root.unmount());
        antDRoots.clear();
      });
    } finally {
      unstableSetRender(originalRenderer);
      if (originalMatchMedia) {
        Object.defineProperty(window, 'matchMedia', originalMatchMedia);
      } else {
        Reflect.deleteProperty(window, 'matchMedia');
      }
    }
  });

  beforeEach(() => {
    previousLocale = jsCookie.get('locale');
    jsCookie.set('locale', 'zh', { path: '/' });
    requests = [];
    jest.spyOn(axios, 'post').mockImplementation((url, body) => {
      if (url !== LIST_URL) {
        throw new Error('Unexpected endpoint in list-only regression: ' + url);
      }

      let succeed!: (body: ListResponse) => void;
      let fail!: (error: Error) => void;
      const requestConfig: InternalAxiosRequestConfig<ListRequest> = {
        url,
        method: 'post',
        data: { ...(body as ListRequest) },
        headers: new AxiosHeaders(),
      };
      const promise = new Promise<AxiosResponse<ListResponse, ListRequest>>(
        (resolve, reject) => {
          succeed = (responseBody) => {
            const response: AxiosResponse<ListResponse, ListRequest> = {
              data: responseBody,
              status: 200,
              statusText: 'OK',
              headers: new AxiosHeaders(),
              config: requestConfig,
            };
            resolve(response);
          };
          fail = reject;
        }
      );
      const request: PendingRequest = {
        body: { ...(body as ListRequest) },
        settled: false,
        succeed: (responseBody) => {
          request.settled = true;
          succeed(responseBody);
        },
        fail: (error) => {
          request.settled = true;
          fail(error);
        },
      };
      requests.push(request);
      return promise;
    });
  });

  afterEach(() => {
    try {
      // No update_user_role request is permitted or forwarded to a real service.
      expect(
        jest.mocked(axios.post).mock.calls.every(([url]) => url === LIST_URL)
      ).toBe(true);
      expect(requests.every((request) => request.settled)).toBe(true);
    } finally {
      try {
        cleanup();
      } finally {
        try {
          act(() => message.destroy());
        } finally {
          try {
            jest.restoreAllMocks();
          } finally {
            if (previousLocale === undefined) {
              jsCookie.remove('locale', { path: '/' });
            } else {
              jsCookie.set('locale', previousLocale, { path: '/' });
            }
          }
        }
      }
    }
  });

  function mount() {
    return render(
      <ConfigProvider locale={zhCN}>
        <UserManagement />
      </ConfigProvider>
    );
  }

  async function settle(request: PendingRequest, body: ListResponse) {
    await act(async () => {
      request.succeed(body);
    });
  }

  async function mountSettledSeed() {
    const view = mount();
    await waitFor(() => expect(requests).toHaveLength(1));
    expect(requests[0].body).toEqual({ keywords: '', page: 1, per_page: 20 });
    await settle(requests[0], seedPage);
    await waitFor(() => expectLoading(view.container, false));
    return view;
  }

  it('preserves the newest successful search', async () => {
    const view = await mountSettledSeed();
    searchFor('Older');
    searchFor('Newer');
    expect(requests).toHaveLength(3);
    expect(requests[1].body).toEqual({
      keywords: 'Older',
      page: 1,
      per_page: 20,
    });
    expect(requests[2].body).toEqual({
      keywords: 'Newer',
      page: 1,
      per_page: 20,
    });

    await settle(requests[2], newerPage);
    await settle(requests[1], olderPage);

    expectPage(newerPage);
    expect(
      screen.queryByText(olderPage.data[0].name, { exact: true })
    ).toBeNull();
    expectLoading(view.container, false);
  });

  it('keeps loading for the newer pending request', async () => {
    const view = await mountSettledSeed();
    searchFor('Older');
    searchFor('Newer');
    expect(requests).toHaveLength(3);
    await waitFor(() => expectLoading(view.container, true));
    await settle(requests[1], olderPage);

    try {
      expect(requests[2].settled).toBe(false);
      expectLoading(view.container, true);
      expect(
        screen.getByText(seedPage.data[0].name, { exact: true })
      ).toBeTruthy();
      expect(
        screen.queryByText(olderPage.data[0].name, { exact: true })
      ).toBeNull();
    } finally {
      // Settle even on an original-version assertion failure, avoiding a leaked promise.
      await settle(requests[2], newerPage);
    }

    expectPage(newerPage);
    expectLoading(view.container, false);
  });

  it('shows the current success and stops loading', async () => {
    const view = mount();
    await waitFor(() => expect(requests).toHaveLength(1));
    expect(requests[0].body).toEqual({ keywords: '', page: 1, per_page: 20 });
    await waitFor(() => expectLoading(view.container, true));
    await settle(requests[0], olderPage);

    expectPage(olderPage);
    expectLoading(view.container, false);
  });

  it('notifies on current failure and stops loading', async () => {
    const errorMessage = jest.spyOn(message, 'error');
    // Keep the real console diagnostic and the real AntD message implementation.
    const diagnostic = jest.spyOn(console, 'error');
    const view = mount();
    await waitFor(() => expect(requests).toHaveLength(1));
    await waitFor(() => expectLoading(view.container, true));
    const failure = new Error('Controlled list transport failure');

    await act(async () => {
      requests[0].fail(failure);
    });

    expect(errorMessage).toHaveBeenCalledWith('获取用户数据失败');
    expect(diagnostic).toHaveBeenCalledWith('获取用户数据失败：', failure);
    expect(
      await screen.findByText('获取用户数据失败', { exact: true })
    ).toBeTruthy();
    expectLoading(view.container, false);
  });
});
