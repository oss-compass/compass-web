import React from 'react';
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import axios from 'axios';
import * as http from 'node:http';
import RepositoryManagement from './Management';
import CommunityManagement from '../CommunityTab/Management';

interface RequestRecord {
  pathname: string;
  body: Record<string, unknown>;
}

class RenderErrorBoundary extends React.Component<
  { errors: Error[]; children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error) {
    this.props.errors.push(error);
  }

  render() {
    return this.state.failed ? (
      <div>Management render failed</div>
    ) : (
      this.props.children
    );
  }
}

const panels = [
  {
    label: 'repository',
    Component: RepositoryManagement,
    title: '仓库管理',
    queryKey: 'repositoryList',
    listUrl: '/api/v2/project_server/repo_list',
    level: 'repo',
    gitcodeLabel: 'GitCode',
  },
  {
    label: 'community',
    Component: CommunityManagement,
    title: '社区管理',
    queryKey: 'communityList',
    listUrl: '/api/v2/project_server/community_list',
    level: 'community',
    gitcodeLabel: 'AtomGit',
  },
] as const;

describe.each(panels)('$label platform filter', (panel) => {
  let server: http.Server | undefined;
  let previousBaseURL: string | undefined;
  let baseURLChanged = false;
  let requests: RequestRecord[] = [];
  let unexpectedRequests: unknown[] = [];
  let client: QueryClient | undefined;
  let view: ReturnType<typeof render> | undefined;

  function mountManagement() {
    const errors: Error[] = [];
    client = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    view = render(
      <QueryClientProvider client={client}>
        <ConfigProvider>
          <RenderErrorBoundary errors={errors}>
            <panel.Component />
          </RenderErrorBoundary>
        </ConfigProvider>
      </QueryClientProvider>
    );
    return errors;
  }

  function activeListQueries() {
    return client!
      .getQueryCache()
      .getAll()
      .filter(
        (query) =>
          query.queryKey[0] === panel.queryKey && query.getObserversCount() > 0
      );
  }

  function platformRoot() {
    const card = Array.from(view!.container.querySelectorAll('.ant-card')).find(
      (element) =>
        element.querySelector('.ant-card-head-title')?.textContent ===
        panel.title
    );
    expect(card).toBeDefined();
    // The filter row's first Select is the platform control. Pagination is outside it.
    const filters = card!.querySelector('div.mt-4.flex.items-center.gap-4');
    expect(filters).not.toBeNull();
    const combo = filters!.querySelector('[role="combobox"]');
    expect(combo).not.toBeNull();
    const root = combo!.closest('.ant-select');
    expect(root).not.toBeNull();
    expect(filters!.contains(root)).toBe(true);
    return root as HTMLElement;
  }

  async function choosePlatform(label: string) {
    const input = platformRoot().querySelector('[role="combobox"]');
    fireEvent.mouseDown(input!, { button: 0 });
    let option: HTMLElement | undefined;
    await waitFor(
      () => {
        const matches = Array.from(
          document.querySelectorAll<HTMLElement>(
            '.ant-select-dropdown:not(.ant-select-dropdown-hidden) .ant-select-item-option'
          )
        ).filter(
          (element) =>
            element.getAttribute('title') === label ||
            element.querySelector('.ant-select-item-option-content')
              ?.textContent === label
        );
        expect(matches.length).toBe(1);
        option = matches[0];
      },
      { timeout: 5000 }
    );
    fireEvent.click(option!);
  }

  async function expectPlatform(
    errors: Error[],
    label: string,
    expectedPlatform: string | undefined
  ) {
    await waitFor(
      () => {
        expect(errors).toEqual([]);
        expect(
          platformRoot().querySelector('.ant-select-selection-item')
            ?.textContent
        ).toBe(label);
        const active = activeListQueries();
        expect(active.length).toBe(1);
        const params = active[0].queryKey[1] as Record<string, unknown>;
        expect(params.page).toBe(1);
        expect(params.per_page).toBe(20);
        expect(params.platform).toBe(expectedPlatform);
        expect(active[0].state.status).toBe('success');
        const overview = client!.getQueryCache().find({
          queryKey: ['projectUpdateCount', panel.level],
          exact: true,
        });
        expect(overview?.state.status).toBe('success');
        expect(
          requests.some(
            (request) =>
              request.pathname === panel.listUrl &&
              request.body.page === 1 &&
              request.body.per_page === 20 &&
              (expectedPlatform === undefined
                ? !Object.prototype.hasOwnProperty.call(
                    request.body,
                    'platform'
                  )
                : request.body.platform === expectedPlatform)
          )
        ).toBe(true);
      },
      { timeout: 5000 }
    );
  }

  beforeAll(async () => {
    previousBaseURL = axios.defaults.baseURL;
    server = http.createServer((request, response) => {
      const pathname = new URL(request.url || '/', 'http://127.0.0.1').pathname;
      response.setHeader(
        'Access-Control-Allow-Origin',
        request.headers.origin || '*'
      );
      response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
      response.setHeader('Vary', 'Origin');
      if (request.method === 'OPTIONS') {
        response.writeHead(204);
        response.end();
        return;
      }
      const chunks: Buffer[] = [];
      let size = 0;
      request.on('data', (chunk: Buffer) => {
        size += chunk.length;
        if (size > 65536) {
          request.destroy(new Error('Test HTTP request is too large'));
        } else {
          chunks.push(chunk);
        }
      });
      request.on('error', (error) => {
        unexpectedRequests.push(error);
        if (!response.writableEnded) response.end();
      });
      request.on('end', () => {
        try {
          const body = JSON.parse(
            Buffer.concat(chunks).toString('utf8') || '{}'
          );
          const record: RequestRecord = { pathname, body };
          requests.push(record);
          response.setHeader('Content-Type', 'application/json');
          // Controlled empty responses isolate the UI; hooks and Axios remain genuine.
          if (request.method === 'POST' && pathname === panel.listUrl) {
            response.writeHead(200);
            response.end(
              JSON.stringify({
                items: [],
                total_count: 0,
                current_page: body.page,
                per_page: body.per_page,
                total_pages: 0,
              })
            );
          } else if (
            request.method === 'POST' &&
            pathname ===
              '/api/v2/project_server/project_platform_update_count' &&
            body.level === panel.level
          ) {
            response.writeHead(200);
            response.end(
              JSON.stringify({
                within_1m: 0,
                over_1m: 0,
                over_3m: 0,
                over_6m: 0,
                over_12m: 0,
              })
            );
          } else {
            unexpectedRequests.push(record);
            response.writeHead(500);
            response.end(
              JSON.stringify({ error: 'Unexpected test HTTP route' })
            );
          }
        } catch (error) {
          unexpectedRequests.push(error);
          response.writeHead(500);
          response.end(JSON.stringify({ error: 'Invalid test HTTP body' }));
        }
      });
    });
    await new Promise<void>((resolve, reject) => {
      server!.once('error', reject);
      server!.listen(0, '127.0.0.1', resolve);
    });
    const address = server.address();
    if (!address || typeof address === 'string') {
      throw new Error('Test HTTP server has no TCP address');
    }
    axios.defaults.baseURL = 'http://127.0.0.1:' + address.port;
    baseURLChanged = true;
  });

  beforeEach(() => {
    requests = [];
    unexpectedRequests = [];
  });

  afterEach(async () => {
    cleanup();
    await act(async () => {
      client?.clear();
    });
    client = undefined;
    view = undefined;
  });

  afterAll(async () => {
    if (baseURLChanged) axios.defaults.baseURL = previousBaseURL;
    if (server) {
      await new Promise<void>((resolve) => {
        server!.close(() => resolve());
        if (typeof server!.closeAllConnections === 'function') {
          server!.closeAllConnections();
        }
      });
    }
  });

  test('requests the default, supported platforms and explicit all', async () => {
    const errors = mountManagement();
    await expectPlatform(errors, '全部平台', undefined);
    for (const [label, value] of [
      ['GitHub', 'github'],
      ['Gitee', 'gitee'],
      [panel.gitcodeLabel, 'gitcode'],
    ]) {
      await choosePlatform(label);
      await expectPlatform(errors, label, value);
    }
    await choosePlatform('全部平台');
    await expectPlatform(errors, '全部平台', undefined);
    expect(errors).toEqual([]);
    expect(unexpectedRequests).toEqual([]);
  }, 15000);

  test('clearing the platform safely restores the unfiltered query', async () => {
    const errors = mountManagement();
    await expectPlatform(errors, '全部平台', undefined);
    await choosePlatform('GitHub');
    await expectPlatform(errors, 'GitHub', 'github');
    const root = platformRoot();
    fireEvent.mouseEnter(root);
    const clear = root.querySelector<HTMLElement>('.ant-select-clear');
    expect(clear).not.toBeNull();
    fireEvent.mouseDown(clear!, { button: 0 });
    fireEvent.mouseUp(clear!, { button: 0 });
    fireEvent.click(clear!);
    await waitFor(
      () => {
        const active = activeListQueries();
        const restored =
          active.length === 1 &&
          (active[0].queryKey[1] as Record<string, unknown>).platform ===
            undefined &&
          active[0].state.status === 'success';
        expect(errors.length > 0 || restored).toBe(true);
      },
      { timeout: 5000 }
    );
    expect(errors).toEqual([]);
    const active = activeListQueries();
    expect(active.length).toBe(1);
    const params = active[0].queryKey[1] as Record<string, unknown>;
    expect(params.platform).toBeUndefined();
    expect(params.page).toBe(1);
    expect(params.per_page).toBe(20);
    expect(active[0].state.status).toBe('success');
    // Restoring the fresh initial all query may use the real cache without a new POST.
    expect(
      requests.some(
        (request) =>
          request.pathname === panel.listUrl &&
          !Object.prototype.hasOwnProperty.call(request.body, 'platform')
      )
    ).toBe(true);
    expect(
      platformRoot().querySelector('.ant-select-selection-item')?.textContent
    ).not.toBe('GitHub');
    expect(unexpectedRequests).toEqual([]);
  }, 15000);
});
