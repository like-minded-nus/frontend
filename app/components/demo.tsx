'use client';

import { Profile } from '@/models/profile';
import { getProfileByUserId } from '@/redux/features/profileSlice';
import { setActiveItem, setUserId } from '@/redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const Demo = () => {
  const dispatch = useAppDispatch();
  const sessionProfile: Profile = useAppSelector(
    (state) => state.profileReducer.sessionProfile
  );
  const { data: session } = useSession();
  const controller = new AbortController();

  //  fetch user's profile and store in redux state
  useEffect(() => {
    if (session) {
      console.log('userid: ' + session.user.id);
      dispatch(setUserId(session.user.id));
      // fetch profile only once upon logging in and reaching home page
      if (Object.keys(sessionProfile).length === 0) {
        console.log('fetching profile');
        dispatch(
          getProfileByUserId({ controller, userId: Number(session.user.id) })
        );
      }
    }
    return () => {
      controller.abort();
    };
  }, [session]);

  return (
    <>
      <div className='demo-container'>
        <div className='input-group'>
          <label htmlFor='tb_demo_1'>Username</label>
          <input id='tb_demo_1' />
        </div>
        <div className='input-group'>
          <label htmlFor='tb_demo_2'>Password</label>
          <input id='tb_demo_2' type='password' />
        </div>
        <div className='input-group'>
          <input id='tb_demo_3' placeholder='Placeholder' />
        </div>
        <div className='input-group top-label'>
          <label htmlFor='tb_demo_4'>Top Label</label>
          <input id='tb_demo_4' />
        </div>
        <div>
          <button className='btn'>Button</button>
        </div>
        <div>
          <button className='btn btn-primary'>Button</button>
          <button className='btn btn-primary btn-solid'>Solid</button>
        </div>
        <div>
          <button className='btn btn-secondary'>Button</button>
          <button className='btn btn-secondary btn-solid'>Solid</button>
        </div>
      </div>
    </>
  );
};

export default Demo;
