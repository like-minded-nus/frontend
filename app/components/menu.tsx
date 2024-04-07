'use client';

import { GoHome } from 'react-icons/go';
import { FaRegHeart } from 'react-icons/fa';
import { TbColumns3 } from 'react-icons/tb';
import { FaRegUser } from 'react-icons/fa6';
import { FaCrown } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaCog } from 'react-icons/fa';

import MenuItem from './menu-item';
import { useAppSelector } from '@/redux/hooks';
import MenuLogoutItem from './menu-logout-item';
import { Profile } from '@/models/profile';
import { useEffect, useState } from 'react';

const Menu = () => {
  // Redux store
  const menuExpanded: boolean = useAppSelector(
    (state) => state.menuReducer.menuExpanded
  );

  // get profile
  const sessionProfile: Profile = useAppSelector(
    (state) => state.profileReducer.sessionProfile
  );

  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    if (sessionProfile?.profileId) {
      setHasProfile(true);
    }
  }, [sessionProfile]);

  return (
    <>
      <div className='flex align-middle'>
        <div className={`menu ${menuExpanded ? 'maximized' : 'minimized'}`}>
          <MenuItem
            iconType={GoHome}
            iconSize={20}
            id={0}
            label={'Home'}
            count={0}
            link={'/'}
            first={true}
          />
          <MenuItem
            iconType={FaRegHeart}
            iconSize={20}
            id={1}
            label={'Browse & Like'}
            count={0}
            link={'/browse'}
            first={false}
          />
          <MenuItem
            iconType={TbColumns3}
            iconSize={20}
            id={2}
            label={'Matches'}
            count={6969}
            link={'/matches'}
            first={false}
          />
          <MenuItem
            iconType={FaRegUser}
            iconSize={20}
            id={3}
            label={hasProfile ? 'Update Profile' : 'Create Profile'}
            count={0}
            link={'/profile'}
            first={false}
          />

          <MenuItem
            iconType={FaCrown}
            iconSize={20}
            id={4}
            label={'Premium'}
            count={0}
            link={'/premium'}
            first={false}
          />

          <hr className='menu-break width' />

          <MenuItem
            iconType={RxHamburgerMenu}
            iconSize={20}
            id={5}
            label={'FAQ'}
            count={7}
            link={'/'}
            first={false}
          />
          <MenuItem
            iconType={FaCog}
            iconSize={20}
            id={6}
            label={'Settings'}
            count={5}
            link={'/'}
            first={false}
          />

          <MenuLogoutItem />
        </div>
      </div>
    </>
  );
};

export default Menu;
