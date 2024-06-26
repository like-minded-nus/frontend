'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { redirect, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import VendorPassionModal from './vendor-passion-modal';
import { IoMdAdd } from 'react-icons/io';

const CreateVendorForm = () => {
  const router = useRouter();
  const [vendorName, setVendorName] = useState('');
  const [activity, setActivity] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [website, setWebsite] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [activityError, setActivityError] = useState('');
  const [vendorNameError, setVendorNameError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [websiteError, setWebsiteError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passionsId, setPassionsId] = useState<number | null>(null);
  const [passionsName, setPassionsName] = useState<string>('');
  const [vendorType, setVendorType] = useState<string>('OUTDOOR');
  const [intensityLevel, setIntensityLevel] = useState<string>('');
  const [conversationFriendly, setConversationFriendly] = useState<string>('');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (vendorName.trim() === '') {
      alert('Vendor name cannot be empty.');
      return;
    }
    if (vendorName.length > 50) {
      alert('Vendor name cannot exceed 50 characters.');
      return;
    }
    const activityRegex = /^[a-zA-Z\s]+$/;
    if (!activityRegex.test(activity)) {
      alert('Activity name must contain only alphabetic characters.');
      return;
    }
    if (!passionsId) {
      alert('Please select a passion.');
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
    const phoneNumberRegex = /^\d{8}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      alert('Phone number must be an 8-digit number.');
      return;
    }
    const websiteRegex = /^(ftp|http|https):\/\/(www\.)?[^ "]+$/;
    if (!websiteRegex.test(website)) {
      alert(
        'Please enter a valid website URL. (starting with http://, https://, ftp://)'
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
        passionId: passionsId,
        address,
        phoneNumber,
        website,
        vendorType: vendorType,
        intensityLevel: vendorType === 'OUTDOOR' ? intensityLevel : '',
        conversationFriendly:
          vendorType === 'INDOOR' ? conversationFriendly : '',
      });
      console.log('Vendor registration successful:', response.data);
      alert('Vendor created successfully!');
      router.push(`/admin/vendors`);
    } catch (error) {
      console.error('Error registering vendor:', error);
      alert('Failed to create vendor. Please try again.');
    }

    setVendorName('');
    setActivity('');
    setPassionsId(null);
    setAddress('');
    setPhoneNumber('');
    setWebsite('');
    setVendorType('OUTDOOR');
    setIntensityLevel('');
    setConversationFriendly('');
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = (passionName: string) => {
    setPassionsName(passionName);
    setIsModalOpen(false);
    console.log(`Selected Passion: ${passionName} (${passionsId})`);
  };

  const togglePassion = (passionId: number) => {
    setPassionsId(passionId);
  };

  return (
    <div className='flex items-center justify-center'>
      <VendorPassionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedPassion={passionsId}
        togglePassion={togglePassion}
        passionNames={passionsName}
      />
      <div className='mx-auto mt-5 w-full max-w-6xl rounded-lg border-gray-500 bg-gray-500 p-6 shadow-lg'>
        <div className='flex items-center justify-center'>
          {/* <div className='w-1/2 pr-8'> */}
          <div className='w-1/3'>
            <h1 className='mb-8 text-center text-3xl text-gray-200'>
              Register Vendor
            </h1>
            <div className='mt-14 flex justify-center'>
              {/* <label className='mb-2 block text-gray-200'>Vendor Type</label> */}
              <div className='flex flex-row'>
                <label
                  onClick={() => setVendorType('OUTDOOR')}
                  className={`btn ${vendorType == 'OUTDOOR' ? 'btn-secondary' : 'btn-primary'}`}
                >
                  Outdoor
                </label>
                <label
                  onClick={() => setVendorType('INDOOR')}
                  className={`btn ${vendorType == 'INDOOR' ? 'btn-secondary' : 'btn-primary'}`}
                >
                  Indoor
                </label>
              </div>
            </div>
          </div>
          <div className='mt-5 h-80 border-r-2 border-gray-400'></div>

          {/* <div className='w-1/2 pl-8'> */}
          <div className='ml-4 flex w-2/3 flex-col items-center pr-8'>
            <form className='flex justify-evenly'>
              <div className='mx-4 w-1/2'>
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
                    onBlur={() => {
                      if (vendorName.trim() === '') {
                        setVendorNameError('Vendor name cannot be empty.');
                      } else if (vendorName.length > 50) {
                        setVendorNameError(
                          'Vendor name cannot exceed 50 characters.'
                        );
                      } else {
                        setVendorNameError('');
                      }
                      console.log('Vendor name error:', vendorNameError);
                    }}
                    className={`w-full rounded-md border bg-gray-700 ${
                      vendorNameError ? 'border-red-500' : 'border-gray-200'
                    } px-4 py-2 text-gray-200`}
                    required
                  />
                  {vendorNameError && (
                    <div className='mt-1 text-xs text-red-500'>
                      {vendorNameError}
                    </div>
                  )}
                </div>

                <div className='mb-4 flex flex-col'>
                  <label htmlFor='activity' className='mb-2 flex text-gray-200'>
                    Activity Name:
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
                  <label htmlFor='passion' className='mb-2 flex text-gray-200'>
                    Passion Tag:
                    <button
                      className='btn-square-small ml-5 flex flex-row items-center justify-center'
                      onClick={openModal}
                      type='button'
                    >
                      <IoMdAdd />
                    </button>
                  </label>

                  {passionsName ? (
                    <div className='w-full rounded-md border bg-gray-700 px-4 py-2 text-gray-200'>
                      {passionsName}
                    </div>
                  ) : (
                    <div className='w-full rounded-md border bg-gray-700 px-4 py-2 text-gray-200'>
                      Please select a passion
                    </div>
                  )}
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
                    onBlur={() => {
                      if (address.trim() === '') {
                        setAddressError('Vendor name cannot be empty.');
                      } else {
                        setAddressError('');
                      }
                      console.log('Address error:', addressError);
                    }}
                    className={`w-full rounded-md border bg-gray-700 ${
                      addressError ? 'border-red-500' : 'border-gray-200'
                    } px-4 py-2 text-gray-200`}
                    required
                  />
                  {addressError && (
                    <div className='mt-1 text-xs text-red-500'>
                      {addressError}
                    </div>
                  )}
                </div>
              </div>
              <div className='mx-4 w-1/2'>
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
                  />
                </div>
                {vendorType === 'OUTDOOR' && (
                  <div className='mb-4 flex flex-col'>
                    <label
                      htmlFor='intensityLevel'
                      className='mb-2 block text-gray-200'
                    >
                      Intensity Level:
                    </label>
                    <select
                      id='intensityLevel'
                      value={intensityLevel}
                      onChange={(e) => setIntensityLevel(e.target.value)}
                      className='w-full rounded-md border bg-gray-700 px-4 py-2 text-gray-200'
                    >
                      <option value=''>Select Intensity Level</option>
                      <option value='LOW'>Low</option>
                      <option value='MEDIUM'>Medium</option>
                      <option value='HIGH'>High</option>
                    </select>
                  </div>
                )}

                {vendorType === 'INDOOR' && (
                  <div className='mb-4 flex flex-col'>
                    <label
                      htmlFor='conversationFriendly'
                      className='mb-2 block text-gray-200'
                    >
                      Conversation Friendly:
                    </label>
                    <select
                      id='conversationFriendly'
                      value={conversationFriendly}
                      onChange={(e) => setConversationFriendly(e.target.value)}
                      className='w-full rounded-md border bg-gray-700 px-4 py-2 text-gray-200'
                    >
                      <option value=''>Is Conversation Friendly?</option>
                      <option value='YES'>Yes</option>
                      <option value='NO'>No</option>
                    </select>
                  </div>
                )}
              </div>
            </form>
            <button
              type='submit'
              onClick={handleSubmit}
              className='btn btn-secondary btn-solid mt-4 w-3/4 py-2 align-middle'
            >
              Add Vendor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateVendorForm;
