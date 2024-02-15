'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Base from '../components/base';
import Demo from '../components/demo';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem('userId') === null) {
      // router.push('/login');
      window.location.href = '/login';
    }
  });

  const component = <Demo />;

  return <Base content={component} />;
};

export default Home;
