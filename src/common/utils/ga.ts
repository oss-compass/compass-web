export const PUBLIC_GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

export const gaPageView = (url: string) => {
  window.gtag('config', PUBLIC_GA_ID!, { page_path: url });
};

export const gaEvent = (opts: {
  action: string;
  params: Record<string, any>;
}) => {
  window.gtag('event', opts.action, opts.params);
};
