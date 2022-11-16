import getConfig from 'next/config';

/**
 * publicRuntimeConfig undefined in test environment with Jest
 * // https://github.com/vercel/next.js/issues/4024
 */
const { publicRuntimeConfig = {} } = getConfig() || {};

export const PUBLIC_GA_ID = publicRuntimeConfig.googleAnalyticsId;

export const gaPageView = (url: string) => {
  window.gtag('config', PUBLIC_GA_ID!, { page_path: url });
};

export const gaEvent = (opts: {
  action: string;
  params: Record<string, any>;
}) => {
  window.gtag('event', opts.action, opts.params);
};
