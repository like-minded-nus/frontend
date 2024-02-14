'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DatePicker from '../components/date-picker';
import { IoMdAdd } from 'react-icons/io';
import PassionModal from './passion-modal';
import { Passion } from '../common-inteface';


const ProfileForm = () => {
  const router = useRouter();

  const [displayName, setDisplayName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [passionsId, setPassionsId] = useState<number[]>([]);
  const [passionsName, setPassionsName] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = (passionNameList : string[]) => {
    setPassionsName(passionNameList);
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const newProfile = { displayName, birthday, gender, passionsId};
    const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT ?? '';
    const res = await fetch(`${endpoint}/profile/2`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
  };

  const validateInput = () => {};

  const togglePassion = (passionId : number) => {
    if (passionsId.includes(passionId)) {
        setPassionsId(passionsId.filter((n) => n !== passionId));
    } else {
        setPassionsId([...passionsId, passionId]);
    }
  };

  return (
    <>
      <PassionModal isOpen={isModalOpen} onClose={closeModal} selectedPassion={passionsId} togglePassion={togglePassion} passionNames={passionsName}  />
      <form onSubmit={handleSubmit} className='mt-10 flex h-full w-full flex-row'>
        <div className='w-1/2'>
          <div className='input-group top-label w-2/3 min-w-[300px]'>
            <label htmlFor='displayName' className='min-w'>
              Display Name
            </label>
            <input
              id='displayName'
              onChange={(e) => setDisplayName(e.target.value)}
              value={displayName}
            />
          </div>
          <div className='input-group top-label'>
            <label>Birthday</label>
            <DatePicker />
          </div>
          <div className='input-group top-label'>
            <label>Gender</label>
            <div className='flex flex-row'>
              <button className='btn btn-primary'>Male </button>
              <button className='btn btn-primary'>Female </button>
            </div>
          </div>
          <div className='input-group top-label'>
            <label>Passion</label>
            <div className='flex gap-x-1'>
            {passionsName.length > 0 && 
               passionsName.map((passionName : string) => (
                   <div className='mx-1 rounded-3xl border border-gray-700 bg-white px-8 py-2 text-sm font-semibold text-gray-700
                   transition-all duration-200'>
                    {passionName}</div>
                   ))
                }
            </div>
            <button
              className='btn btn-primary flex w-[200px] flex-row items-center justify-center'
              onClick={openModal}
              type='button'
            >
              <IoMdAdd />
              <div>Add Passions</div>
            </button>
          </div>
        </div>
        <div className='w-1/2'>
          <div>Profile Photo</div>
        </div>

        <button type='submit' className='btn btn-primary' disabled={isLoading}>
          Create
        </button>
      </form>
    </>
  );
};

export default ProfileForm;
