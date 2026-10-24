/** @jest-environment node */
import React from 'react';
import { createServer, IncomingHttpHeaders, Server } from 'http';
import { AddressInfo } from 'net';
import { buildSchema, graphql } from 'graphql';
import { renderToStaticMarkup } from 'react-dom/server.node';
import { HeadManagerContext } from 'next/dist/shared/lib/head-manager-context.shared-runtime';
import type { GetServerSidePropsContext } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import App from '../../pages/_app';
import AnalyzePage, {
  getServerSideProps as getShortReportProps,
} from '../../pages/analyze/[slugs]';
import LegacyAnalyzePage, {
  getServerSideProps as getLegacyReportProps,
} from '../../pages/analyze';

// Keep the actual page loaders, App, Next Head, React and GraphQL execution.
// Isolate translations, analytics, auth and the client-only chart module.
jest.mock(
  'next-i18next',
  () => ({ appWithTranslation: (app: unknown) => app }),
  {
    virtual: true,
  }
);
jest.mock('react-hot-toast', () => ({ Toaster: () => null }), {
  virtual: true,
});
jest.mock('next/dynamic', () => () => () => null);
jest.mock('@common/utils/getLocalesFile', () => ({
  __esModule: true,
  default: async (cookies: unknown, namespaces: string[]) => ({
    translationFixture: { cookies, namespaces },
  }),
}));
jest.mock('@common/utils/getLocale', () => ({
  browserLanguageDetectorAndReload: () => {},
}));
jest.mock('@common/lib/ga', () => ({
  useAppGA: () => {},
  GAScripts: () => null,
}));
jest.mock('@common/monumentedStation', () => ({
  useRouteTracking: () => {},
  useUserTracking: () => {},
}));
jest.mock('@modules/auth/UserInfoFetcher', () => () => null);

type Report = {
  label: string | null;
  level: string | null;
  status: string | null;
};
type CapturedRequest = {
  url: string;
  headers: IncomingHttpHeaders;
  query: string;
  variables: Record<string, string>;
};

const defaultKeywords =
  'Ecosystem Evaluation System,Code Compliance Guarantee,Code Security Guarantee,Robustness,Productivity,Collaboration Development Index,Community,Community Service and Support,';
const schema = buildSchema(`
  type ProjectCompletionRow { label: String, level: String, status: String }
  type Query {
    analysisStatusVerify(label: String, shortCode: String): ProjectCompletionRow!
  }
`);

let server: Server;
let endpoint: string;
let requests: CapturedRequest[];
let reports: Record<string, Report>;
let mode:
  | 'normal'
  | 'http-error'
  | 'invalid-json'
  | 'graphql-error'
  | 'empty'
  | 'timeout';
const originalApiUrl = process.env.API_URL;

beforeAll(async () => {
  server = createServer(async (req, res) => {
    const chunks: Buffer[] = [];
    for await (const chunk of req) chunks.push(Buffer.from(chunk));
    const body = JSON.parse(Buffer.concat(chunks).toString());
    requests.push({ url: req.url!, headers: req.headers, ...body });
    if (mode === 'timeout') return;
    if (mode === 'http-error') {
      res.writeHead(503).end();
      return;
    }
    if (mode === 'invalid-json') {
      res.end('{');
      return;
    }
    if (mode === 'empty') {
      res.end(JSON.stringify({ data: null }));
      return;
    }
    const result = await graphql({
      schema,
      source: body.query,
      variableValues: body.variables,
      rootValue: {
        analysisStatusVerify: ({
          label,
          shortCode,
        }: {
          label?: string;
          shortCode?: string;
        }) => {
          if (mode === 'graphql-error') throw new Error('backend unavailable');
          return (
            reports[shortCode || label || ''] || {
              label: null,
              level: null,
              status: 'unsubmit',
            }
          );
        },
      },
    });
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  endpoint = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});

beforeEach(() => {
  process.env.API_URL = endpoint;
  requests = [];
  mode = 'normal';
  reports = {
    repo: {
      label: 'https://github.com/oss-compass/compass-web',
      level: 'repo',
      status: 'success',
    },
    community: { label: '开放原子社区', level: 'community', status: 'success' },
    project: { label: 'Compass Project', level: 'project', status: 'success' },
  };
});

afterAll(async () => {
  if (originalApiUrl === undefined) delete process.env.API_URL;
  else process.env.API_URL = originalApiUrl;
  server.closeAllConnections();
  await new Promise<void>((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve()))
  );
});

async function renderReport(
  query: ParsedUrlQuery,
  params?: ParsedUrlQuery,
  legacy = false
) {
  const result = await (legacy ? getLegacyReportProps : getShortReportProps)({
    req: {
      cookies: { lang: 'zh', session: 'private-cookie' },
      headers: { host: 'untrusted.invalid', authorization: 'Bearer private' },
    },
    query,
    params,
  } as unknown as GetServerSidePropsContext);
  if (!('props' in result)) throw new Error('expected page props');
  const pageProps = await result.props;
  let head: React.ReactElement<{
    children?: React.ReactNode;
    name?: string;
    content?: string;
  }>[] = [];
  renderToStaticMarkup(
    <HeadManagerContext.Provider
      value={{
        mountedInstances: new Set(),
        updateHead: (elements) => {
          head = elements;
        },
        getIsSsr: () => true,
      }}
    >
      <App
        Component={legacy ? LegacyAnalyzePage : AnalyzePage}
        pageProps={pageProps}
        router={{} as never}
      />
    </HeadManagerContext.Provider>
  );
  const title = head.find((element) => element.type === 'title');
  const keywords = head.find(
    (element) => element.type === 'meta' && element.props.name === 'keywords'
  );
  return {
    title: title?.props.children,
    keywords: keywords?.props.content,
    html: renderToStaticMarkup(<>{head}</>),
    head,
    pageProps,
  };
}

function expectDefault(result: Awaited<ReturnType<typeof renderReport>>) {
  expect(result.title).toBe('OSS Compass');
  expect(result.keywords).toBe(defaultKeywords);
  expect(result.html).toContain('name="description"');
  expect(result.pageProps.translationFixture).toEqual({
    cookies: { lang: 'zh', session: 'private-cookie' },
    namespaces: ['analyze', 'metrics_models'],
  });
  expect(() => JSON.stringify(result.pageProps)).not.toThrow();
}

describe('public report metadata in the initial server head', () => {
  it('renders the verified repository title and keywords before client effects', async () => {
    const result = await renderReport({}, { slugs: 'repo' });
    expect(result.html).toContain(
      '<title>OSS Compass | oss-compass/compass-web</title>'
    );
    expect(result.keywords).toBe(`oss-compass/compass-web,${defaultKeywords}`);
    expect(
      result.head.filter((element) => element.type === 'title')
    ).toHaveLength(1);
    expect(requests).toHaveLength(1);
  });

  it.each(['community', 'project'])(
    'uses the verified %s label as its name',
    async (slug) => {
      const result = await renderReport({}, { slugs: slug });
      expect(result.title).toBe(`OSS Compass | ${reports[slug].label}`);
      expect(result.keywords).toBe(`${reports[slug].label},${defaultKeywords}`);
    }
  );

  it('resolves comparisons in URL order through one GraphQL request', async () => {
    const result = await renderReport(
      {},
      { slugs: 'community..repo..project' }
    );
    expect(result.title).toBe(
      'OSS Compass | 开放原子社区 vs oss-compass/compass-web vs Compass Project'
    );
    expect(result.keywords).toBe(
      `开放原子社区,oss-compass/compass-web,Compass Project,${defaultKeywords}`
    );
    expect(requests).toHaveLength(1);
    expect(requests[0].variables).toEqual({
      value0: 'community',
      value1: 'repo',
      value2: 'project',
    });
  });

  it('uses the actual route slug instead of conflicting query values', async () => {
    const result = await renderReport(
      { slugs: 'community', label: 'project' },
      { slugs: 'repo' }
    );
    expect(result.title).toBe('OSS Compass | oss-compass/compass-web');
    expect(requests[0].variables).toEqual({ value0: 'repo' });
  });

  it('handles a string-array slug the same way as the report hook', async () => {
    const result = await renderReport({ slugs: ['repo', 'community'] });
    expect(result.title).toBe('OSS Compass | oss-compass/compass-web');
    expect(requests[0].variables).toEqual({ value0: 'repo' });
  });

  it.each(['pending', 'progress', 'success'])(
    'includes a report with %s status',
    async (status) => {
      reports.repo.status = status;
      expect((await renderReport({}, { slugs: 'repo' })).title).toBe(
        'OSS Compass | oss-compass/compass-web'
      );
    }
  );

  it('omits unavailable comparisons while keeping verified reports', async () => {
    reports.community.status = 'canceled';
    const result = await renderReport(
      {},
      { slugs: 'missing..community..repo' }
    );
    expect(result.title).toBe('OSS Compass | oss-compass/compass-web');
    expect(result.keywords).toBe(`oss-compass/compass-web,${defaultKeywords}`);
  });

  it('uses verified names for legacy label URLs instead of trusting their input', async () => {
    const result = await renderReport(
      { label: ['repo', 'community'] },
      undefined,
      true
    );
    expect(result.title).toBe(
      'OSS Compass | oss-compass/compass-web vs 开放原子社区'
    );
    expect(requests).toHaveLength(1);
    expect(requests[0].query).toContain('analysisStatusVerify(label: $value0)');
  });

  it('deduplicates legacy labels and ignores empty or whitespace labels', async () => {
    const result = await renderReport(
      { label: ['', 'repo', 'repo', 'has spaces'] },
      undefined,
      true
    );
    expect(result.title).toBe('OSS Compass | oss-compass/compass-web');
    expect(requests[0].variables).toEqual({ value0: 'repo' });
  });

  it('keeps URL values in GraphQL variables and escapes verified HTML characters', async () => {
    const input = 'x") { currentUser { email } } #';
    reports[input] = {
      label: '<script>alert("x")</script> & 社区',
      level: 'community',
      status: 'success',
    };
    const result = await renderReport({}, { slugs: input });
    expect(result.title).toBe(`OSS Compass | ${reports[input].label}`);
    expect(result.html).toContain('&lt;script&gt;');
    expect(result.html).not.toContain('<script>');
    expect(requests[0].query).not.toContain(input);
    expect(requests[0].variables.value0).toBe(input);
  });

  it('uses only the configured backend without forwarding visitor credentials', async () => {
    process.env.API_URL = `${endpoint}/ignored/base/path`;
    const result = await renderReport({}, { slugs: 'repo' });
    expect(result.title).toBe('OSS Compass | oss-compass/compass-web');
    expect(requests[0].url).toBe('/api/graphql');
    expect(requests[0].headers.cookie).toBeUndefined();
    expect(requests[0].headers.authorization).toBeUndefined();
    expect(requests[0].headers.host).not.toBe('untrusted.invalid');
  });

  it.each(['error', 'canceled', 'unsubmit', null])(
    'keeps default metadata for unavailable status %s',
    async (status) => {
      reports.repo.status = status;
      expectDefault(await renderReport({}, { slugs: 'repo' }));
    }
  );

  it.each([null, ''])(
    'keeps default metadata for an empty verified label %s',
    async (label) => {
      reports.repo.label = label;
      expectDefault(await renderReport({}, { slugs: 'repo' }));
    }
  );

  it.each(['http-error', 'invalid-json', 'graphql-error', 'empty'] as const)(
    'keeps reports available after %s responses',
    async (failure) => {
      mode = failure;
      expectDefault(await renderReport({}, { slugs: 'repo' }));
      expect(requests).toHaveLength(1);
    }
  );

  it('aborts an unresponsive backend and still returns serializable page props', async () => {
    mode = 'timeout';
    expectDefault(await renderReport({}, { slugs: 'repo' }));
    expect(requests).toHaveLength(1);
  });

  it.each([undefined, 'not a URL', 'file:///tmp/backend'])(
    'falls back when API_URL is %s',
    async (apiUrl) => {
      if (apiUrl === undefined) delete process.env.API_URL;
      else process.env.API_URL = apiUrl;
      expectDefault(await renderReport({}, { slugs: 'repo' }));
      expect(requests).toHaveLength(0);
    }
  );

  it('keeps default metadata on an unlabelled legacy page without a backend request', async () => {
    expectDefault(await renderReport({}, undefined, true));
    expect(requests).toHaveLength(0);
  });
});
