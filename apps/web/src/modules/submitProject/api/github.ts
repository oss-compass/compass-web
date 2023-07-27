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
  return await axios.get(`https://api.github.com/users/${username}/repos`, {
    params: { sort, page, per_page },
    headers: {
      accept: 'application/vnd.github+json',
    },
  });
}

export async function getUserOrgs({
  username,
}: {
  username: string;
}): Promise<AxiosResponse<Organization[]>> {
  return await axios.get(`https://api.github.com/users/${username}/orgs`, {
    headers: {
      accept: 'application/vnd.github+json',
    },
  });
}

export async function getOrgRepos({
  org,
  sort = 'updated',
  page,
  per_page = defaultPageSize,
}: OrgParams): Promise<AxiosResponse<Repos[]>> {
  return await axios.get(`https://api.github.com/orgs/${org}/repos`, {
    params: { sort, page, per_page },
    headers: {
      accept: 'application/vnd.github+json',
    },
  });
}
