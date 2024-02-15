'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DatePicker from '../components/date-picker';
import { IoMdAdd } from 'react-icons/io';
import PassionModal from './passion-modal';
import ImageUploaderCard from '../components/image-uploader-card';


const ProfileForm = () => {
  const router = useRouter();

  const [displayName, setDisplayName] = useState('');
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [gender, setGender] = useState<string>('male');
  const [passionsId, setPassionsId] = useState<number[]>([]);
  const [passionsName, setPassionsName] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image1, setImage1] = useState<File | null>();
  const [image2, setImage2] = useState<File | null>();
  const [image3, setImage3] = useState<File | null>();
  const [image4, setImage4] = useState<File | null>();
  const [image5, setImage5] = useState<File | null>();
  const [image6, setImage6] = useState<File | null>();


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

    const newProfile = { 
    displayName, 
    birthday, 
    gender, 
    passionsId, 
    image1: new Blob([image1 as BlobPart],{type: image1?.type}),
    image2: new Blob([image2 as BlobPart],{type: image2?.type}),
    image3: new Blob([image3 as BlobPart],{type: image3?.type}),
    image4: new Blob([image4 as BlobPart],{type: image4?.type}),
    image5: new Blob([image5 as BlobPart],{type: image5?.type}),
    image6: new Blob([image6 as BlobPart],{type: image6?.type})
    };
    const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT ?? '';
    const res = await fetch(`${endpoint}/profile/2`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
  };

  const validateInput = () => {};

  const togglePassion = (passionId : number) => {
    console.log(displayName , gender, birthday)
    if (passionsId.includes(passionId)) {
        setPassionsId(passionsId.filter((n) => n !== passionId));
    } else {
        setPassionsId([...passionsId, passionId]);
    }
  };

  return (
    <>
      <PassionModal isOpen={isModalOpen} onClose={closeModal} selectedPassion={passionsId} togglePassion={togglePassion} passionNames={passionsName}  />
      <form onSubmit={handleSubmit} className='mt-10 flex h-full w-full flex-col'>

        <div className='flex flex-col h-full md:flex-row'>
              {/* Basic Info Section */}
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
          <div className='input-group top-label mt-4'>
            <label>Birthday</label>
            <div className='w-2/3 min-w-[300px]'>
                <DatePicker setDate={setBirthday} />
            </div>
          </div>
          <div className='input-group top-label mt-4'>
            <label>Gender</label>
            <div className='flex flex-row'>
                <label onClick={()=> setGender('male')} className={`btn ${gender == 'male' ? 'btn-secondary' : 'btn-primary'}`}>Male</label>
                <label onClick={()=> setGender('female')} className={`btn ${gender == 'female' ? 'btn-secondary' : 'btn-primary'}`}>Female</label>
            </div>
          </div>
          <div className='input-group top-label mt-4'>
            <label>Passion</label>
            <div className='flex gap-x-1'>
            {passionsName.length > 0 && 
               passionsName.map((passionName : string) => (
                   <div key={passionName} className='mx-1 rounded-3xl border border-gray-700 bg-white px-8 py-2 text-sm font-semibold text-gray-700
                   transition-all duration-200'>
                    {passionName}</div>
                   ))
                }
            <button
              className='btn btn-primary btn-solid flex w-[200px] flex-row items-center justify-center'
              onClick={openModal}
              type='button'
            >
              <IoMdAdd />     
              <div className='ml-1'>Add Passions</div>
            </button>
            </div>
          </div>
        </div>

        {/* Profile Photo Section */}
        <div className='w-1/2'>
            <div className='h-full top-label'>
            <label className='text-sm font-bold text-gray-700'>Profile Photo</label>
                <div className='image-uploader-card'>
                    <ImageUploaderCard image={image1} setImage={setImage1}/>
                    <ImageUploaderCard image={image2} setImage={setImage2}/>
                    <ImageUploaderCard image={image3} setImage={setImage3}/>
                </div>
                <div className='mt-3 image-uploader-card'>
                <ImageUploaderCard  image={image4} setImage={setImage4}/>
                    <ImageUploaderCard image={image5} setImage={setImage5}/>
                    <ImageUploaderCard image={image6} setImage={setImage6}/>
                </div>
            </div>
           </div>
        </div>
      

        <button type='submit' className='btn btn-primary btn-solid mt-4' disabled={isLoading}>
          Create Profile
        </button>
      </form>
    </>
  );
};

export default ProfileForm;
