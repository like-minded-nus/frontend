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

const AdminMenu = () => {
  // Redux store
  const menuExpanded: boolean = useAppSelector(
    (state) => state.menuReducer.menuExpanded
  );

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
            link={'/admin'}
            first={true}
          />

          <MenuItem
            iconType={TbColumns3}
            iconSize={20}
            id={1}
            label={'Vendors'}
            count={0}
            link={'/admin/vendors'}
            first={false}
          />

          <MenuItem
            iconType={FaRegUser}
            iconSize={20}
            id={2}
            label={'User Management'}
            count={0}
            link={'/admin'}
            first={false}
          />

          <hr className='menu-break width' />

          <MenuItem
            iconType={RxHamburgerMenu}
            iconSize={20}
            id={3}
            label={'Customer Support'}
            count={0}
            link={'/admin'}
            first={false}
          />
          <MenuItem
            iconType={FaCog}
            iconSize={20}
            id={4}
            label={'Settings'}
            count={0}
            link={'/admin'}
            first={false}
          />

          <MenuLogoutItem />
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
