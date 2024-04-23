'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { GoHome } from 'react-icons/go';

const AdminBreadcrumb = () => {
  const paths = usePathname();
  const pathNames = paths.split('/').filter((path) => path);
  const separator = <span> / </span>;

  return (
    <>
      <ul className='breadcrumb'>
        <li className='breadcrumb__list'>
          <Link href={'/admin'}>
            <GoHome size={18} />
          </Link>
        </li>
        {pathNames.length > 0 && separator}
        {pathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join('/')}`;
          return (
            <React.Fragment key={index}>
              <li
                className={
                  paths === href
                    ? 'breadcrumb__list breadcrumb__active'
                    : 'breadcrumb__list'
                }
              >
                <Link href={href} className='capitalize'>
                  {link.replaceAll('_', ' ').replaceAll('-', ' ')}
                </Link>
              </li>
              {pathNames.length !== index + 1 && separator}
            </React.Fragment>
          );
        })}
      </ul>
    </>
  );
};

export default AdminBreadcrumb;
