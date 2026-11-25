/**
 * Full ApiContainer/useApiData/NoSsr/ErrorFallback with real QueryClient and
 * Axios HTTP. The child below only serializes the genuine context/menu hook
 * for observation; it does not implement a documentation UI or state machine.
 * Requests and Swagger data are controlled loopback transport, not live API
 * capture. The common resource is the project's actual i18n submodule file.
 */
import React from 'react';
import {
  render,
  screen,
  within,
  fireEvent,
  waitFor,
  cleanup,
  act,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createInstance } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import axios from 'axios';
import * as http from 'node:http';
import ApiContainer from '../ApiContainer';
import useMenuContent from '../SideBar/useMenuContent';
import { useApiDataContext } from '../../context';
import common from '../../../../../i18n/en/common.json';

const CONTEXT_LABEL = 'API documentation context';
const DOCS_URL = '/api/v2/docs';
const ENDPOINT_PATH = '/api/v2/metadata/pullRequests';
const ENDPOINT_ID = 'api_v2_metadata_pullRequests';
const WAIT_TIMEOUT = 8000;
const CASE_TIMEOUT = 20000;
const i18n = createInstance();
// The normal endpoint path is also used by the committed API Introduction.
// This is a small Swagger2 response supported by the genuine V2 menu consumer.
const DOCS = {
  swagger: '2.0',
  info: { title: 'Compass V2 API', version: 'v2' },
  tags: [{ name: 'V2 API', second_names: ['Metadata'] }],
  paths: {
    [ENDPOINT_PATH]: {
      post: {
        tags: ['V2 API', 'Metadata'],
        operationId: 'postMetadataPullRequests',
        summary: 'Pull requests',
        description: 'Read repository pull requests.',
        responses: {
          '201': {
            description: 'Successful response',
            schema: { $ref: '#/definitions/PullRequests' },
          },
        },
      },
    },
  },
  definitions: {
    postMetadataPullRequests: {
      type: 'object',
      properties: {
        label: {
          type: 'string',
          description: 'Repository URL',
          example: 'https://github.com/oss-compass/compass-web',
        },
      },
      required: ['label'],
    },
    PullRequests: {
      type: 'object',
      properties: {
        total_count: { type: 'integer', description: 'Pull request count' },
      },
    },
  },
};

type RequestRecord = {
  method: string | undefined;
  path: string;
  accept: string | undefined;
  status: number | null;
};
let client: QueryClient | undefined;
let server: http.Server | undefined;
let previousBaseURL: string | undefined;
let baseURLChanged = false;
let failDocs = false;
let holdDocs = false;
const requests: RequestRecord[] = [];
const unexpected: string[] = [];
const held: Array<{ res: http.ServerResponse; record: RequestRecord }> = [];

function ContextObservation() {
  const { data, isLoading } = useApiDataContext();
  const menu = useMenuContent();
  return (
    <output aria-label={CONTEXT_LABEL}>
      {JSON.stringify({ data, isLoading, menu })}
    </output>
  );
}
function observedContext() {
  return JSON.parse(screen.getByLabelText(CONTEXT_LABEL).textContent || 'null');
}
function mount() {
  // Match the real _app QueryClient defaults. useApiData still overrides retry
  // with its genuine retry1/delay3000; no fake timers or request-library mocks.
  client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
      },
    },
  });
  render(
    <QueryClientProvider client={client}>
      <I18nextProvider i18n={i18n}>
        <ApiContainer>
          <ContextObservation />
        </ApiContainer>
      </I18nextProvider>
    </QueryClientProvider>
  );
}
function finishResponse(res: http.ServerResponse, record: RequestRecord) {
  record.status = failDocs ? 503 : 200;
  res.writeHead(record.status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(failDocs ? { error: 'Docs unavailable' } : DOCS));
}
function releaseResponses() {
  holdDocs = false;
  for (const item of held.splice(0)) finishResponse(item.res, item.record);
}
async function waitForQuery(expected: {
  status: 'loading' | 'success' | 'error';
  fetchStatus: 'fetching' | 'idle';
  hasData: boolean;
  failures: number;
  statuses: Array<number | null>;
}) {
  await waitFor(
    () => {
      const query = client!
        .getQueryCache()
        .find({ queryKey: ['apiData'], exact: true });
      const value = query?.state.data as
        | { data: unknown; status: number }
        | undefined;
      const error = query?.state.error as {
        response?: { status: number };
      } | null;
      expect({
        unexpected,
        key: query?.queryKey,
        observers: query?.getObserversCount(),
        status: query?.state.status,
        fetchStatus: query?.state.fetchStatus,
        failures: query?.state.fetchFailureCount,
        hasData: value !== undefined,
        response: value?.data ?? null,
        responseStatus: value?.status ?? null,
        errorPresent: error !== null && error !== undefined,
        errorStatus: error?.response?.status ?? null,
        requests: requests.map((record) => ({
          method: record.method,
          path: record.path,
          accept: record.accept,
          status: record.status,
        })),
      }).toEqual({
        unexpected: [],
        key: ['apiData'],
        observers: 1,
        status: expected.status,
        fetchStatus: expected.fetchStatus,
        failures: expected.failures,
        hasData: expected.hasData,
        response: expected.hasData ? DOCS : null,
        responseStatus: expected.hasData ? 200 : null,
        errorPresent: expected.status === 'error',
        errorStatus: expected.status === 'error' ? 503 : null,
        requests: expected.statuses.map((status) => ({
          method: 'GET',
          path: DOCS_URL,
          accept: 'application/json',
          status,
        })),
      });
    },
    { timeout: WAIT_TIMEOUT }
  );
}
async function expectPendingContext() {
  await waitFor(
    () => {
      expect({
        context: observedContext(),
        alert: screen.queryByRole('alert'),
      }).toEqual({
        context: {
          data: null,
          isLoading: true,
          menu: { isLoading: true, result: null },
        },
        alert: null,
      });
    },
    { timeout: WAIT_TIMEOUT }
  );
}
async function expectSuccessfulContext() {
  await waitFor(
    () => {
      const observed = observedContext();
      const { children: groups } = observed.menu.result?.[0] ?? {};
      const { children: endpoints } = groups?.[0] ?? {};
      expect({
        data: observed.data,
        isLoading: observed.isLoading,
        menuLoading: observed.menu.isLoading,
        endpoint: endpoints?.[0],
        alert: screen.queryByRole('alert'),
      }).toEqual({
        data: DOCS,
        isLoading: false,
        menuLoading: false,
        endpoint: {
          type: 'endpoint',
          id: ENDPOINT_ID,
          path: ENDPOINT_PATH,
          method: 'POST',
          description: 'Read repository pull requests.',
          summary: 'Pull requests',
          responses: {
            total_count: { type: 'integer', description: 'Pull request count' },
          },
          parameters: [
            {
              type: 'string',
              description: 'Repository URL',
              example: 'https://github.com/oss-compass/compass-web',
              name: 'label',
              required: true,
            },
          ],
        },
        alert: null,
      });
    },
    { timeout: WAIT_TIMEOUT }
  );
}

beforeAll(async () => {
  await i18n.init({
    lng: 'en',
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common'],
    resources: { en: { common } },
    initImmediate: false,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
  expect(
    [
      'error.something_went_wrong',
      'error.oops',
      'error.try_to_refresh_this_page_or_feel_free_to_contact_u',
      'error.try_again',
    ].map((key) => i18n.exists(key, { ns: 'common' }))
  ).toEqual([true, true, true, true]);
});
beforeEach(async () => {
  requests.length = 0;
  unexpected.length = 0;
  held.length = 0;
  failDocs = false;
  holdDocs = false;
  baseURLChanged = false;
  previousBaseURL = axios.defaults.baseURL;
  server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Cache-Control', 'no-store');
    if (req.method === 'OPTIONS' && req.url === DOCS_URL) {
      res.writeHead(204);
      res.end();
      return;
    }
    req.setTimeout(10000, () =>
      req.destroy(new Error('Owned docs HTTP timeout'))
    );
    let bytes = 0;
    req.on('data', (chunk) => {
      bytes += chunk.length;
      if (bytes > 1024) req.destroy(new Error('Unexpected docs request body'));
    });
    req.on('error', (error) => {
      unexpected.push(String(error));
      if (!res.writableEnded) res.end();
    });
    req.on('end', () => {
      if (
        req.method !== 'GET' ||
        req.url !== DOCS_URL ||
        requests.length >= 8 ||
        bytes !== 0
      ) {
        unexpected.push(String(req.method) + ' ' + String(req.url));
        res.writeHead(500);
        res.end();
        return;
      }
      const record: RequestRecord = {
        method: req.method,
        path: req.url,
        accept: req.headers.accept,
        status: null,
      };
      requests.push(record);
      if (holdDocs) held.push({ res, record });
      else finishResponse(res, record);
    });
  });
  await new Promise<void>((resolve, reject) => {
    server!.once('error', reject);
    server!.listen(0, '127.0.0.1', resolve);
  });
  const address = server.address();
  if (!address || typeof address === 'string')
    throw new Error('No owned HTTP port');
  axios.defaults.baseURL = 'http://127.0.0.1:' + address.port;
  baseURLChanged = true;
});
afterEach(async () => {
  try {
    cleanup();
    client?.clear();
    client = undefined;
    for (const item of held.splice(0)) item.res.destroy();
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
    server = undefined;
    expect(unexpected).toEqual([]);
  } finally {
    if (baseURLChanged) axios.defaults.baseURL = previousBaseURL;
  }
});
afterAll(() => {
  i18n.off('languageChanged');
});

test(
  'shows the translated terminal failure and retries the actual docs request',
  async () => {
    failDocs = true;
    mount();
    await waitForQuery({
      status: 'error',
      fetchStatus: 'idle',
      hasData: false,
      failures: 2,
      statuses: [503, 503],
    });
    // On the original source this is the target: the settled query is in error,
    // but no real ErrorFallback/retry control exists. No baseline failure assumed.
    const alert = await screen.findByRole('alert', undefined, {
      timeout: WAIT_TIMEOUT,
    });
    expect(
      within(alert).getByRole('heading', {
        name: i18n.t('error.something_went_wrong', { ns: 'common' }),
      })
    ).toBeVisible();
    expect(screen.queryByLabelText(CONTEXT_LABEL)).toBeNull();
    failDocs = false;
    holdDocs = true;
    fireEvent.click(
      within(alert).getByRole('button', {
        name: i18n.t('error.try_again', { ns: 'common' }),
      })
    );
    await waitForQuery({
      status: 'loading',
      fetchStatus: 'fetching',
      hasData: false,
      failures: 0,
      statuses: [503, 503, null],
    });
    await expectPendingContext();
    releaseResponses();
    await waitForQuery({
      status: 'success',
      fetchStatus: 'idle',
      hasData: true,
      failures: 0,
      statuses: [503, 503, 200],
    });
    await expectSuccessfulContext();
  },
  CASE_TIMEOUT
);

test(
  'keeps initial pending distinct from failure and delivers successful docs to the real context',
  async () => {
    holdDocs = true;
    mount();
    await waitForQuery({
      status: 'loading',
      fetchStatus: 'fetching',
      hasData: false,
      failures: 0,
      statuses: [null],
    });
    await expectPendingContext();
    releaseResponses();
    await waitForQuery({
      status: 'success',
      fetchStatus: 'idle',
      hasData: true,
      failures: 0,
      statuses: [200],
    });
    await expectSuccessfulContext();
  },
  CASE_TIMEOUT
);

test(
  'keeps previously fetched valid docs when a background refresh fails',
  async () => {
    mount();
    await waitForQuery({
      status: 'success',
      fetchStatus: 'idle',
      hasData: true,
      failures: 0,
      statuses: [200],
    });
    await expectSuccessfulContext();
    failDocs = true;
    let refreshing: Promise<void> | undefined;
    act(() => {
      refreshing = client!.refetchQueries({
        queryKey: ['apiData'],
        exact: true,
      });
    });
    await waitForQuery({
      status: 'error',
      fetchStatus: 'idle',
      hasData: true,
      failures: 2,
      statuses: [200, 503, 503],
    });
    await refreshing;
    await expectSuccessfulContext();
  },
  CASE_TIMEOUT
);
