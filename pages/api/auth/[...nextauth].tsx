import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider, { GithubProfile } from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async session({ session, user, token }) {
      session.uid = token.uid;
      session.login = token.login;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (profile) {
        token.uid = profile.id;
        token.login = profile.login;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
