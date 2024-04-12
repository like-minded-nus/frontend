'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import DeleteModal from '@/app/components/delete-modal';
import VendorPassionModal from '../../register_vendor/vendor-passion-modal';
import { IoMdAdd } from 'react-icons/io';

const EditVendorForm = () => {
  const router = useRouter();
  const [vendorName, setVendorName] = useState('');
  const [pageTitle, setPageTitle] = useState('');
  const [activity, setActivity] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [website, setWebsite] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPassionModalOpen, setIsPassionModalOpen] = useState(false);
  const [passionsId, setPassionsId] = useState<number | null>(null);
  const [passionsName, setPassionsName] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState('');
  const [vendorType, setVendorType] = useState('');
  const [intensityLevel, setIntensityLevel] = useState('');
  const [conversationFriendly, setConversationFriendly] = useState('');

  const getVendorIdFromUrl = () => {
    const url = window.location.href;
    const urlParts = url.split('/');
    const idIndex = urlParts.indexOf('vendors') + 1;
    return urlParts[idIndex];
  };
  const vendorId = getVendorIdFromUrl();

  const fetchVendorDetails = async (id: any) => {
    try {
      const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT ?? '';
      const response = await axios.get(`${endpoint}/vendors/${id}`);
      const vendorData = response.data;
      setVendorName(vendorData.vendorName);
      setPageTitle(vendorData.vendorName);
      setActivity(vendorData.activityName);
      setPassionsId(vendorData.passionId);
      const passionResponse = await axios.get(
        `${endpoint}/passion/${vendorData.passionId}`
      );
      const passionData = passionResponse.data.payload.passionList;
      setPassionsName(passionData[0].passionName);
      setAddress(vendorData.address);
      setPhoneNumber(vendorData.phoneNumber);
      setWebsite(vendorData.website);
      setVendorType(vendorData.vendorType);
      setIntensityLevel(vendorData.intensityLevel);
      setConversationFriendly(vendorData.conversationFriendly);
      console.log('Vendor data:', vendorData);
    } catch (error) {
      console.error('Error fetching vendor details:', error);
    }
  };

  useEffect(() => {
    if (vendorId) {
      fetchVendorDetails(vendorId);
    }
  }, [vendorId]);

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
      const response = await axios.put(`${endpoint}/vendors/${vendorId}`, {
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
      console.log('Vendor details updated successfully:', response.data);
      alert('Vendor details updated successfully!');
      router.push(`/admin/vendors/${vendorId}`);
    } catch (error) {
      console.error('Error updating vendor details:', error);
      alert('Failed to update vendor details. Please try again.');
    }

    setVendorName('');
    setPageTitle('');
    setActivity('');
    setPassionsId(null);
    setAddress('');
    setPhoneNumber('');
    setWebsite('');
    setVendorType('');
    setIntensityLevel('');
    setConversationFriendly('');
  };

  const handleOpenModal = (vendorId: any) => {
    setSelectedItem(vendorId);
    setIsModalOpen(true);
  };

  const openPassionModal = () => {
    setIsPassionModalOpen(true);
  };

  const closePassionModal = (passionName: string) => {
    setPassionsName(passionName);
    setIsPassionModalOpen(false);
    console.log(`Selected Passion: ${passionName} (${passionsId})`);
  };

  const togglePassion = (passionId: number) => {
    setPassionsId(passionId);
  };

  return (
    <div className='flex items-center justify-center'>
      <VendorPassionModal
        isOpen={isPassionModalOpen}
        onClose={closePassionModal}
        selectedPassion={passionsId}
        togglePassion={togglePassion}
        passionNames={passionsName}
      />
      <div className='mx-auto mt-5 w-full max-w-6xl rounded-lg border-gray-500 bg-gray-500 p-6 shadow-lg'>
        <div className='flex items-center justify-center'>
          {/* <div className='w-1/2 pr-8'> */}
          <div className='w-1/3'>
            <h1 className='mb-8 text-center text-3xl text-gray-300'>
              Edit {pageTitle}
            </h1>
            <div className='mt-8 flex justify-center'>
              <label className='mr-2 text-center text-lg text-gray-300'>
                Vendor Type:
              </label>
              <div className='flex flex-row'>
                {vendorType == 'OUTDOOR' ? (
                  <label className='text-center text-lg text-gray-300'>
                    Outdoor Vendor
                  </label>
                ) : (
                  <label className='text-center text-lg text-gray-300'>
                    Indoor Vendor
                  </label>
                )}
              </div>
            </div>
          </div>
          <div className='mt-5 h-80 border-r-2 border-gray-400'></div>

          {/* <div className='w-1/2 pl-8 '> */}
          <div className='ml-4 flex w-2/3 flex-col items-center pr-8'>
            <form className='flex justify-evenly'>
              <div className='mx-4 w-1/2'>
                <div className='mb-4 flex flex-col'>
                  <label
                    htmlFor='vendorName'
                    className='mb-2 block text-gray-300'
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
                  <label
                    htmlFor='activity'
                    className='mb-2 block text-gray-300'
                  >
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
                  <label htmlFor='passion' className='mb-2 flex text-gray-200'>
                    Passion Tag:
                    <button
                      className='btn-square-small ml-5 flex flex-row items-center justify-center'
                      onClick={openPassionModal}
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
                  <label htmlFor='address' className='mb-2 block text-gray-300'>
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
              </div>
              <div className='mx-4 w-1/2'>
                <div className='mb-4 flex flex-col'>
                  <label
                    htmlFor='phoneNumber'
                    className='mb-2 block text-gray-300'
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
                  <label htmlFor='website' className='mb-2 block text-gray-300'>
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
              Save Changes
            </button>
          </div>
        </div>
        <button
          type='button'
          onClick={handleOpenModal}
          className='btn-square btn-delete bottom-2 left-2 mr-2'
        >
          Delete
        </button>
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedId={vendorId}
        confirmationText={`${vendorName}`}
        itemType='vendor'
        vendorId={vendorId}
      />
    </div>
  );
};

export default EditVendorForm;
