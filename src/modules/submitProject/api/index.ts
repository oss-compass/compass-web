import * as githubApi from './github';
import * as giteeApi from './gitee';

export * from './common';

export const getRepos = (provider: string) => {
  if (provider === 'gitee') {
    return giteeApi.getRepos;
  }
  return githubApi.getRepos;
};

export const getOrgRepos = (provider: string) => {
  if (provider === 'gitee') {
    return giteeApi.getOrgRepos;
  }
  return githubApi.getOrgRepos;
};

export const getOrganizations = (provider: string) => {
  if (provider === 'gitee') {
    return giteeApi.getUserOrgs;
  }
  return githubApi.getUserOrgs;
};
