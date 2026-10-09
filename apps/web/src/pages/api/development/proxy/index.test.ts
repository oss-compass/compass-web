import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';
import handler from './index';

jest.mock('http-proxy', () => {
  const proxy = { web: jest.fn(), once: jest.fn() };
  return {
    __esModule: true,
    default: { createProxyServer: () => proxy },
  };
});

const proxy = httpProxy.createProxyServer();
const mockWeb = proxy.web as jest.Mock;
const mockOnce = proxy.once as jest.Mock;

function request() {
  return { url: '/services/dashboard/list' } as NextApiRequest;
}

function response() {
  return {
    headersSent: false,
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    destroy: jest.fn(),
  };
}

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('development API proxy', () => {
  it('does not retain a shared error listener or pending promise for successful requests', () => {
    const first = handler(request(), response() as unknown as NextApiResponse);
    const second = handler(request(), response() as unknown as NextApiResponse);

    expect(first).toBeUndefined();
    expect(second).toBeUndefined();
    expect(mockWeb).toHaveBeenCalledTimes(2);
    expect(mockOnce).not.toHaveBeenCalled();
  });

  it('returns 502 when the upstream connection fails before headers', () => {
    const res = response();
    handler(request(), res as unknown as NextApiResponse);
    const callback = mockWeb.mock.calls[0][3];
    callback(new Error('connection refused'));

    expect(res.status).toHaveBeenCalledWith(502);
    expect(res.json).toHaveBeenCalledWith({ message: 'Bad Gateway' });
  });

  it('closes a partially sent response on an upstream failure', () => {
    const res = { ...response(), headersSent: true };
    handler(request(), res as unknown as NextApiResponse);
    const callback = mockWeb.mock.calls[0][3];
    const error = new Error('upstream disconnected');
    callback(error);

    expect(res.destroy).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
  });
});
