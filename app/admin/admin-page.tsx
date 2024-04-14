import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import { redirect } from 'next/navigation';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) {
    redirect('/login');
  }
  if (session?.user.userRole !== 1) {
    redirect('/home');
  }
  if (session?.user.userRole === 1) {
    redirect('/admin/user_management');
  }

  return (
    <>
      <div className='mt-4 flex justify-center'>
        <h1 className='text-4xl font-semibold italic'>ADMIN PANEL</h1>
      </div>
    </>
  );
};

export default AdminPage;
