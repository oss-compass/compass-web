import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';
import { sleep } from '@common/utils';

const API_URL = process.env.API_URL;

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer({
  autoRewrite: false,
  changeOrigin: true,
  // proxyTimeout: 100 * 1000,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(`proxy - source: ${req.url}  ->  target: ${API_URL}${req.url}`);
  // await sleep(100);
  return new Promise((resolve, reject) => {
    proxy.once('error', reject);
    proxy.web(req, res, { target: API_URL }, (err, req, res, target) => {
      console.log(err, req, res, target);
    });
  });
}
