export { default } from 'next-auth/middleware';

// protected routes
export const config = {
  matcher: [
    '/home',
    '/browse',
    '/profile',
    '/premium',
    '/admin',
    '/admin/:path*',
    '/matches',
    '/maches/:path*',
  ],
};
