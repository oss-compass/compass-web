import axios, { AxiosResponse } from 'axios';

import {
  defaultPageSize,
  Repos,
  ReposParams,
  OrgParams,
  Organization,
} from './common';

const TOKEN = 'yVW2WJjVB3sM4RbLSmCszhcF';

export async function getRepos({
  username,
  sort = 'updated',
  page,
  per_page = defaultPageSize,
}: ReposParams): Promise<AxiosResponse<Repos[]>> {
  return await axios.get(
    `https://api.gitcode.com/api/v5/users/${username}/repos`,
    {
      params: {
        access_token: TOKEN,
        order_by: sort === 'updated' ? 'updated_at' : sort,
        page,
        per_page,
        visibility: 'public',
      },
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true,
    }
  );
}

export async function getUserOrgs({
  username,
}: {
  username: string;
}): Promise<AxiosResponse<Organization[]>> {
  return await axios.get(
    `https://api.gitcode.com/api/v5/users/${username}/orgs`,
    {
      params: {
        access_token: TOKEN,
      },
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true,
    }
  );
}

export async function getOrgRepos({
  org,
  sort = 'updated',
  page,
  per_page = defaultPageSize,
}: OrgParams): Promise<AxiosResponse<Repos[]>> {
  return await axios.get(`https://api.gitcode.com/api/v5/orgs/${org}/repos`, {
    params: {
      access_token: TOKEN,
      order_by: sort === 'updated' ? 'updated_at' : sort,
      page,
      per_page,
      visibility: 'public',
    },
    headers: {
      Accept: 'application/json',
    },
    withCredentials: true,
  });
}
