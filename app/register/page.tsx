'use client';
import { useEffect } from 'react';
import RegisterCard from '../components/register-card';

const Register = () => {
  useEffect(() => {
    if (sessionStorage.getItem('userId') !== null) {
      window.location.href = '/home';
    }
  }, []);

  return (
    <div className='login-register-page-div'>
      <RegisterCard />
    </div>
  );
};

export default Register;
