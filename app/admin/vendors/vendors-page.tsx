'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminMenu from '@/app/components/admin-menu';
import Link from 'next/link';

interface Vendor {
  vendorId: number;
  vendorName: string;
  activityName: string;
  address: string;
  phoneNumber: number;
  website: string;
}

const VendorsPage = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT ?? '';

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await axios.get(`${endpoint}/vendors`);
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  return (
    <div className='rounded-lg border-gray-500 p-8 text-center'>
      {/* <AdminMenu /> */}
      <div className='mt-4'>
        <h2 className='mb-8 text-xl font-semibold'>List of Vendors</h2>
        <table className='w-full table-auto'>
          <thead>
            <tr>
              <th className='px-4 py-2'>Vendor Name</th>
              <th className='px-4 py-2'>Activity</th>
              <th className='px-4 py-2'>Address</th>
              <th className='px-4 py-2'>Phone Number</th>
              <th className='px-4 py-2'>Website</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor.vendorId}>
                <td className='border px-4 py-2'>{vendor.vendorName}</td>
                <td className='border px-4 py-2'>{vendor.activityName}</td>
                <td className='border px-4 py-2'>{vendor.address}</td>
                <td className='border px-4 py-2'>{vendor.phoneNumber}</td>
                <td className='border px-4 py-2'>{vendor.website}</td>
                <Link href={`/admin/vendors/${vendor.vendorId}`}>
                  <button className='btn btn-secondary btn-solid'>View</button>
                </Link>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link href='/admin/vendors/register_vendor'>
        <button
          type='submit'
          className='btn btn-secondary btn-solid mt-4 w-full py-2'
        >
          Add Vendor
        </button>
      </Link>
    </div>
  );
};

export default VendorsPage;
