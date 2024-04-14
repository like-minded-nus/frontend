'use client';

import { IconType } from 'react-icons';
import { setActiveItem } from '@/redux/features/menuSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface MenuItemProps {
  iconType: IconType;
  iconSize: number;
  id: number;
  label: string;
  count: number;
  link?: string;
  first: boolean;
  last?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  iconType: Icon,
  iconSize,
  id,
  label,
  count,
  link,
  first,
  last,
}: MenuItemProps) => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  // Redux store
  const activeItem: number = useAppSelector(
    (state) => state.menuReducer.activeItem
  );

  const handleClick = () => {
    dispatch(setActiveItem(id));
    if (link) push(link);
  };

  useEffect(() => {
    switch (window.location.pathname) {
      case '/':
      case '/home':
      case '/admin':
        dispatch(setActiveItem(0));
        break;
      case '/browse':
      case '/admin/user_management':
      case '/admin/user_management/reports':
        dispatch(setActiveItem(1));
        break;
      case '/matches':
      case '/chatroom':
      case '/matches/chatroom':
      case '/admin/vendors':
        dispatch(setActiveItem(2));
        break;
      case '/profile':
        dispatch(setActiveItem(3));
        break;
      case '/premium':
        dispatch(setActiveItem(4));
        break;
      default:
        dispatch(setActiveItem(0));
        break;
    }
  });

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
        <div className='menu-item-count'>{count > 99 ? '99+' : count}</div>
      )}
    </div>
  );
};

export default MenuItem;
