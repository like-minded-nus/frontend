import MenuControl from '../components/menu-control';
import React from 'react';
import AdminMenu from './admin-menu';
import AdminBreadcrumb from './admin-breadcrumb';

interface BaseProp {
  content: React.ReactNode;
}

const AdminBase = (props: BaseProp) => {
  return (
    <>
      <div className='body-blur'></div>
      <AdminMenu />
      <MenuControl />
      <div className='main-container'>
        <AdminBreadcrumb />
        {props.content}
      </div>
    </>
  );
};

export default AdminBase;
