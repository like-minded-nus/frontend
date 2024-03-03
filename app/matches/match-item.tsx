'use client';

import React from 'react';
import Image from 'next/image';
import { Match } from '@/models/match';
import moment from 'moment';
import { SlArrowRight } from 'react-icons/sl';

interface MatchItemProps {
  match: Match;
}

const MatchItem: React.FC<MatchItemProps> = ({ match }: MatchItemProps) => {
  return (
    <div className='match-list__item group'>
      <div className='match-list__item__image'>
        <div className='match-list__item__image__container'>
          {!match.profile?.image1 && (
            <Image
              src='https://via.placeholder.com/64x64/f472b6/fff?text=DP'
              sizes='100vw'
              alt='DP'
              fill={true}
              className='match-list__item__image'
            />
          )}
        </div>
      </div>
      <div className='match-list__item__info'>
        <div className='match-list__item__info__person'>
          <div className='match-list__item__info__person__name'>
            {match.profile.displayName}
          </div>
          <div className='match-list__item__info__person__age'>
            {moment().diff(match.profile.birthdate, 'years') || 18}
          </div>
        </div>
        <div className='match-list__item__info__msg'>
          <div className='match-list__item__info__msg__preview'>
            {
              'You: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed ultrices enim. Vestibulum ipsum ante, feugiat quis volutpat sed, facilisis vitae ante. Duis nec placerat odio, ac dignissim ipsum. Phasellus et pharetra massa. Duis tellus diam, consequat id tristique at, elementum rutrum turpis. Morbi porta sed augue et elementum. Mauris in tortor risus. Fusce massa sapien, porta nec congue eget, suscipit sed eros. Sed tincidunt purus est, in aliquam tellus varius non. Nulla tempus vulputate ipsum ac sodales. Suspendisse at sollicitudin urna.'
            }
          </div>
          <div className='match-list__item__info__msg__timestamp'>
            {'5:25pm'}
          </div>
        </div>
      </div>
      <div className='match-list__item__control'>
        <div className='match-list__item__control__button'>
          <SlArrowRight size={50} />
        </div>
      </div>
    </div>
  );
};

export default MatchItem;
