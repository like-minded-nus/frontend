'use client';

import { IconType } from 'react-icons';
import { setActiveItem } from '@/redux/features/menuSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

interface MenuItemProps {
    iconType: IconType;
    iconSize: number;
    id: number;
    label: string;
    count: number;
    first: boolean;
    last?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
    iconType: Icon,
    iconSize,
    id,
    label,
    count,
    first,
    last,
}: MenuItemProps) => {
    const dispatch = useAppDispatch();

    // Redux store
    const activeItem: number = useAppSelector(
        (state) => state.menuReducer.activeItem
    );

    const handleClick = () => {
        dispatch(setActiveItem(id));
    };

    return (
        <div
            className={`menu-item width ${last ? 'last-item' : ''} ${
                first ? 'mt-2' : ''
            } ${activeItem === id ? 'active' : ''}`}
            onClick={handleClick}
        >
            <div className='menu-item-highlight'></div>
            <div className='menu-item-icon'>
                <Icon size={iconSize} />
            </div>
            <div className='menu-item-label'>{label}</div>
            {count > 0 && (
                <div className='menu-item-count'>
                    {count > 99 ? '99+' : count}
                </div>
            )}
        </div>
    );
};

export default MenuItem;
