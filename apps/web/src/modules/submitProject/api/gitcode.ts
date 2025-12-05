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
  page,
  per_page = defaultPageSize,
}: ReposParams): Promise<AxiosResponse<Repos[]>> {
  return await axios.get(
    `https://gitcode.com/api/v4/users/${username}/projects`,
    {
      params: {
        order_by: sort === 'updated' ? 'updated_at' : sort,
        page,
        per_page,
        visibility: 'public',
      },
      headers: {
        accept: 'application/json',
      },
    }
  );
}

export async function getUserOrgs({
  username,
}: {
  username: string;
}): Promise<AxiosResponse<Organization[]>> {
  return await axios.get(
    `https://gitcode.com/api/v4/users/${username}/groups`,
    {
      headers: {
        accept: 'application/json',
      },
    }
  );
}

export async function getOrgRepos({
  org,
  sort = 'updated',
  page,
  per_page = defaultPageSize,
}: OrgParams): Promise<AxiosResponse<Repos[]>> {
  return await axios.get(`https://gitcode.com/api/v4/groups/${org}/projects`, {
    params: {
      order_by: sort === 'updated' ? 'updated_at' : sort,
      page,
      per_page,
      visibility: 'public',
    },
    headers: {
      accept: 'application/json',
    },
  });
}
