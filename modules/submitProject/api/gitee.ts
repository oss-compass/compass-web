import axios, { AxiosResponse } from 'axios';

import {
  defaultPageSize,
  Repos,
  ReposParams,
  OrgParams,
  Organization,
} from './common';

export async function getRepos({
  token,
  sort = 'updated',
  q,
}: ReposParams): Promise<AxiosResponse<Repos[]>> {
  return await axios.get('https://gitee.com/api/v5/user/repos', {
    params: { sort, q, type: 'public' },
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
}

export async function getOrgRepos({
  org,
  token,
  sort = 'updated',
  page,
  per_page = defaultPageSize,
}: OrgParams): Promise<AxiosResponse<Repos[]>> {
  return await axios.get(`https://gitee.com/api/v5/orgs/${org}/repos`, {
    params: { sort, page, per_page, type: 'public' },
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
}

export async function getOrganizations({
  token,
}: {
  token: string;
}): Promise<AxiosResponse<Organization[]>> {
  return await axios.get('https://gitee.com/api/v5/user/orgs', {
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
}
