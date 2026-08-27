import { useEffect, useState } from 'react';

const CANN_EMBED_PROBE_URL = 'https://simulator.cc.cd/favicon.ico';
const CANN_EMBED_PROBE_TIMEOUT_MS = 3000;

/**
 * 首屏渲染后，从用户浏览器异步探测第三方报告域名是否可达。
 * 使用真实图片而非 no-cors fetch，避免将代理拦截页等任意响应误判为可达。
 * 查询参数用于绕过用户之前在内网访问时留下的长期 favicon 缓存。
 */
const useCannEmbedReachability = (): boolean => {
  const [reachable, setReachable] = useState<boolean | null>(null);

  useEffect(() => {
    if (reachable !== null) return;

    let active = true;
    const image = new Image();
    const finish = (result: boolean) => {
      if (!active) return;
      active = false;
      window.clearTimeout(timeout);
      image.onload = null;
      image.onerror = null;
      setReachable(result);
    };
    const timeout = window.setTimeout(
      () => finish(false),
      CANN_EMBED_PROBE_TIMEOUT_MS
    );

    image.referrerPolicy = 'no-referrer';
    image.onload = () => finish(true);
    image.onerror = () => finish(false);
    image.src = `${CANN_EMBED_PROBE_URL}?embed-probe=${Date.now()}`;

    return () => {
      active = false;
      window.clearTimeout(timeout);
      image.onload = null;
      image.onerror = null;
    };
  }, [reachable]);

  return reachable === true;
};

export default useCannEmbedReachability;
