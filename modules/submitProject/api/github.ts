import axios, { AxiosResponse } from 'axios';
import { defaultPageSize } from './constant';

export interface Repos {
  id: number;
  name: string;
  full_name: string;
  language: string;
  html_url: string;
  updated_at: string;
}

export async function getRepos({
  token,
  sort = 'updated',
  page,
  per_page = defaultPageSize,
}: {
  token: string;
  sort?: 'created' | 'updated' | 'pushed' | 'full_name';
  page?: number;
  per_page?: number;
}): Promise<AxiosResponse<Repos[]>> {
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
}: {
  org: string;
  token: string;
  sort?: 'created' | 'updated' | 'pushed' | 'full_name';
  page?: number;
  per_page?: number;
}): Promise<AxiosResponse<Repos[]>> {
  return await axios.get(`https://api.github.com/orgs/${org}/repos`, {
    params: { sort, page, per_page },
    headers: {
      accept: 'application/vnd.github+json',
      authorization: `Bearer ${token}`,
    },
  });
}

export interface Organizations {
  avatar_url: string;
  id: 87627486;
  login: 'dora-projects';
}

export async function getOrganizations({
  token,
}: {
  token: string;
}): Promise<AxiosResponse<Organizations[]>> {
  return await axios.get('https://api.github.com/user/orgs', {
    headers: {
      accept: 'application/vnd.github+json',
      authorization: `Bearer ${token}`,
    },
  });
}
