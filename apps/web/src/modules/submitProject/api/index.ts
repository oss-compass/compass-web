import * as githubApi from './github';
import * as giteeApi from './gitee';
import * as gitcodeApi from './gitcode';

export * from './common';

export const getRepos = (provider: string) => {
  if (provider === 'gitee') {
    return giteeApi.getRepos;
  }
  if (provider === 'gitcode') {
    return gitcodeApi.getRepos;
  }
  return githubApi.getRepos;
};

export const getOrgRepos = (provider: string) => {
  if (provider === 'gitee') {
    return giteeApi.getOrgRepos;
  }
  if (provider === 'gitcode') {
    return gitcodeApi.getOrgRepos;
  }
  return githubApi.getOrgRepos;
};

export const getOrganizations = (provider: string) => {
  if (provider === 'gitee') {
    return giteeApi.getUserOrgs;
  }
  if (provider === 'gitcode') {
    return gitcodeApi.getUserOrgs;
  }
  return githubApi.getUserOrgs;
};
