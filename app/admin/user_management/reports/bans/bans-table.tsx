'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react';
import { Ban } from '@/models/ban';
import { getBannedUsers } from '@/redux/features/banSlice';

const BanTable = () => {
  const dispatch = useAppDispatch();
  const controller = new AbortController();

  // Redux store
  const bans: Ban[] = useAppSelector((state) => state.banReducer.bans);

  useEffect(() => {
    dispatch(getBannedUsers({ controller }));

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    console.log(bans);
  }, [bans]);

  return (
    <>
      <div className='mt-4'>
        <table className='admin-table'>
          <thead>
            <tr>
              <th scope='col'>Ban ID</th>
              <th scope='col'>User ID</th>
              <th scope='col'>Username</th>
              <th scope='col'>Reason</th>
            </tr>
          </thead>
          <tbody>
            {bans.map((ban: Ban) => (
              <tr key={ban.banId}>
                <th scope='row'>{ban.banId}</th>
                <td>{ban.userId}</td>
                <td>{ban.username}</td>
                <td>{ban.bannedReason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BanTable;
