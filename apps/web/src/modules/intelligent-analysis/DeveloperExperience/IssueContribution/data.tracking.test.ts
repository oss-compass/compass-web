import {
  createIssuePainRerun,
  fetchIssuePainTrackings,
  postIssuePainTrackingAction,
} from './data';

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

  it.each([
    [500, '500'],
    [2000, '2,000'],
  ])(
    'shows the actual server limit (%i) for batch actions and reruns',
    async (limit, display) => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 422,
        json: async () => ({
          detail: [
            {
              loc: ['body', 'issueNumbers'],
              type: 'too_long',
              ctx: { max_length: limit },
            },
          ],
        }),
      });
      const payload = {
        community: 'cann/demo',
        trackingKey: 'tracking',
        reportKey: 'report',
        operator: 'tester',
        issueNumbers: ['70'],
      };
      const message = `单次最多提交 ${display} 条 Issue，请减少勾选后再提交。`;
      await expect(
        postIssuePainTrackingAction({
          ...payload,
          type: 'decide_issues',
          valid: true,
        })
      ).rejects.toThrow(message);
      await expect(createIssuePainRerun(payload)).rejects.toThrow(message);
    }
  );

  it.each([
    [
      422,
      [{ loc: ['body', 'operator'], type: 'string_too_long' }],
      '提交人填写有误',
    ],
    [
      422,
      [{ loc: ['body', 'reportKey'], type: 'missing' }],
      '请刷新报告后再提交',
    ],
    [422, [], '提交内容未通过校验'],
    [
      503,
      { message: '部分任务未能入队，请查看重跑记录' },
      '部分任务未能入队，请查看重跑记录',
    ],
  ])(
    'reports a useful message for HTTP %i',
    async (status, detail, expected) => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status,
        json: async () => ({ detail }),
      });
      await expect(
        createIssuePainRerun({
          community: 'cann/demo',
          trackingKey: 'tracking',
          reportKey: 'report',
          operator: 'tester',
          issueNumbers: ['70'],
        })
      ).rejects.toThrow(expected);
    }
  );
});
