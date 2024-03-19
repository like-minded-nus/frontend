import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authOptions } from './authOptions';

const LOGIN_API_URL = 'http://localhost:8080/api/v1/user/login';
const handler = NextAuth(authOptions);
// const handler = NextAuth({
//   session: {
//     strategy: 'jwt',
//   },
//   pages: {
//     signIn: '/login',
//   },
//   providers: [
//     CredentialsProvider({
//       credentials: {
//         username: { label: 'Username', type: 'text ' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials, req) {
//         const response = await fetch(LOGIN_API_URL, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             username: credentials?.username,
//             password: credentials?.password,
//           }),
//         });
//         const user = await response.json();
//         if (user.payload) {
//           return user.payload;
//         } else {
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.uid = user.id
//       }
//       console.log(token);
//       console.log("------------------------")
//       return token
//     },
//     async session({ session, token}) {
//       console.log(session)
//       console.log(token)
//       if (token.loggedUser) {
//         session.user.id = token.uid as number;
//       }
//       console.log(session);
//       return session;
//     }
//   }

// });

export { handler as GET, handler as POST };
