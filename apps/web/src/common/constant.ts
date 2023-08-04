export const isDev = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production';

export type CommunityRepoType = 'governance' | 'software-artifact';

export const oauthProvider = {
  github: {
    id: 'github',
    name: 'GitHub',
  },
  gitee: {
    id: 'gitee',
    name: 'Gitee',
  },
};

export type ChartTab = 'One' | 'two' | 'three' | 'four';

export const ReFetch = 'refetch';
