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

// `proxy.web()` delivers upstream errors to its callback instead of emitting
// 'error', so a per-request `proxy.once('error', ...)` would never fire and
// never be removed: the shared server would accumulate one listener per request
// until Node's default maxListeners (10) trips. One module-level listener keeps
// the count flat, and also covers the path that does emit -- `web()` with a
// missing/invalid target (lib/http-proxy/index.js) -- where an unhandled
// 'error' event would otherwise crash the process.
proxy.on('error', (err) => {
  console.error(`proxy - upstream error: ${err}`);
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(`proxy - source: ${req.url}  ->  target: ${API_URL}${req.url}`);
  // await sleep(100);
  // http-proxy pipes the upstream response itself and only invokes this
  // callback on failure, so there is nothing to await here. Returning a
  // promise would leave it pending for the lifetime of every request.
  proxy.web(req, res, { target: API_URL }, (err) => {
    if (err) console.error(`proxy - error: ${err}`);
  });
}
