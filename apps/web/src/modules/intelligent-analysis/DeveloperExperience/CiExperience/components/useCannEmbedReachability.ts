import { useEffect, useState } from 'react';

const CANN_EMBED_PROBE_URL = 'https://simulator.cc.cd/';
const CANN_EMBED_PROBE_TIMEOUT_MS = 3000;

/**
 * 首屏渲染后，从用户浏览器异步探测第三方报告域名是否可达。
 * no-cors 响应内容不可读，但网络成功时 Promise 会立即完成；3 秒仅为超时上限。
 */
const useCannEmbedReachability = (): boolean => {
  const [reachable, setReachable] = useState<boolean | null>(null);

  useEffect(() => {
    if (reachable !== null) return;

    const controller = new AbortController();
    let active = true;
    const timeout = window.setTimeout(
      () => controller.abort(),
      CANN_EMBED_PROBE_TIMEOUT_MS
    );

    void fetch(CANN_EMBED_PROBE_URL, {
      method: 'GET',
      mode: 'no-cors',
      cache: 'no-store',
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
      signal: controller.signal,
    })
      .then(() => {
        if (active) setReachable(true);
      })
      .catch(() => {
        if (active) setReachable(false);
      })
      .finally(() => window.clearTimeout(timeout));

    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [reachable]);

  return reachable === true;
};

export default useCannEmbedReachability;
