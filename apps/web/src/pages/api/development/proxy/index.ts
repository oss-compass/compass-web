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
  autoRewrite: false,
  changeOrigin: true,
  // proxyTimeout: 100 * 1000,
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  proxy.web(req, res, { target: API_URL }, (error) => {
    console.error('Development API proxy failed:', error);
    if (res.headersSent) {
      res.destroy(error);
      return;
    }
    res.status(502).json({ message: 'Bad Gateway' });
  });
}
