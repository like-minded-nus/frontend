import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReduxProvider } from '../redux/provider';
import { Suspense } from 'react';
import { getServerSession } from 'next-auth';
import { NextAuthProvider } from './next-auth-provider';
import { authOptions } from './api/auth/[...nextauth]/authOptions';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LikeMinded',
  description: 'A dating app based on common hobbies and interests',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang='en'>
      <body className={inter.className}>
        <Suspense
          fallback={
            <div className='flex h-screen w-screen justify-center align-middle'>
              Loading...
            </div>
          }
        >
          <NextAuthProvider session={session}>
            <ReduxProvider>{children}</ReduxProvider>
          </NextAuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
