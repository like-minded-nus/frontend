'use client';

import { Profile } from '@/models/profile';
import ProfileForm from './profile-form';
import { useAppSelector } from '@/redux/hooks';
import { useEffect, useState } from 'react';
const ProfileComponent = () => {
  const sessionProfile: Profile = useAppSelector(
    (state) => state.profileReducer.sessionProfile
  );

  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    if (sessionProfile?.profileId) {
      setHasProfile(true);
    }
  }, [sessionProfile]);
  return (
    <>
      <div className='body-blur'></div>
      <div className='flex h-[90%] flex-col items-center justify-start'>
        <h1 className='text-4xl font-semibold'>
          {hasProfile ? 'Update Your Profile' : 'Create Your Profile'}
        </h1>
        <ProfileForm />
      </div>
    </>
  );
};

export default ProfileComponent;
