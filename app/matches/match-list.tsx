'use client';

import React, { useEffect } from 'react';
import MatchItem from './match-item';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useSession } from 'next-auth/react';
import { Match } from '@/models/match';
import { Profile } from '@/models/profile';
import {
  getProfileByUserId,
  sessionProfileReset,
} from '@/redux/features/profileSlice';
import { getAllMatches, matchReset } from '@/redux/features/matchSlice';

const MatchList = () => {
  const { data: session } = useSession();

  const dispatch = useAppDispatch();
  const controller = new AbortController();

  // Redux store
  const sessionProfile: Profile = useAppSelector(
    (state) => state.profileReducer.sessionProfile
  );
  const matches: Match[] = useAppSelector(
    (state) => state.matchReducer.matches
  );

  // Step 1: Fetch the logged in user's profile
  // ** NOW FETCHED FROM HOME PAGE

  // Step 2: Fetch user's matches
  useEffect(() => {
    if (sessionProfile?.profileId) {
      dispatch(
        getAllMatches({
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

  useEffect(() => {
    console.log(matches);
  }, [matches]);

  return (
    <div className='match-list'>
      {matches.map((match: Match) => (
        <MatchItem key={match.matchId} match={match} />
      ))}
    </div>
  );
};

export default MatchList;
