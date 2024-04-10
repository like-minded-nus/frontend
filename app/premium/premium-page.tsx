'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import GetPremiumSuccess from './premium-success';
import PremiumAlreadyPage from './premium-already';
import { useDispatch } from 'react-redux';
import { setIsPremium } from '@/redux/features/userSlice';

const PremiumPage = () => {
  const { data: session } = useSession();
  const [userId, setUserId] = useState<string>('');
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT ?? '';

  const [isPremiumAlready, setIsPremiumAlready] = useState<number>(0);
  const [getPremiumSuccess, setGetPremiumSuccess] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (session) {
      setUserId(session?.user.id);
      setIsPremiumAlready(session?.user.isPremium);
    }
  }, [session]);

  const handleGetPremium = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${endpoint}/user/upgradetopremium`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: userId }),
    });

    const resJson = await res.json();

    if (resJson.status != 200) {
      console.error(resJson.status + ' ' + resJson.message);
    } else {
      setGetPremiumSuccess(true);
    }
  };

  return (
    <>
      {isPremiumAlready === 1 ? (
        <PremiumAlreadyPage />
      ) : (
        <>
          {getPremiumSuccess ? null : (
            <div className='premium-main-div'>
              <div className='premium-card'>
                <h5 className='premium-card-title'>Become a Premium Member!</h5>
                <p className='premium-card-subtitle'>
                  Join us as a premium member and enjoy better experience.
                </p>
                <button
                  onClick={handleGetPremium}
                  className='premium-card-button'
                >
                  Get Premium
                  <svg
                    className='ms-2 h-3.5 w-3.5 rtl:rotate-180'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 14 10'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M1 5h12m0 0L9 1m4 4L9 9'
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {getPremiumSuccess ? <GetPremiumSuccess /> : null}
        </>
      )}
    </>
  );
};

export default PremiumPage;
