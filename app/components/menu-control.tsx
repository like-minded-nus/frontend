'use client';

import { setMenuExpand } from '@/redux/features/menuSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { RxCross1 } from 'react-icons/rx';

const MenuControl = () => {
    const dispatch = useAppDispatch();

    // Redux store
    const menuExpanded: boolean = useAppSelector(
        (state) => state.menuReducer.menuExpanded
    );

    const handleClick = () => {
        dispatch(setMenuExpand(!menuExpanded));
    };

    return (
        <>
            <div
                className={`menu-control-btn ${
                    menuExpanded ? '' : 'minimized'
                }`}
                onClick={handleClick}
            >
                {menuExpanded && <RxCross1 size={20} className='icon-type' />}
                {!menuExpanded && (
                    <RxHamburgerMenu size={20} className='icon-type' />
                )}
            </div>
        </>
    );
};

export default MenuControl;
