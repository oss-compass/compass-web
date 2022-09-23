import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';
import { sleep } from '@common/utils';

export const config = {
  api: {
    bodyParser: true,
  },
};

const API_URL = process.env.API_URL;
const proxy = httpProxy.createProxyServer({});

proxy.on('proxyReq', function (proxyReq, req: any, res, options) {
  if (!req.body || !Object.keys(req.body).length) {
    return;
  }

  const contentType = proxyReq.getHeader('Content-Type');
  let bodyData;

  if (contentType === 'application/json') {
    bodyData = JSON.stringify(req.body);
  }

  if (bodyData) {
    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
    proxyReq.write(bodyData);
  }
});

/**
 * use in development mode to proxy requests to the API
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await sleep(500);

  return new Promise((resolve, reject) => {
    proxy.once('error', reject);
    proxy.web(req, res, { target: API_URL });
  });
}
