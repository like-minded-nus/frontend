'use client';

import { RiLogoutBoxLine } from 'react-icons/ri';

import { signOut } from 'next-auth/react';

const MenuLogoutItem = () => {
  const handleClick = () => {
    signOut();
  };

  return (
    <div className='menu-item width last-item' onClick={handleClick}>
      <div className='menu-item-highlight'></div>
      <div className='menu-item-icon'>
        <RiLogoutBoxLine size='20' />
      </div>
      <div className='menu-item-label'>Log Out</div>
    </div>
  );
};

export default MenuLogoutItem;
