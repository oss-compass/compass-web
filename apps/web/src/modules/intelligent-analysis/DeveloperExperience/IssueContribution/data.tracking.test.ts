import { fetchIssuePainTrackings, postIssuePainTrackingAction } from './data';

describe('Issue tracking report scope', () => {
  const originalFetch = global.fetch;
  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('loads tracking with the exact report key', async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValue({ ok: true, json: async () => ({ items: [] }) });
    global.fetch = fetchMock;
    await fetchIssuePainTrackings(
      'cann/demo',
      '2026-10-19_to_2026-10-25',
      undefined,
      'gitcode:cann/demo:old:v4'
    );
    const query = new URL(fetchMock.mock.calls[0][0], 'http://localhost')
      .searchParams;
    expect(query.get('reportKey')).toBe('gitcode:cann/demo:old:v4');
    expect(query.get('period')).toBe('2026-10-19_to_2026-10-25');
  });

  it('sends the report scope with Issue decisions', async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValue({ ok: true, json: async () => ({ message: 'ok' }) });
    global.fetch = fetchMock;
    await postIssuePainTrackingAction({
      community: 'cann/demo',
      trackingKey: 'tracking',
      reportKey: 'old-report',
      type: 'decide_issue',
      operator: 'test',
      issueNumber: '70',
      valid: true,
    });
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({
      reportKey: 'old-report',
      issueNumber: '70',
    });
  });
});
