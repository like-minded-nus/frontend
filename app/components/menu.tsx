import { GoHome } from 'react-icons/go';
import { FaRegHeart } from 'react-icons/fa';
import { TbColumns3 } from 'react-icons/tb';
import { FaRegUser } from 'react-icons/fa6';
import { FaCrown } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaCog } from 'react-icons/fa';
import { RiLogoutBoxLine } from 'react-icons/ri';

import MenuItem from './menu-item';

const Menu = () => {
    return (
        <>
            <div className='flex align-middle'>
                <div className='menu maximized'>
                    <MenuItem
                        iconType={GoHome}
                        iconSize={20}
                        id={0}
                        label={'Home'}
                        count={0}
                        first={true}
                    />
                    <MenuItem
                        iconType={FaRegHeart}
                        iconSize={20}
                        id={1}
                        label={'Browse & Like'}
                        count={0}
                        first={false}
                    />
                    <MenuItem
                        iconType={TbColumns3}
                        iconSize={20}
                        id={2}
                        label={'Matches'}
                        count={6969}
                        first={false}
                    />
                    <MenuItem
                        iconType={FaRegUser}
                        iconSize={20}
                        id={3}
                        label={'My Profile'}
                        count={0}
                        first={false}
                    />
                    <MenuItem
                        iconType={FaCrown}
                        iconSize={20}
                        id={4}
                        label={'Premium'}
                        count={0}
                        first={false}
                    />

                    <hr className='menu-break width' />

                    <MenuItem
                        iconType={RxHamburgerMenu}
                        iconSize={20}
                        id={5}
                        label={'FAQ'}
                        count={7}
                        first={false}
                    />
                    <MenuItem
                        iconType={FaCog}
                        iconSize={20}
                        id={6}
                        label={'Settings'}
                        count={5}
                        first={false}
                    />

                    <MenuItem
                        iconType={RiLogoutBoxLine}
                        iconSize={20}
                        id={7}
                        label={'Log Out'}
                        count={0}
                        first={false}
                        last={true}
                    />
                </div>
            </div>
        </>
    );
};

export default Menu;
