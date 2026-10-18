import type { NextApiRequest, NextApiResponse } from 'next';

type MockProxyServer = {
  once: (ev: string, fn: Function) => MockProxyServer;
  on: (ev: string, fn: Function) => MockProxyServer;
  removeListener: (ev: string, fn: Function) => MockProxyServer;
  listenerCount: (ev: string) => number;
  web: (rq: unknown, rs: unknown, o: unknown, cb?: Function) => void;
};

// The name must start with "mock" to be referenced from a jest.mock factory.
const mockProxyServers: MockProxyServer[] = [];

jest.mock('http-proxy', () => ({
  __esModule: true,
  default: {
    createProxyServer: () => {
      const listeners: Record<string, Function[]> = {};
      const srv: MockProxyServer = {
        once(ev, fn) {
          (listeners[ev] ||= []).push(fn);
          return srv;
        },
        on(ev, fn) {
          (listeners[ev] ||= []).push(fn);
          return srv;
        },
        removeListener(ev, fn) {
          listeners[ev] = (listeners[ev] || []).filter((f) => f !== fn);
          return srv;
        },
        listenerCount(ev) {
          return (listeners[ev] || []).length;
        },
        // Successful proxying: http-proxy pipes the upstream response itself and
        // never invokes the callback (see lib/http-proxy/passes/web-incoming.js).
        web() {
          return undefined;
        },
      };
      mockProxyServers.push(srv);
      return srv;
    },
  },
}));

function makeRes() {
  const res = {
    statusCode: 200,
    headersSent: false,
    body: undefined as unknown,
    status(c: number) {
      res.statusCode = c;
      return res;
    },
    json(p: unknown) {
      res.body = p;
      res.headersSent = true;
      return res;
    },
    setHeader() {
      return res;
    },
    end() {
      res.headersSent = true;
      return res;
    },
    writeHead() {
      res.headersSent = true;
      return res;
    },
    write() {
      return true;
    },
    on() {
      return res;
    },
    once() {
      return res;
    },
    emit() {
      return true;
    },
  };
  return res as unknown as NextApiResponse;
}

const makeReq = () =>
  ({
    method: 'GET',
    url: '/api/foo',
    headers: {},
    query: {},
  } as unknown as NextApiRequest);

const handler = () => import('./index').then((m) => m.default);

describe('GET /api/development/proxy', () => {
  it('creates a single shared proxy server', async () => {
    await handler();
    expect(mockProxyServers).toHaveLength(1);
  });

  it('keeps exactly one "error" listener regardless of request count', async () => {
    const h = await handler();
    const srv = mockProxyServers[0];

    const counts: number[] = [];
    for (let i = 0; i < 20; i++) {
      // Deliberately not awaited: the leak under test is synchronous, and the
      // current implementation's return value never settles at all.
      void Promise.resolve(h(makeReq(), makeRes())).catch(() => undefined);
      counts.push(srv.listenerCount('error'));
    }

    // A listener registered per request would grow to 20 and trip Node's
    // default maxListeners of 10 (MaxListenersExceededWarning).
    expect(counts[0]).toBe(counts[counts.length - 1]);
    expect(counts[counts.length - 1]).toBeLessThanOrEqual(1);
  });

  it('settles its return value instead of leaving a pending promise', async () => {
    const h = await handler();
    const PENDING = Symbol('pending');

    const outcome = await Promise.race([
      Promise.resolve(h(makeReq(), makeRes())).then(() => 'settled'),
      new Promise((resolve) => setTimeout(() => resolve(PENDING), 50)),
    ]);

    // http-proxy pipes the response itself, so the handler has nothing to wait
    // for; returning a promise that never settles leaks one closure per request.
    expect(outcome).toBe('settled');
  });
});
