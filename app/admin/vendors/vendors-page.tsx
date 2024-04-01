'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
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

const VendorsPage = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT ?? '';
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
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await axios.get(`${endpoint}/vendors`);
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='rounded-lg border-gray-500 p-8 text-center'>
      <div className='mx-auto w-full rounded-lg border-gray-500 bg-gray-500 p-8 text-center shadow-lg'>
        <h2 className='mb-8 text-3xl text-gray-300'>List of Vendors</h2>
        <div className='-mx-2 flex flex-wrap'>
          {isLoading ? (
            <div className='w-full p-2 text-gray-200'>Loading...</div>
          ) : vendors.length === 0 ? (
            <p className='w-full p-2 text-gray-200'>
              No active vendors currently
            </p>
          ) : (
            vendors.map((vendor: any) => (
              <div key={vendor.vendorId} className='w-1/4 p-2'>
                <div className='h-full rounded-lg border border-gray-700 bg-gray-600 p-4 shadow-md'>
                  <h3 className='m-3 font-semibold text-gray-300'>
                    {vendor.vendorName}
                  </h3>
                  <p className='m-3 font-thin text-gray-200'>
                    {vendor.activityName}
                  </p>
                  <Link href={`/admin/vendors/${vendor.vendorId}`}>
                    <button className='btn btn-secondary btn-solid mt-4'>
                      View
                    </button>
                  </Link>
                </div>
              </div>
            ))
          )}
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
    </div>
  );
};

export default VendorsPage;
