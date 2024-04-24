'use client';

import { Profile } from '@/models/profile';
import { getProfileByUserId } from '@/redux/features/profileSlice';
import { setActiveItem, setUserId } from '@/redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

const Demo = () => {
  redirect('/browse');

  return <></>;
};

export default Demo;
