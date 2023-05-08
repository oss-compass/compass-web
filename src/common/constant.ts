export const isDev = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production';

export const siteURL = new URL(window.location.href);
export const siteOrigin = siteURL.origin;

export const defaultMeta = {
  title: '',
  description: ``,
  ogImage: `${siteOrigin}/og.png`,
};

export type CommunityRepoType = 'governance' | 'software-artifact';
