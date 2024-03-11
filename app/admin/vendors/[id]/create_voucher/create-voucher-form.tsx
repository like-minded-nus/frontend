'use client';
import { useState } from 'react';
import axios from 'axios';
import VoucherDatepicker from '@/app/components/voucher-datepicker';

const CreateVoucherForm = () => {
  const [voucherName, setVoucherName] = useState('');
  const [voucherEndDate, setVoucherEndDate] = useState('');
  const [voucherDescription, setVoucherDescription] = useState('');
  const [redeemStatus, setRedeemStatus] = useState(0);
  const [vendorId, setVendorId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (voucherName.trim() === '') {
      alert('Voucher name cannot be empty.');
      return;
    }
    if (voucherName.length > 50) {
      alert('Voucher name cannot exceed 50 characters.');
      return;
    }
    if (voucherEndDate.trim() === '') {
      alert('Voucher end date cannot be empty.');
      return;
    }
    if (voucherDescription.trim() === '') {
      alert('Voucher description cannot be empty.');
      return;
    }
    const selectedEndDate = new Date(voucherEndDate);
    const today = new Date();
    if (selectedEndDate < today) {
      alert('Selected date cannot be earlier than today.');
      return;
    }

    try {
      const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT ?? '';
      if (!endpoint) {
        throw new Error('API endpoint is not defined.');
      }
      const response = await axios.post(`${endpoint}/vouchers/create_voucher`, {
        voucherName,
        voucherEndDate,
        voucherDescription,
        redeemStatus,
        vendorId,
      });
      console.log('Voucher creation successful:', response.data);
    } catch (error) {
      console.error('Error creating voucher:', error);
    }

    setVoucherName('');
    setVoucherEndDate('');
    setVoucherDescription('');
    setVendorId('');
  };

  const handleChange = (selectedDate: Date) => {
    console.log('Selected Date:', selectedDate);
    setVoucherEndDate(selectedDate.toISOString());
  };

  const getVendorIdFromUrl = () => {
    if (typeof window === 'undefined') {
      return '';
    }
    const url = window.location.href;
    const urlParts = url.split('/');
    const idIndex = urlParts.indexOf('vendors') + 1;
    return urlParts[idIndex];
  };

  useState(() => {
    const id = getVendorIdFromUrl();
    if (id) {
      setVendorId(id);
    } else {
      return '';
    }
  });

  return (
    <div className='flex items-center justify-center'>
      <div className='mx-auto mt-24 w-full max-w-3xl rounded-lg border-gray-500 bg-gray-500 p-8 text-center'>
        <div className='flex items-center justify-center'>
          <div className='w-1/2 pr-8'>
            <h1 className='mb-8 text-3xl text-gray-200'>Register Vendor</h1>
          </div>
          <div className='mt-5 h-80 border-r-2 border-gray-400'></div>

          <div className='w-1/2 pl-8'>
            <form onSubmit={handleSubmit}>
              <div className='mb-4 flex flex-col'>
                <label
                  htmlFor='voucherName'
                  className='mb-2 block text-gray-200'
                >
                  Voucher Name:
                </label>
                <input
                  type='text'
                  id='voucherName'
                  value={voucherName}
                  onChange={(e) => setVoucherName(e.target.value)}
                  className='w-full rounded-md border bg-gray-700 px-4 py-2 text-gray-200'
                  required
                />
              </div>
              <div className='mb-4 flex flex-col'>
                <label
                  htmlFor='voucherEndDate'
                  className='mb-2 block text-gray-200'
                >
                  Expiry Date:
                </label>
                <VoucherDatepicker onChange={handleChange} />
              </div>
              <div className='mb-4 flex flex-col'>
                <label
                  htmlFor='voucherDescription'
                  className='mb-2 block text-gray-200'
                >
                  Description:
                </label>
                <input
                  type='text'
                  id='voucherDescription'
                  value={voucherDescription}
                  onChange={(e) => setVoucherDescription(e.target.value)}
                  className='w-full rounded-md border bg-gray-700 px-4 py-2 text-gray-200'
                  required
                />
              </div>
              <button
                type='submit'
                className='btn btn-secondary btn-solid mt-4 w-full py-2'
              >
                Create Voucher
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateVoucherForm;
