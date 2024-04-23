import React from 'react';
import { redirect } from 'next/navigation';

const UsersTable = async () => {
  redirect('/admin/user_management/reports');
};

export default UsersTable;
