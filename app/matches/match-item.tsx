'use client';

import React from 'react';
import { Match } from '@/models/match';
import moment from 'moment';

interface MatchItemProps {
  match: Match;
}

const MatchItem: React.FC<MatchItemProps> = ({ match }: MatchItemProps) => {
  return (
    <div>
      <div>{match.profile.displayName}</div>
      <div>{moment().diff(match.profile.birthdate, 'years') || 25}</div>
    </div>
  );
};

export default MatchItem;
