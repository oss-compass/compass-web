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
  page,
  per_page = defaultPageSize,
}: ReposParams): Promise<AxiosResponse<Repos[]>> {
  return await axios.get('https://api.github.com/user/repos', {
    params: { sort, page, per_page },
    headers: {
      accept: 'application/vnd.github+json',
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
  return await axios.get(`https://api.github.com/orgs/${org}/repos`, {
    params: { sort, page, per_page },
    headers: {
      accept: 'application/vnd.github+json',
      authorization: `Bearer ${token}`,
    },
  });
}

export async function getOrganizations({
  token,
}: {
  token: string;
}): Promise<AxiosResponse<Organization[]>> {
  return await axios.get('https://api.github.com/user/orgs', {
    headers: {
      accept: 'application/vnd.github+json',
      authorization: `Bearer ${token}`,
    },
  });
}
