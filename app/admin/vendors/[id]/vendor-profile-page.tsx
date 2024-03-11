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

const VendorProfilePage = () => {
  const [vendorData, setVendorData] = useState<Vendor | null>(null);
  const [id, setId] = useState<string | null>(null);
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT ?? '';

  useEffect(() => {
    const vendorId = getVendorIdFromUrl();
    if (vendorId) {
      setId(vendorId);
      fetchVendorData(vendorId);
    }
  }, []);

  const getVendorIdFromUrl = () => {
    const url = window.location.href;
    const urlParts = url.split('/');
    const idIndex = urlParts.indexOf('vendors') + 1;
    return urlParts[idIndex];
  };

  const fetchVendorData = async (id: any) => {
    try {
      const response = await axios.get(`${endpoint}/vendors/${id}`);
      setVendorData(response.data);
    } catch (error) {
      console.error('Error fetching vendor data:', error);
    }
  };

  if (!vendorData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='mx-auto mt-24 w-full max-w-3xl rounded-lg border-gray-500 p-8 text-center'>
      <h1 className='mb-8 text-3xl text-gray-700'>{vendorData.vendorName}</h1>
      <div className='vendor-info'>
        <div className='info-item'>
          <label htmlFor='activity' className='mb-2 mr-4 text-gray-700'>
            Activity:
          </label>
          <span>{vendorData.activityName}</span>
        </div>
        <div className='info-item'>
          <label htmlFor='address' className='mb-2 mr-4 text-gray-700'>
            Address:
          </label>
          <span>{vendorData.address}</span>
        </div>
        <div className='info-item'>
          <label htmlFor='phoneNumber' className='mb-2 mr-4 text-gray-700'>
            Phone Number:
          </label>
          <span>{vendorData.phoneNumber}</span>
        </div>
        <div className='info-item'>
          <label htmlFor='website' className='mb-2 mr-4 text-gray-700'>
            Website:
          </label>
          <span>{vendorData.website}</span>
        </div>
        <table className='justify-center'>
          <tr>
            <th>Vouchers</th>
          </tr>
          <tr>
            <td>voucher 1</td>
          </tr>
          <tr>
            <td>voucher 2</td>
          </tr>
          <tr>
            <td>voucher 3</td>
          </tr>
        </table>
        <Link href={`/admin/vendors/${id}/create_voucher`}>
          <button
            type='submit'
            className='btn btn-secondary btn-solid mt-4 w-full py-2'
          >
            Add Voucher
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VendorProfilePage;
