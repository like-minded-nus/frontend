'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminMenu from '@/app/components/admin-menu';
import Link from 'next/link';
import VoucherList from '@/app/components/voucher-list';

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
    <div className='mx-auto mt-24 w-full max-w-3xl rounded-lg border-gray-500 bg-gray-500 p-8 text-center shadow-lg'>
      <h1 className='mb-8 text-3xl text-gray-200'>{vendorData.vendorName}</h1>
      <div className='vendor-info'>
        <div className='info-item'>
          <label htmlFor='activity' className='mb-2 mr-4 text-gray-200'>
            Activity:
          </label>
          <span>{vendorData.activityName}</span>
        </div>
        <div className='info-item'>
          <label htmlFor='address' className='mb-2 mr-4 text-gray-200'>
            Address:
          </label>
          <span>{vendorData.address}</span>
        </div>
        <div className='info-item'>
          <label htmlFor='phoneNumber' className='mb-2 mr-4 text-gray-200'>
            Phone Number:
          </label>
          <span>{vendorData.phoneNumber}</span>
        </div>
        <div className='info-item'>
          <label htmlFor='website' className='mb-2 mr-4 text-gray-200'>
            Website:
          </label>
          <span>{vendorData.website}</span>
        </div>
        <VoucherList vendorId={id} />
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
