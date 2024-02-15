'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LikeMindedApp = () => {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem('userId') === null) {
      // router.push('/login');
      window.location.href = '/login';
    } else {
      // router.push('/home');
      window.location.href = '/home';
    }
  }, []);
};

export default LikeMindedApp;
