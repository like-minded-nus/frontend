'use client';

import { RxCross1 } from 'react-icons/rx';
import { FaHeart } from 'react-icons/fa';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { ProfilePassionMatchList } from '@/models/profile-passion-match-list';
import {
  matchReset,
  getProfilePassionMatchList,
  createMatchRecord,
} from '@/redux/features/matchSlice';
import { Profile } from '@/models/profile';
import { getProfile, profileReset } from '@/redux/features/profileSlice';
import moment from 'moment';
import { useSession } from 'next-auth/react';

type ButtonType = 'like' | 'skip';

const MatchCard = () => {
  const { data: session } = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

  // Temp (until userSession can be retrieved)
  const profileId = 4;

  const dispatch = useAppDispatch();
  const controller = new AbortController();
  const [counter, setCounter] = useState<number>(0);

  // Redux store
  const profilePassionMatchList: ProfilePassionMatchList = useAppSelector(
    (state) => state.matchReducer.profilePassionMatchList
  );
  const profile: Profile = useAppSelector(
    (state) => state.profileReducer.profile
  );

  useEffect(() => {
    dispatch(getProfilePassionMatchList({ controller, profileId: profileId }));

    return () => {
      controller.abort();
      dispatch(matchReset());
    };
  }, []);

  useEffect(() => {
    if (
      profilePassionMatchList?.matchList?.length > 0 &&
      profilePassionMatchList?.matchList?.length > counter
    ) {
      dispatch(
        getProfile({
          controller,
          profileId: profilePassionMatchList.matchList[counter].profileId,
        })
      );

      return () => {
        controller.abort();
        dispatch(profileReset());
      };
    }
  }, [profilePassionMatchList, counter]);

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  const [clickedSkip, setClickedSkip] = useState<boolean>(false);
  const [clickedLike, setClickedLike] = useState<boolean>(false);

  const handleClickAnimation = (type: ButtonType) => {
    if (type === 'like') {
      setClickedLike(true);
      setTimeout(() => {
        setClickedLike(false);
        setCounter((counter) => counter + 1);
      }, 1000);
    } else if (type === 'skip') {
      setClickedSkip(true);
      setTimeout(() => {
        setClickedSkip(false);
        setCounter((counter) => counter + 1);
      }, 1000);
    }
  };

  const handleClickSkip = () => {
    dispatch(
      createMatchRecord({
        controller,
        matchRequestBody: {
          userProfileId: profileId,
          targetProfileId: profile.profileId,
          like: false,
        },
      })
    );

    handleClickAnimation('skip');
  };

  const handleClickLike = () => {
    dispatch(
      createMatchRecord({
        controller,
        matchRequestBody: {
          userProfileId: profileId,
          targetProfileId: profile.profileId,
          like: true,
        },
      })
    );

    handleClickAnimation('like');
  };

  return (
    <>
      <div className='browse'>
        {/* [start] Match Card Loading Component */}
        <div className='match-card__loading'>
          <div className='match-card__container'>
            <Image
              src='https://via.placeholder.com/1920x1920/f472b6/fff?text=%20'
              sizes='100vw'
              alt='Match'
              fill={true}
              className='match-card__container__image'
            />
            <div className='match-card__container__backdrop'></div>
            <div className='match-card__container__info'>
              <div className='match-card__container__info__particulars'>
                <div className='match-card__container__info__particulars__name'></div>
                <div className='match-card__container__info__particulars__age'></div>
              </div>
              <div className='match-card__container__info__intro'></div>
            </div>
            <div className='match-card__container__controls'>
              <div className={`match-card__container__controls__button skip`}>
                <RxCross1
                  size={22}
                  className='match-card__container__controls__button__icon'
                />
              </div>
              <div className={`match-card__container__controls__button like`}>
                <FaHeart
                  size={24}
                  className='match-card__container__controls__button__icon'
                />
              </div>
            </div>
          </div>
        </div>
        {/* [end] Match Card Loading Component */}

        {profile?.profileId && (
          <div
            className={`match-card ${
              clickedSkip ? 'animate-tilt__left' : ''
            } ${clickedLike ? 'animate-tilt__right' : ''}`}
          >
            <div className='match-card__container'>
              {!profile?.image1 && (
                <Image
                  src='https://via.placeholder.com/1920x1920/f472b6/fff?text=Profile+Image'
                  sizes='100vw'
                  alt='Match'
                  fill={true}
                  className='match-card__container__image'
                />
              )}
              <div className='match-card__container__backdrop'></div>
              <div className='match-card__container__info'>
                <div className='match-card__container__info__particulars'>
                  <div className='match-card__container__info__particulars__name'>
                    {profile?.displayName || 'John Doe'}
                  </div>
                  <div className='match-card__container__info__particulars__age'>
                    {(profile?.birthdate &&
                      moment().diff(profile.birthdate, 'years')) ||
                      25}
                  </div>
                </div>
                <div className='match-card__container__info__intro'>
                  {profile?.bio ||
                    'I love to travel! I am a foodie! I love outdoor adventures!'}
                </div>
              </div>
              <div className='match-card__container__controls'>
                <div
                  className={`match-card__container__controls__button skip ${clickedSkip ? 'animate-ping' : ''}`}
                  onClick={handleClickSkip}
                >
                  <RxCross1
                    size={22}
                    className='match-card__container__controls__button__icon'
                  />
                </div>
                <div
                  className={`match-card__container__controls__button like ${clickedLike ? 'animate-ping' : ''}`}
                  onClick={handleClickLike}
                >
                  <FaHeart
                    size={24}
                    className='match-card__container__controls__button__icon'
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MatchCard;
