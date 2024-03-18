'use client';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Voucher {
  voucherId: string;
  voucherName: string;
}

interface VoucherListProps {
  vendorId: string | null;
}

const VoucherList: React.FC<VoucherListProps> = ({ vendorId }) => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT ?? '';

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    try {
      const response = await axios.get(
        `${endpoint}/vouchers/vendor/${vendorId}/vouchers`
      );
      setVouchers(response.data);
    } catch (error) {
      console.error('Error fetching vouchers:', error);
    }
  };

  return (
    <div className='mb-5 mt-5 w-full table-auto'>
      <h3 className='px-4 py-2 text-gray-200'>Vouchers</h3>
      {vouchers.map((voucher) => (
        <ul key={voucher.voucherId}>
          <Link href={`/admin/vendors/${vendorId}/${voucher.voucherId}`}>
            <button className='btn btn-secondary mb-2'>
              {voucher.voucherName}
            </button>
          </Link>
        </ul>
      ))}
    </div>
  );
};

export default VoucherList;
