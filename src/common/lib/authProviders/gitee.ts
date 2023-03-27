import type { OAuthConfig, OAuthUserConfig } from 'next-auth/providers';

export interface GiteeProfile extends Record<string, any> {
  avatar_url: string;
  bio: string;
  blog: string;
  created_at: string;
  email: string;
  events_url: string;
  followers: string;
  followers_url: string;
  following: string;
  following_url: string;
  gists_url: string;
  html_url: string;
  id: number;
  login: string;
  member_role: string;
  name: string;
  organizations_url: string;
  public_gists: string;
  public_repos: string;
  received_events_url: string;
  remark: string;
  repos_url: string;
  stared: string;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  updated_at: string;
  url: string;
  watched: string;
  weibo: string;
}

export default function Gitee<P extends GiteeProfile>(
  options: OAuthUserConfig<P>
): OAuthConfig<P> {
  return {
    id: 'gitee',
    name: 'Gitee',
    type: 'oauth',
    authorization: {
      url: 'https://gitee.com/oauth/authorize',
      params: { scope: 'user_info' },
    },
    token: 'https://gitee.com/oauth/token',
    userinfo: {
      url: 'https://gitee.com/api/v5/user',
      async request({ client, tokens }) {
        return await client.userinfo(tokens.access_token!);
      },
    },
    profile(profile) {
      return {
        id: profile.id.toString(),
        name: profile.name ?? profile.login,
        email: profile.email,
        image: profile.avatar_url,
      };
    },
    options,
  };
}
