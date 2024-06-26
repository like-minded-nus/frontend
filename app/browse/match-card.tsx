'use client';

import { RxCross1 } from 'react-icons/rx';
import { FaHeart } from 'react-icons/fa';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { ProfilePassionMatchList } from '@/models/profile-passion-match-list';
import {
  matchReset,
  profilePassionMatchListReset,
  getProfilePassionMatchList,
  createMatchRecord,
  getAllMatches,
} from '@/redux/features/matchSlice';
import { Profile } from '@/models/profile';
import {
  getProfile,
  getProfileByUserId,
  profileReset,
  sessionProfileReset,
} from '@/redux/features/profileSlice';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { Match } from '@/models/match';
import { toast, Toaster } from 'sonner';

type ButtonType = 'like' | 'skip';

const MatchCard = () => {
  const { data: session } = useSession();

  const dispatch = useAppDispatch();
  const controller = new AbortController();
  const [counter, setCounter] = useState<number>(0);
  const [isEmptyMatchList, setIsEmptyMatchList] = useState<boolean>(false);

  // Redux store
  const profilePassionMatchList: ProfilePassionMatchList = useAppSelector(
    (state) => state.matchReducer.profilePassionMatchList
  );
  const sessionProfile: Profile = useAppSelector(
    (state) => state.profileReducer.sessionProfile
  );
  const profile: Profile = useAppSelector(
    (state) => state.profileReducer.profile
  );
  const match: Match = useAppSelector((state) => state.matchReducer.match);

  const isEmpty = (obj: any) => {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }

    return true;
  };

  // Step 1: Fetch the logged in user's profile
  // ** NOW FETCHED FROM HOME PAGE

  // Step 2: Fetch the potential match list
  useEffect(() => {
    console.log('hohoho');
    if (sessionProfile?.profileId) {
      console.log('has session profile in redux store');
      dispatch(
        getProfilePassionMatchList({
          controller,
          profileId: sessionProfile.profileId,
        })
      );
    }

    return () => {
      controller.abort();
      // dispatch(matchReset());
    };
  }, [sessionProfile]);

  // Step 3: Fetch the first match's profile
  useEffect(() => {
    console.log(profile);
    console.log(profilePassionMatchList);
    if (
      profilePassionMatchList?.matchList?.length > 0 &&
      profilePassionMatchList?.matchList?.length > counter
    ) {
      setIsEmptyMatchList(false);

      dispatch(
        getProfile({
          controller,
          profileId: profilePassionMatchList.matchList[counter].profileId,
        })
      );

      return () => {
        controller.abort();
        // dispatch(profileReset());
      };
    } else if (
      profilePassionMatchList?.matchList?.length > 0 &&
      profilePassionMatchList?.matchList?.length === counter
    ) {
      setIsEmptyMatchList(true);
      dispatch(profileReset());
      dispatch(profilePassionMatchListReset());
    } else {
      setIsEmptyMatchList(true);
      dispatch(profileReset());
    }
  }, [profilePassionMatchList, counter]);

  // Step 4: Check if match's profile is fetched
  useEffect(() => {
    console.log(profile);
  }, [profile]);

  // Step 5: Check if it's mutual like
  useEffect(() => {
    if (!isEmpty(match)) {
      if (match.like_1 && match.like_2) {
        toast.success('You got a match! 🎉', {
          duration: 2000,
        });
        dispatch(
          getAllMatches({
            controller,
            profileId: sessionProfile.profileId,
          })
        );
        dispatch(matchReset());
      }
    }
  }, [match]);

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
          userProfileId: sessionProfile.profileId,
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
          userProfileId: sessionProfile.profileId,
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
        {isEmptyMatchList && (
          <div className='match-card__empty'>
            <h1>YOU&apos;RE TOO AWESOME 😎</h1>
            <span>
              So please give us time to find you your perfect partner.
            </span>
          </div>
        )}

        {/* [start] Match Card Loading Component */}
        {!isEmptyMatchList && (
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
        )}

        {/* [end] Match Card Loading Component */}

        {profile?.profileId && (
          <div
            className={`match-card ${
              clickedSkip ? 'animate-tilt__left' : ''
            } ${clickedLike ? 'animate-tilt__right' : ''}`}
          >
            <div className='match-card__container'>
              <Image
                // src={profile?.image1 ? URL.createObjectURL(profile?.image1) : 'https://via.placeholder.com/1920x1920/f472b6/fff?text=Profile+Image'}
                src={
                  profile?.image1
                    ? `data:jpeg;base64, ${profile.image1}`
                    : 'https://via.placeholder.com/1920x1920/f472b6/fff?text=Profile+Image'
                }
                sizes='100vw'
                alt='Match'
                fill={true}
                className='match-card__container__image'
              />

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

      <Toaster />
    </>
  );
};

export default MatchCard;
