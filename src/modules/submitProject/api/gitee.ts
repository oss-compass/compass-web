import axios, { AxiosResponse } from 'axios';

import {
  defaultPageSize,
  Repos,
  ReposParams,
  OrgParams,
  Organization,
} from './common';

export async function getRepos({
  username,
  sort = 'updated',
  q,
}: ReposParams): Promise<AxiosResponse<Repos[]>> {
  return await axios.get(`https://gitee.com/api/v5/users/${username}/repos`, {
    params: { sort, q, type: 'all' },
    headers: {
      accept: 'application/json',
    },
  });
}

export async function getUserOrgs({
  username,
}: {
  username: string;
}): Promise<AxiosResponse<Organization[]>> {
  return await axios.get(`https://gitee.com/api/v5/users/${username}/orgs`, {
    headers: {
      accept: 'application/json',
    },
  });
}

export async function getOrgRepos({
  org,
  sort = 'updated',
  page,
  per_page = defaultPageSize,
}: OrgParams): Promise<AxiosResponse<Repos[]>> {
  return await axios.get(`https://gitee.com/api/v5/orgs/${org}/repos`, {
    params: { sort, page, per_page, type: 'public' },
    headers: {
      accept: 'application/json',
    },
  });
}
