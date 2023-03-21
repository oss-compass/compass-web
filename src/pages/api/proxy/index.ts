import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';

const API_URL = process.env.API_URL;

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  proxyTimeout: 5 * 1000,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return new Promise((resolve, reject) => {
    proxy.once('error', reject);
    proxy.web(req, res, { target: API_URL });
  });
}
