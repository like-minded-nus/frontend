import Menu from '../components/menu';
import MenuControl from '../components/menu-control';
import Breadcrumb from '../components/breadcrumb';
import React from 'react';

interface BaseProp {
  content: React.ReactNode;
}

const Base = (props: BaseProp) => {
  return (
    <>
      <div className='body-blur'></div>
      <Menu />
      <MenuControl />
      <div className='main-container'>
        <Breadcrumb />
        {props.content}
      </div>
    </>
  );
};

export default Base;
