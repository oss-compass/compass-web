import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider, { GithubProfile } from 'next-auth/providers/github';
import GiteeProvider, { GiteeProfile } from '@common/lib/authProviders/gitee';

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      httpOptions: {
        timeout: 5000,
      },
    }),
    GiteeProvider({
      clientId: process.env.GITEE_ID!,
      clientSecret: process.env.GITEE_SECRET!,
      httpOptions: {
        timeout: 5000,
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async session({ session, user, token }) {
      session.provider = token.provider as string;
      session.accessToken = token.accessToken as string;
      session.user.login = token.login as string;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) token.provider = account.provider;
      if (profile) token.login = profile.login;
      if (account) token.accessToken = account.access_token;
      return token;
    },
  },
  pages: {
    signIn: '/submit-your-project',
  },
};

export default NextAuth(authOptions);
