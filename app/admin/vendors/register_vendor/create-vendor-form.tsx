'use client';
import AdminMenu from '@/app/components/admin-menu';
import { useState } from 'react';
import axios from 'axios';

const CreateVendorForm = () => {
  const [vendorName, setVendorName] = useState('');
  const [activity, setActivity] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [website, setWebsite] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumberRegex = /^\d{8}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      alert('Phone number must be an 8-digit number.');
      return;
    }
    const activityRegex = /^[a-zA-Z\s]+$/;
    if (!activityRegex.test(activity)) {
      alert('Activity name must contain only alphabetic characters.');
      return;
    }
    if (vendorName.trim() === '') {
      alert('Vendor name cannot be empty.');
      return;
    }
    if (vendorName.length > 50) {
      alert('Vendor name cannot exceed 50 characters.');
      return;
    }
    if (address.trim() === '') {
      alert('Address cannot be empty.');
      return;
    }
    if (address.length > 100) {
      alert('Address cannot exceed 100 characters.');
      return;
    }
    const websiteRegex = /^(ftp|http|https):\/\/(www\.)?[^ "]+$/;
    if (!websiteRegex.test(website)) {
      alert(
        'Please enter a valid website URL. (starting with http://, https://, ftp://'
      );
      return;
    }

    try {
      const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT ?? '';
      if (!endpoint) {
        throw new Error('API endpoint is not defined.');
      }
      const response = await axios.post(`${endpoint}/vendors/create_vendor`, {
        vendorName,
        activityName: activity,
        address,
        phoneNumber,
        website,
      });
      console.log('Vendor registration successful:', response.data);
    } catch (error) {
      console.error('Error registering vendor:', error);
    }

    setVendorName('');
    setActivity('');
    setAddress('');
    setPhoneNumber('');
    setWebsite('');
  };

  return (
    <div className='flex items-center justify-center'>
      <div className='mx-auto mt-24 w-full max-w-3xl rounded-lg border-gray-500 bg-gray-500 p-8 text-center'>
        {/* <AdminMenu /> */}
        <div className='flex items-center justify-center'>
          <div className='w-1/2 pr-8'>
            <h1 className='mb-8 text-3xl text-gray-200'>Register Vendor</h1>
          </div>
          <div className='mt-5 h-80 border-r-2 border-gray-400'></div>

          <div className='w-1/2 pl-8'>
            <form onSubmit={handleSubmit}>
              <div className='mb-4 flex flex-col'>
                <label
                  htmlFor='vendorName'
                  className='mb-2 block text-gray-200'
                >
                  Vendor Name:
                </label>
                <input
                  type='text'
                  id='vendorName'
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                  className='w-full rounded-md border bg-gray-700 px-4 py-2 text-gray-200'
                  required
                />
              </div>
              <div className='mb-4 flex flex-col'>
                <label htmlFor='activity' className='mb-2 block text-gray-200'>
                  Activity:
                </label>
                <input
                  type='text'
                  id='activity'
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  className='w-full rounded-md border bg-gray-700 px-4 py-2 text-gray-200'
                  required
                />
              </div>
              <div className='mb-4 flex flex-col'>
                <label htmlFor='address' className='mb-2 block text-gray-200'>
                  Address:
                </label>
                <input
                  type='text'
                  id='address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className='w-full rounded-md border bg-gray-700 px-4 py-2 text-gray-200'
                  required
                />
              </div>
              <div className='mb-4 flex flex-col'>
                <label
                  htmlFor='phoneNumber'
                  className='mb-2 block text-gray-200'
                >
                  Phone Number:
                </label>
                <input
                  type='text'
                  id='phoneNumber'
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className='w-full rounded-md border bg-gray-700 px-4 py-2 text-gray-200'
                  required
                />
              </div>
              <div className='mb-4 flex flex-col'>
                <label htmlFor='website' className='mb-2 block text-gray-200'>
                  Website:
                </label>
                <input
                  type='text'
                  id='website'
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className='w-full rounded-md border bg-gray-700 px-4 py-2 text-gray-200'
                  required
                />
              </div>
              <button
                type='submit'
                className='btn btn-secondary btn-solid mt-4 w-full py-2'
              >
                Register Vendor
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateVendorForm;