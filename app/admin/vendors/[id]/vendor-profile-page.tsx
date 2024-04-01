'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminMenu from '@/app/components/admin-menu';
import Link from 'next/link';
import VoucherList from '@/app/components/voucher-list';
import VoucherModal from '@/app/components/voucher-modal';
import { FaEdit, FaArrowLeft } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<any>(null);
  const { data: session } = useSession();

  useEffect(() => {
    console.log(session);
    if (!session) {
      redirect('/login');
    }
    if (session?.user.userRole !== 1) {
      redirect('/home');
    }
  }, [session]);

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

  const handleOpenModal = (voucher: any) => {
    setSelectedVoucher(voucher);
    setIsModalOpen(true);
  };

  if (!vendorData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='relative mx-auto mt-10 w-full max-w-3xl rounded-lg border-gray-500 bg-gray-500 p-8 text-center shadow-lg'>
      <Link href={`/admin/vendors/${id}/edit_vendor`}>
        <button className='btn-square btn-secondary absolute right-0 top-2 mr-2 mt-2'>
          <FaEdit />
        </button>
      </Link>
      {/* <Link href={`/admin/vendors`}>
        <button className='btn-square btn-secondary absolute left-0 top-2 ml-2.5 mt-2'>
          <FaArrowLeft />
        </button>
      </Link> */}
      <h1 className='mb-8 text-3xl text-gray-300'>{vendorData.vendorName}</h1>
      <div className='vendor-info'>
        <div className='info-item'>
          <label htmlFor='activity' className='mb-2 mr-4 text-gray-300'>
            Activity:
          </label>
          <span className='font-thin text-gray-200'>
            {vendorData.activityName}
          </span>
        </div>
        <div className='info-item'>
          <label htmlFor='address' className='mb-2 mr-4 text-gray-300'>
            Address:
          </label>
          <span className='font-thin text-gray-200'>{vendorData.address}</span>
        </div>
        <div className='info-item'>
          <label htmlFor='phoneNumber' className='mb-2 mr-4 text-gray-300'>
            Phone Number:
          </label>
          <span className='font-thin text-gray-200'>
            {vendorData.phoneNumber}
          </span>
        </div>
        <div className='info-item'>
          <label htmlFor='website' className='mb-2 mr-4 text-gray-300'>
            Website:
          </label>
          <span className='font-thin text-gray-200'>{vendorData.website}</span>
        </div>
        <VoucherList vendorId={id} handleOpenModal={handleOpenModal} />
        <Link href={`/admin/vendors/${id}/create_voucher`}>
          <button
            type='submit'
            className='btn btn-secondary btn-solid mt-4 w-full py-2'
          >
            Add Voucher
          </button>
        </Link>
        <VoucherModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedVoucher={selectedVoucher}
        />
      </div>
    </div>
  );
};

export default VendorProfilePage;
