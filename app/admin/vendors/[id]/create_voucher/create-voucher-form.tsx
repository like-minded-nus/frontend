'use client';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import VoucherDatepicker from '@/app/components/voucher-datepicker';
import { useRouter } from 'next/navigation';

const CreateVoucherForm = () => {
  const router = useRouter();
  const [voucherName, setVoucherName] = useState('');
  const [voucherEndDate, setVoucherEndDate] = useState('');
  const [voucherDescription, setVoucherDescription] = useState('');
  const [voucherType, setVoucherType] = useState<number>(1);
  const [redeemStatus, setRedeemStatus] = useState(0);
  const [vendorId, setVendorId] = useState('');
  const [voucherNameError, setVoucherNameError] = useState('');
  const [voucherDescriptionError, setVoucherDescriptionError] = useState('');
  const [voucherAmount, setVoucherAmount] = useState<number>(1);

  interface VoucherTypes {
    voucherType: number;
    voucherDesc: string;
  }

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
        voucherType,
        voucherAmount,
        redeemStatus,
        vendorId,
      });
      console.log('Voucher creation successful:', response.data);
      alert('Voucher created successfully!');
      router.push(`/admin/vendors/${vendorId}`);
    } catch (error) {
      console.error('Error creating voucher:', error);
      alert('Failed to create voucher. Please try again.');
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

  const handleDropdownChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setVoucherType(Number(e.target.value));
    console.log('dropdown change to: ' + e.target.value);
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
      <div className='mx-auto mt-24 w-full max-w-3xl rounded-lg border-gray-500 bg-gray-500 p-8 '>
        <div className='flex items-center justify-center'>
          <div className='w-1/2 pr-8'>
            <h1 className='mb-8 text-center text-3xl text-gray-200'>
              Create A New Voucher
            </h1>
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
                  onBlur={() => {
                    if (voucherName.trim() === '') {
                      setVoucherNameError('Voucher name cannot be empty.');
                    } else if (voucherName.length > 50) {
                      setVoucherNameError(
                        'Voucher name cannot exceed 50 characters.'
                      );
                    } else {
                      setVoucherNameError('');
                    }
                  }}
                  className={`w-full rounded-md border bg-gray-700 ${
                    voucherNameError ? 'border-red-500' : 'border-gray-200'
                  } px-4 py-2 text-gray-200`}
                  required
                />
                {voucherNameError && (
                  <div className='mt-1 text-xs text-red-500'>
                    {voucherNameError}
                  </div>
                )}
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
                  htmlFor='voucherType'
                  className='mb-2 block text-gray-200'
                >
                  Voucher Type:
                </label>
                <select
                  value={voucherType}
                  onChange={handleDropdownChange}
                  name='voucherType'
                  className={`w-full rounded-md border bg-gray-700 px-4 py-2 text-gray-200`}
                >
                  <option value='1' key={1}>
                    Free Trials
                  </option>
                  <option value='2' key={2}>
                    Percentage Discount
                  </option>
                </select>
              </div>

              <div className='mb-4 flex flex-col'>
                <label
                  htmlFor='voucherAmount'
                  className='mb-2 block text-gray-200'
                >
                  {voucherType === 1
                    ? 'Number of free trials'
                    : 'Percentage Discount (%)'}
                </label>
                <input
                  type='number'
                  id='voucherType'
                  value={voucherAmount}
                  min={1}
                  max={100}
                  onChange={(e) => setVoucherAmount(Number(e.target.value))}
                  className={`w-full rounded-md border bg-gray-700 px-4 py-2 text-gray-200`}
                  required
                />
                {voucherDescriptionError && (
                  <div className='mt-1 text-xs text-red-500'>
                    {voucherDescriptionError}
                  </div>
                )}
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
