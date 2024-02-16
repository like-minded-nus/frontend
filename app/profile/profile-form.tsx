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
  const [image1, setImage1] = useState<string | null>();
  const [image2, setImage2] = useState<string | null>();
  const [image3, setImage3] = useState<string | null>();
  const [image4, setImage4] = useState<string | null>();
  const [image5, setImage5] = useState<string | null>();
  const [image6, setImage6] = useState<string | null>();


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

    if(!validateInput()){
        setIsLoading(false);
    }

    const newProfile = { 
    // to be replaced with real userId
    userId: 3,
    displayName, 
    birthdate : birthday, 
    gender, 
    profilePassionList: passionsId, 
    image1 : image1 ?? "",
    image2 : image2 ?? "",
    image3 : image3 ?? "",
    image4 : image4 ?? "",
    image5 : image5 ?? "",
    image6 : image6 ?? ""
    };

    const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT ?? '';
    const res = await fetch(`${endpoint}/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProfile)
    });

    const resJson = await res.json()

    if(resJson.status != 200){
        console.error(resJson.status + " " + resJson.message)
    }else{
        console.log(resJson.message)
        setIsLoading(false);
    }

  };

  const validateInput = () => {
    if (displayName.trim() === '') {
        alert('Please enter a valid name.');
        return false;
      }
      
      if (passionsId.length === 0) {
        alert('Please select at least one passion.');
        return false;
      }

      if(!image1 && !image2 && !image3 && !image4 && !image5 && !image6){
        alert('Please upload at least one photo.');
        return false;
      }
      
      return true;
  };

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
            <div className='flex gap-x-1 gap-y-2 flex-wrap'>
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
      

        <button type='submit' className='btn btn-primary btn-solid mt-4' disabled={false}>
          Create Profile
        </button>
      </form>
    </>
  );
};

export default ProfileForm;
