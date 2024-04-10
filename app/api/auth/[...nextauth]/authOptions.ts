import { DefaultSession, DefaultUser, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      userRole: number;
      isPremium: number;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    userRole: number;
    isPremium: number;
  }
}
const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT ?? '';
const LOGIN_API_URL = `${endpoint}/user/login`;
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'Username', type: 'text ' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const response = await fetch(LOGIN_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });
        const user = await response.json();
        if (user.payload) {
          return user.payload;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log('jwt callback');
      if (user) {
        token.uid = user.id;
        token.role = user.userRole;
        token.isPremium = user.isPremium;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.uid,
          userRole: token.role,
          isPremium: token.isPremium,
        },
      };
    },
  },
};
