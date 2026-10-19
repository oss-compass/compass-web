/**
 * The keyword field searches owners by username or email; resource selection is
 * a separate parameter. These are complete-component tests over real Axios HTTP.
 * The empty-owner responses target the corresponding backend keyword fix.
 * The older backend returned unrelated owners for that request, so these tests
 * are not evidence that the frontend is compatible with that older server.
 * HTTP data below is controlled transport data, not a live backend/DB run.
 */
import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  cleanup,
  act,
  screen,
  within,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import { createInstance } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import axios from 'axios';
import * as http from 'node:http';
import { TextEncoder, TextDecoder } from 'node:util';

const USER_ID = 1;
const USER_NAME = 'alice';
const USER_EMAIL = 'alice@example.test';
const USER_NICKNAME = 'Alice Owner';
const UNMATCHED_EMAIL = 'no-such-owner@example.test';
const API_PATH = '/api/v2/metadata/releases';
const DATASET_NAME = '贡献者数据集';
const AVATAR_PATH = '/test-owner-avatar.gif';
const WAIT_TIMEOUT = 5000;
const CASE_TIMEOUT = 15000;
const i18n = createInstance();

const modes = [
  {
    name: 'API',
    kind: 'api',
    query: 'dataHubRestApiTable',
    endpoint: '/api/v2/admin/datahub_restapi_table',
    resourceKey: 'api_path',
    resource: API_PATH,
  },
  {
    name: 'archive download',
    kind: 'download',
    query: 'dataHubArchiveDownloadTable',
    endpoint: '/api/v2/admin/datahub_archive_download_table',
    resourceKey: 'dataset_name',
    resource: DATASET_NAME,
  },
] as const;
type Mode = (typeof modes)[number];
const searches = [
  {
    name: 'email only',
    keyword: USER_EMAIL,
    empty: false,
    selectResource: false,
  },
  { name: 'username', keyword: USER_NAME, empty: false, selectResource: true },
  {
    name: 'unmatched owner',
    keyword: UNMATCHED_EMAIL,
    empty: true,
    selectResource: false,
  },
] as const;

let DataHubUserUsageCard: typeof import('../DataHubUserUsageCard').default;
let DateProvider: typeof import('../contexts/DateContext').DateProvider;
let client: QueryClient | undefined;
let server: http.Server | undefined;
let origin = '';
let oldBaseURL: string | undefined;
let baseURLChanged = false;
const requests: any[] = [];
const unexpectedRequests: any[] = [];
const restoreBrowserResources: Array<() => void> = [];

function provideMissingBrowserResource(
  host: object,
  name: string,
  value: unknown
) {
  if (typeof Reflect.get(host, name) !== 'undefined') return;
  const descriptor = Object.getOwnPropertyDescriptor(host, name);
  Object.defineProperty(host, name, {
    configurable: true,
    writable: true,
    value,
  });
  restoreBrowserResources.push(() => {
    if (descriptor) Object.defineProperty(host, name, descriptor);
    else Reflect.deleteProperty(host, name);
  });
}
function installBrowserResources() {
  // Genuine Node encoders must exist before the complete hook barrel loads.
  provideMissingBrowserResource(globalThis, 'TextEncoder', TextEncoder);
  provideMissingBrowserResource(globalThis, 'TextDecoder', TextDecoder);
  // Ordinary non-reduced-motion browser resource missing from jsdom.
  provideMissingBrowserResource(window, 'matchMedia', (media: string) => ({
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
  }));
  // AntD's actual rc-resize-observer keeps its own genuine resize polyfill.
}
function dataRows() {
  return screen
    .queryAllByRole('row', { hidden: true })
    .filter((row) => row.hasAttribute('data-row-key'));
}
function userRow(resource: string) {
  return dataRows().find(
    (row) =>
      within(row).queryByText(USER_NICKNAME) &&
      within(row).queryByText(resource)
  );
}
function searchInput() {
  return screen.getByPlaceholderText<HTMLInputElement>('搜索用户名或邮箱');
}
async function successfulQuery(
  mode: Mode,
  keyword: string,
  selectedResource = ''
) {
  let data: any;
  await waitFor(
    () => {
      const request = requests
        .filter(
          (record) =>
            record.method === 'POST' &&
            record.pathname === mode.endpoint &&
            record.body.keywords === keyword &&
            record.body[mode.resourceKey] === selectedResource &&
            record.status === 201
        )
        .slice(-1)[0];
      const key = [
        mode.query,
        request?.body.begin_date,
        request?.body.end_date,
        1,
        20,
        selectedResource,
        keyword,
      ].filter(Boolean);
      const observed = client!
        .getQueryCache()
        .getAll()
        .filter(
          (query) =>
            query.queryKey[0] === mode.query && query.getObserversCount() > 0
        );
      const input =
        screen.queryByPlaceholderText<HTMLInputElement>('搜索用户名或邮箱');
      expect({
        unexpectedRequests,
        requestFound: request !== undefined,
        page: request?.body.page,
        perPage: request?.body.per_page,
        observedCount: observed.length,
        queryKey: observed[0]?.queryKey,
        status: observed[0]?.state.status,
        fetchStatus: observed[0]?.state.fetchStatus,
        response: observed[0]?.state.data,
        inputPresent: input !== null,
        searchValue: input?.value,
      }).toEqual({
        unexpectedRequests: [],
        requestFound: true,
        page: 1,
        perPage: 20,
        observedCount: 1,
        queryKey: key,
        status: 'success',
        fetchStatus: 'idle',
        response: request?.response,
        inputPresent: true,
        searchValue: keyword,
      });
      data = observed[0]?.state.data;
    },
    { timeout: WAIT_TIMEOUT }
  );
  await act(async () => {
    await Promise.resolve();
  });
  return data;
}
async function mountMode(mode: Mode) {
  client = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  render(
    <QueryClientProvider client={client}>
      <I18nextProvider i18n={i18n} defaultNS="translation">
        <ConfigProvider>
          <DateProvider>
            <DataHubUserUsageCard />
          </DateProvider>
        </ConfigProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
  await successfulQuery(modes[0], '');
  await waitFor(() => expect(userRow(API_PATH)).toBeVisible(), {
    timeout: WAIT_TIMEOUT,
  });
  if (mode.kind === 'download') {
    fireEvent.click(screen.getByRole('tab', { name: /归档数据下载量/ }));
    await successfulQuery(mode, '');
    await waitFor(() => expect(userRow(DATASET_NAME)).toBeVisible(), {
      timeout: WAIT_TIMEOUT,
    });
  }
  // Wait for the real resource-list hook, not a substituted Select or callback.
  await waitFor(
    () => {
      const key =
        mode.kind === 'api' ? ['dataHubRestApiList'] : ['datasetList'];
      const query = client!
        .getQueryCache()
        .find({ queryKey: key, exact: true });
      expect({
        status: query?.state.status,
        fetchStatus: query?.state.fetchStatus,
      }).toEqual({ status: 'success', fetchStatus: 'idle' });
    },
    { timeout: WAIT_TIMEOUT }
  );
}
async function selectResource(mode: Mode) {
  const label = screen.getByText(
    mode.kind === 'api' ? '全部API' : '全部数据集'
  );
  // The real AntD Select has no accessible name; its visible selected label is
  // the public-query anchor. Scope only its combobox, excluding page-size Select.
  // eslint-disable-next-line testing-library/no-node-access -- AntD's unnamed Select exposes its selected label outside the combobox; closest scopes that genuine control after a public text query.
  const root = label.closest<HTMLElement>('.ant-select');
  expect(root).not.toBeNull();
  const combo = within(root!).getByRole('combobox');
  expect(combo).not.toBeNull();
  fireEvent.mouseDown(combo, { button: 0 });
  let option: HTMLElement | undefined;
  await waitFor(
    () => {
      // AntD virtualizes role=option into accessibility-only nodes. Query the
      // visible option content, then let the genuine option handle the click.
      const candidates = screen.queryAllByText(
        (_, element) => element?.textContent?.includes(mode.resource) || false,
        {
          selector:
            '.ant-select-dropdown:not(.ant-select-dropdown-hidden) .ant-select-item-option-content',
        }
      );
      expect(candidates.length).toBe(1);
      option = candidates[0];
    },
    { timeout: WAIT_TIMEOUT }
  );
  fireEvent.click(option!);
  await successfulQuery(mode, '', mode.resource);
}
function responseFor(mode: Mode, body: any) {
  if (
    body.page !== 1 ||
    body.per_page !== 20 ||
    typeof body.keywords !== 'string' ||
    !['', USER_EMAIL, USER_NAME, UNMATCHED_EMAIL].includes(body.keywords) ||
    !['', mode.resource].includes(body[mode.resourceKey])
  ) {
    throw new Error('Request outside this normal owner-search contract');
  }
  if (
    typeof body.begin_date !== 'string' ||
    typeof body.end_date !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}$/.test(body.begin_date) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(body.end_date) ||
    body.begin_date >= body.end_date
  ) {
    throw new Error('Expected the real DateProvider month interval');
  }
  if (body.keywords === UNMATCHED_EMAIL) {
    // This is the corrected producer contract, NOT the previous backend behavior.
    // Pagy retains one total page for an empty result in this response schema.
    return {
      items: [],
      total_count: 0,
      current_page: 1,
      per_page: 20,
      total_pages: 1,
    };
  }
  const item = {
    user_id: USER_ID,
    login_binds: {
      account: USER_NAME,
      provider: 'github',
      nickname: USER_NICKNAME,
      avatar_url: origin + AVATAR_PATH,
    },
    call_count: 7,
    last_called_at: body.begin_date + 'T12:00:00.000Z',
    ...(mode.kind === 'api'
      ? { api_path: API_PATH }
      : { dataset_name: DATASET_NAME }),
  };
  return {
    items: [item],
    total_count: 1,
    current_page: 1,
    per_page: 20,
    total_pages: 1,
  };
}
beforeAll(async () => {
  installBrowserResources();
  // Full production modules load normally after only browser resource prerequisites.
  const [cardModule, dateModule] = await Promise.all([
    import('../DataHubUserUsageCard'),
    import('../contexts/DateContext'),
  ]);
  DataHubUserUsageCard = cardModule.default;
  DateProvider = dateModule.DateProvider;
  await i18n.init({
    lng: 'en',
    fallbackLng: 'en',
    ns: ['translation'],
    defaultNS: 'translation',
    resources: { en: { translation: {} } },
    initImmediate: false,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
  oldBaseURL = axios.defaults.baseURL;
  server = http.createServer((req, res) => {
    const pathname = new URL(req.url || '/', 'http://127.0.0.1').pathname;
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Accept, X-Requested-With'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Vary', 'Origin');
    res.setHeader('Cache-Control', 'no-store');
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }
    const chunks: Buffer[] = [];
    let bytes = 0;
    req.setTimeout(5000, () =>
      req.destroy(new Error('Owned HTTP request timeout'))
    );
    req.on('data', (chunk) => {
      bytes += chunk.length;
      if (bytes > 65536)
        req.destroy(new Error('Owned request byte bound exceeded'));
      else chunks.push(chunk);
    });
    req.on('error', (error) => {
      unexpectedRequests.push({ pathname, error: String(error) });
      if (!res.writableEnded) res.end();
    });
    req.on('end', () => {
      try {
        const body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
        const record: any = {
          method: req.method,
          pathname,
          body,
          status: null,
          response: null,
        };
        requests.push(record);
        if (requests.length > 32)
          throw new Error('Per-case request bound exceeded');
        const mode = modes.find((candidate) => candidate.endpoint === pathname);
        if (req.method === 'POST' && mode) {
          const response = responseFor(mode, body);
          record.status = 201;
          record.response = response;
          res.setHeader('Content-Type', 'application/json');
          res.writeHead(201);
          res.end(JSON.stringify(response));
        } else if (
          req.method === 'GET' &&
          pathname === '/api/v2/admin/datahub_restapi_list'
        ) {
          const response = [
            {
              api_path: API_PATH,
              description: 'Metadata releases / 元数据发行版',
            },
          ];
          record.status = 200;
          record.response = response;
          res.setHeader('Content-Type', 'application/json');
          res.writeHead(200);
          res.end(JSON.stringify(response));
        } else if (
          req.method === 'GET' &&
          pathname === '/api/v2/admin/dataset_list'
        ) {
          // Auxiliary GET schema belongs to the actual useDatasetList hook.
          // This UI boundary does not claim that route was run on a backend.
          const response = [{ name: DATASET_NAME, value: 7 }];
          record.status = 200;
          record.response = response;
          res.setHeader('Content-Type', 'application/json');
          res.writeHead(200);
          res.end(JSON.stringify(response));
        } else if (req.method === 'GET' && pathname === AVATAR_PATH) {
          const image = Buffer.from(
            'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            'base64'
          );
          record.status = 200;
          res.setHeader('Content-Type', 'image/gif');
          res.writeHead(200);
          res.end(image);
        } else {
          throw new Error('Unexpected local HTTP route');
        }
      } catch (error) {
        unexpectedRequests.push({
          method: req.method,
          pathname,
          error: String(error),
        });
        if (!res.headersSent) res.writeHead(500);
        res.end(
          JSON.stringify({ test_error: 'Controlled transport refused request' })
        );
      }
    });
  });
  await new Promise<void>((resolve, reject) => {
    server!.once('error', reject);
    server!.listen(0, '127.0.0.1', resolve);
  });
  const address = server.address();
  if (!address || typeof address === 'string')
    throw new Error('No owned HTTP address');
  origin = 'http://127.0.0.1:' + address.port;
  axios.defaults.baseURL = origin;
  baseURLChanged = true;
});
beforeEach(() => {
  requests.length = 0;
  unexpectedRequests.length = 0;
});
afterEach(async () => {
  cleanup();
  await act(async () => {
    client?.clear();
  });
  client = undefined;
  expect(unexpectedRequests).toEqual([]);
});
afterAll(async () => {
  try {
    if (baseURLChanged) axios.defaults.baseURL = oldBaseURL;
    if (server)
      await new Promise<void>((resolve, reject) => {
        const timer = setTimeout(
          () => reject(new Error('Owned HTTP cleanup timeout')),
          2500
        );
        server!.close((error) => {
          clearTimeout(timer);
          if (error) reject(error);
          else resolve();
        });
        if (typeof server!.closeIdleConnections === 'function')
          server!.closeIdleConnections();
        if (typeof server!.closeAllConnections === 'function')
          server!.closeAllConnections();
      });
    i18n.off('languageChanged');
  } finally {
    for (const restore of restoreBrowserResources.reverse()) restore();
  }
});

describe.each(modes)('$name user searches', (mode) => {
  test.each(searches)(
    'returns the correct usage rows for $name keywords',
    async (search) => {
      await mountMode(mode);
      if (search.selectResource) await selectResource(mode);
      const selectedResource = search.selectResource ? mode.resource : '';
      // Ordinary Input.Search DOM input; no setter, hook or callback is replaced.
      fireEvent.change(searchInput(), { target: { value: search.keyword } });
      const data = await successfulQuery(
        mode,
        search.keyword,
        selectedResource
      );
      expect(data.current_page).toBe(1);
      expect(data.per_page).toBe(20);
      expect(data.total_pages).toBe(1);
      if (search.empty) {
        expect(data.items).toEqual([]);
        expect(data.total_count).toBe(0);
        await waitFor(
          () => {
            expect({
              matchedRow: userRow(mode.resource),
              keyedRowCount: dataRows().length,
            }).toEqual({ matchedRow: undefined, keyedRowCount: 0 });
          },
          { timeout: WAIT_TIMEOUT }
        );
      } else {
        expect(data.items).toHaveLength(1);
        expect(data.total_count).toBe(1);
        const item = data.items[0];
        expect(item.user_id).toBe(USER_ID);
        expect(item.login_binds.account).toBe(USER_NAME);
        expect(item.login_binds.nickname).toBe(USER_NICKNAME);
        expect(item[mode.resourceKey]).toBe(mode.resource);
        expect(item).not.toHaveProperty('email');
        expect(item).not.toHaveProperty('user_email');
        if (search.keyword === USER_EMAIL) {
          for (const value of [
            item.login_binds.account,
            item.login_binds.nickname,
            item[mode.resourceKey],
          ]) {
            expect(value.toLowerCase().includes(USER_EMAIL)).toBe(false);
          }
        }
        await waitFor(() => expect(userRow(mode.resource)).toBeVisible(), {
          timeout: WAIT_TIMEOUT,
        });
      }
      expect(unexpectedRequests).toEqual([]);
    },
    CASE_TIMEOUT
  );
});
