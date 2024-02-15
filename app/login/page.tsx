'use client';


import { useRouter } from 'next/navigation';
import LoginCard from '../components/login-card';
import React, { useEffect } from 'react';

const Login = () => {
  const router = useRouter();
  useEffect(() => {
    if (sessionStorage.getItem('userId') !== null) {
      // router.push('/home');
      window.location.href = '/home';
    }
  }, []);

  return (
    <div className='login-register-page-div'>
      <LoginCard />
    </div>
  );
};

export default Login;
