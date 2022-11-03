export const defaultPageSize = 100;

export interface Repos {
  id: number;
  name: string;
  full_name: string;
  language: string;
  html_url: string;
  updated_at: string;
}

export interface ReposParams {
  token: string;
  sort?: 'created' | 'updated' | 'pushed' | 'full_name';
  q?: string;
  page?: number;
  per_page?: number;
}

export interface OrgParams {
  org: string;
  token: string;
  sort?: 'created' | 'updated' | 'pushed' | 'full_name';
  page?: number;
  per_page?: number;
}

export interface Organization {
  avatar_url: string;
  id: number;
  login: string;
}
