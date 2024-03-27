'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import VoucherDatepicker from '@/app/components/voucher-datepicker';
import { useRouter, useSearchParams } from 'next/navigation';
import DeleteModal from '@/app/components/delete-modal';

const EditVoucherForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [voucherName, setVoucherName] = useState('');
  const [voucherEndDate, setVoucherEndDate] = useState('');
  const [voucherDescription, setVoucherDescription] = useState('');
  const [redeemStatus, setRedeemStatus] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [voucherId, setVoucherId] = useState('');
  const [voucherNameError, setVoucherNameError] = useState('');
  const [voucherDescriptionError, setVoucherDescriptionError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    const voucherParams = searchParams.get('selectedVoucher');
    console.log(voucherParams);
    if (voucherParams) {
      const selectedVoucher = JSON.parse(voucherParams);
      console.log(selectedVoucher);
      setVoucherName(selectedVoucher.voucherName);
      setVoucherEndDate(selectedVoucher.voucherEndDate);
      setVoucherDescription(selectedVoucher.voucherDescription);
      setRedeemStatus(selectedVoucher.redeemStatus);
      setVendorId(selectedVoucher.vendorId);
      setVoucherId(selectedVoucher.voucherId);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      const response = await axios.put(`${endpoint}/vouchers/${voucherId}`, {
        voucherName,
        voucherEndDate,
        voucherDescription,
        redeemStatus,
        vendorId,
      });
      console.log('Voucher details updated successfully:', response.data);
      alert('Voucher updated successfully!');
      router.push(`/admin/vendors/${vendorId}`);
    } catch (error) {
      console.error('Error updating voucher:', error);
      alert('Failed to update voucher. Please try again.');
    }

    setVoucherName('');
    setVoucherEndDate('');
    setVoucherDescription('');
    setVendorId('');
    setRedeemStatus('');
    setVoucherId('');
  };

  const handleDelete = async () => {
    try {
      const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT ?? '';
      if (!endpoint) {
        throw new Error('API endpoint is not defined.');
      }
      await axios.delete(`${endpoint}/vouchers/${voucherId}`);
      alert('Voucher deleted successfully!');
      router.push(`/admin/vendors/${vendorId}`);
    } catch (error) {
      console.error('Error deleting voucher:', error);
      alert('Failed to delete voucher. Please try again.');
    }
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

  const handleOpenModal = (voucherId: any) => {
    setSelectedItem(voucherId);
    setIsModalOpen(true);
  };

  return (
    <div className='flex items-center justify-center'>
      <div className='mx-auto mt-24 w-full max-w-3xl rounded-lg border-gray-500 bg-gray-500 p-8 text-center'>
        <div className='flex items-center justify-center'>
          <div className='w-1/2 pr-8'>
            <h1 className='mb-8 text-3xl text-gray-200'>Edit Voucher</h1>
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
                  onBlur={() => {
                    if (voucherDescription.trim() === '') {
                      setVoucherDescriptionError(
                        'Voucher description cannot be empty.'
                      );
                    } else {
                      setVoucherDescriptionError('');
                    }
                  }}
                  className={`w-full rounded-md border bg-gray-700 ${
                    voucherDescriptionError
                      ? 'border-red-500'
                      : 'border-gray-200'
                  } px-4 py-2 text-gray-200`}
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
                Save Changes
              </button>
            </form>
          </div>
        </div>
        <button
          type='button'
          onClick={handleOpenModal}
          className='btn-square btn-delete absolute bottom-52 left-48 mr-2'
        >
          Delete?
        </button>
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedId={voucherId}
        confirmationText={`${voucherName}`}
        itemType='voucher'
        vendorId={vendorId}
      />
    </div>
  );
};

export default EditVoucherForm;
