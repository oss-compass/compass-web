import axios, { AxiosResponse } from 'axios';

import { defaultPageSize } from './constant';

export async function getRepos({
  token,
  sort = 'updated',
  q,
}: {
  token: string;
  sort?: 'created' | 'updated' | 'pushed' | 'full_name';
  q?: string;
}): Promise<
  AxiosResponse<
    {
      id: number;
      full_name: string;
      language: string;
      html_url: string;
      updated_at: string;
    }[]
  >
> {
  return await axios.get('https://gitee.com/api/v5/user/repos', {
    params: { sort, q },
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
}

export async function getOrgs({ token }: { token: string }) {
  return await axios.get('https://gitee.com/api/v5/user/repos', {
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
}
