import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

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
