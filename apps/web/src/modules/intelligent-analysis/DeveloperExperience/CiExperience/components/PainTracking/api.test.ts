import { fetchTrackings, TRACKING_LOAD_TIMEOUT_MS } from './api';

const scope = {
  org: 'cann',
  repo: 'runtime',
  workflow: 'runtime_action',
  day: '2026-09-15',
};
const originalFetch = global.fetch;

beforeEach(() => {
  jest.useFakeTimers();
  global.fetch = jest.fn();
});
afterEach(() => {
  jest.useRealTimers();
  global.fetch = originalFetch;
});

it('returns an empty tracking list normally so the page can show pending', async () => {
  (fetch as jest.Mock).mockResolvedValue({
    ok: true,
    json: async () => ({ items: [] }),
  });
  await expect(fetchTrackings(scope)).resolves.toEqual({ items: [] });
  expect(jest.getTimerCount()).toBe(0);
});

it('stops a hung request with a timeout and aborts its network request', async () => {
  (fetch as jest.Mock).mockReturnValue(new Promise(() => {}));
  const result = fetchTrackings(scope);
  const assertion = expect(result).rejects.toMatchObject({
    status: 504,
    message: expect.stringContaining('加载超时'),
  });
  jest.advanceTimersByTime(TRACKING_LOAD_TIMEOUT_MS);
  await assertion;
  expect((fetch as jest.Mock).mock.calls[0][1].signal.aborted).toBe(true);
  expect(jest.getTimerCount()).toBe(0);
});

it('cancels a previous report without waiting for its timeout', async () => {
  (fetch as jest.Mock).mockReturnValue(new Promise(() => {}));
  const controller = new AbortController();
  const result = fetchTrackings(scope, controller.signal);
  const assertion = expect(result).rejects.toMatchObject({
    name: 'AbortError',
  });
  controller.abort();
  await assertion;
  expect(jest.getTimerCount()).toBe(0);
});

it('also times out when headers arrive but the response body hangs', async () => {
  (fetch as jest.Mock).mockResolvedValue({
    ok: true,
    json: () => new Promise(() => {}),
  });
  const result = fetchTrackings(scope);
  const assertion = expect(result).rejects.toMatchObject({ status: 504 });
  await Promise.resolve();
  jest.advanceTimersByTime(TRACKING_LOAD_TIMEOUT_MS);
  await assertion;
});
