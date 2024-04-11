'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { Match } from '@/models/match';
import moment from 'moment';
import { SlArrowRight } from 'react-icons/sl';
import Link from 'next/link';
import axios, { AxiosResponse } from 'axios';

interface MatchItemProps {
  match: Match;
  sessionProfile: number;
}

const MatchItem: React.FC<MatchItemProps> = ({
  match,
  sessionProfile,
}: MatchItemProps) => {
  // Identify receiver profile id, since the sequence of profileId_1 and profileId_2 is not guaranteed
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT ?? '';

  const [messageSender, setMessageSender] = React.useState<String>('');
  const [latestMessage, setLatestMessage] = React.useState<String>('');
  const [messageTimestamp, setMessageTimestamp] = React.useState<String>('');

  useEffect(() => {
    axios
      .get<any>(
        `${endpoint}/message/latest/${match.profileId_1}/${match.profileId_2}`
      )
      .then((response: AxiosResponse) => {
        if (
          response?.data?.status === 200 &&
          response.data.payload.length > 0
        ) {
          setMessageSender(
            response.data.payload[0].senderProfileId === sessionProfile
              ? 'You: '
              : ''
          );
          setLatestMessage(response.data.payload[0].text);
          setMessageTimestamp(response.data.payload[0].sentDateTime);
        }
      });
  }, []);

  return (
    <Link
      className='match-list__item group'
      href={{
        pathname: '/matches/chatroom',
        query: { receiverProfileId: match.profile.profileId },
      }}
    >
      <div className='match-list__item__image'>
        <div className='match-list__item__image__container'>
          {!match.profile?.image1 ? (
            <Image
              src='https://via.placeholder.com/64x64/f472b6/fff?text=DP'
              sizes='100vw'
              alt='DP'
              fill={true}
              className='match-list__item__image'
            />
          ) : (
            <Image
              src={`data:image/jpeg;base64,${match.profile?.image1}`}
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
            {latestMessage && `${messageSender} ${latestMessage}`}
            {!latestMessage && (
              <i>It&apos;s a match! Be the first to say hi! 👋</i>
            )}
          </div>
          <div className='match-list__item__info__msg__timestamp'>
            {latestMessage
              ? moment(messageTimestamp.toString()).format('DD/MM hh:mmA')
              : ''}
          </div>
        </div>
      </div>
      <div className='match-list__item__control'>
        <div className='match-list__item__control__button'>
          <SlArrowRight size={50} />
        </div>
      </div>
    </Link>
  );
};

export default MatchItem;
