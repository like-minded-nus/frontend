'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DatePicker from '../components/date-picker';
import { IoMdAdd } from 'react-icons/io';
import PassionModal from './passion-modal';
import ImageUploaderCard from '../components/image-uploader-card';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Profile } from '@/models/profile';
import { Passion } from '@/models/passion';
import { getProfileByUserId } from '@/redux/features/profileSlice';
import { useSession } from 'next-auth/react';
import { setUserId } from '@/redux/features/userSlice';

const ProfileForm = () => {
  const router = useRouter();

  const [displayName, setDisplayName] = useState('');
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [gender, setGender] = useState<string>('male');
  const [bio, setBio] = useState<string>('');
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

  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const controller = new AbortController();
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [createUpdateId, setCreateUpdateId] = useState<number | null>();

  const [callMethod, setCallMethod] = useState<string>('POST');
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT ?? '';
  const sessionUserId: number = useAppSelector(
    (state) => state.userReducer.userId
  );

  const sessionProfile: Profile = useAppSelector(
    (state) => state.profileReducer.sessionProfile
  );

  useEffect(() => {
    console.log(sessionProfile?.profileId ? 'has profile id' : 'no profile id');
    if (sessionProfile?.profileId) {
      setCreateUpdateId(sessionProfile?.profileId);
      setIsUpdate(true);
      setCallMethod('PUT');
      setDisplayName(sessionProfile?.displayName);
      setBirthday(sessionProfile?.birthdate);
      setGender(sessionProfile?.gender);
      setBio(sessionProfile?.bio);
      setImage1(sessionProfile?.image1);
      setImage2(sessionProfile?.image2);
      setImage3(sessionProfile?.image3);
      setImage4(sessionProfile?.image4);
      setImage5(sessionProfile?.image5);
      setImage6(sessionProfile?.image6);
    } else {
      setCreateUpdateId(Number(session?.user.id));
    }
  }, [sessionProfile]);

  // useEffect(() => {
  //   console.log(session?.user.id);
  //   dispatch(setUserId(Number(session?.user.id)));
  // }, [session]);

  useEffect(() => {
    if (isUpdate) {
      getExistingPassions(sessionProfile?.profileId);
    }
  }, [isUpdate]);

  const getExistingPassions = async (profileId: number) => {
    const res = await fetch(
      `${endpoint}/passion/getpassionsfromprofileid/${profileId}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const resJson = await res.json();
    if (resJson.status != 200) {
      console.error(resJson.status + ' ' + resJson.message);
    } else {
      console.log(resJson.message);
      const passionList: Passion[] = resJson.payload.passionList;
      const passionNameList: string[] = passionList.map(
        (passion) => passion.passionName
      );
      const passionIdList: number[] = passionList.map(
        (passion) => passion.passionId
      );
      setPassionsId(passionIdList);
      setPassionsName(passionNameList);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = (passionNameList: string[]) => {
    setPassionsName(passionNameList);
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateInput()) {
      setIsLoading(false);
    } else {
      let createUpdateProfile;
      if (isUpdate) {
        console.log('UPDATING PROFILE');
        createUpdateProfile = {
          profileId: createUpdateId,
          displayName: displayName,
          birthdate: birthday,
          gender,
          profilePassionList: passionsId,
          bio,
          image1: image1 ?? '',
          image2: image2 ?? '',
          image3: image3 ?? '',
          image4: image4 ?? '',
          image5: image5 ?? '',
          image6: image6 ?? '',
        };
      } else {
        console.log('CREATING PROFILE');
        createUpdateProfile = {
          userId: createUpdateId,
          displayName: displayName,
          birthdate: birthday,
          gender,
          profilePassionList: passionsId,
          bio,
          image1: image1 ?? '',
          image2: image2 ?? '',
          image3: image3 ?? '',
          image4: image4 ?? '',
          image5: image5 ?? '',
          image6: image6 ?? '',
        };
      }
      console.log(createUpdateProfile);

      const res = await fetch(`${endpoint}/profile`, {
        method: callMethod,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createUpdateProfile),
      });

      const resJson = await res.json();

      if (resJson.status != 200) {
        console.error(resJson.status + ' ' + resJson.message);
      } else {
        if (isUpdate) {
          alert('Profile updated!');
        } else {
          alert('Profile created!');
        }
        console.log(resJson.message);
        setIsLoading(false);
        router.push('/browse');
      }
    }
  };

  const validateInput = () => {
    if (displayName.trim() === '') {
      alert('Please enter a valid name.');
      return false;
    }

    if (bio.trim() === '') {
      alert('Please enter a valid biography.');
      return false;
    }

    if (passionsId.length === 0) {
      alert('Please select at least one passion.');
      return false;
    }

    if (!image1 && !image2 && !image3 && !image4 && !image5 && !image6) {
      alert('Please upload at least one photo in JPEG format.');
      return false;
    }

    return true;
  };

  const togglePassion = (passionId: number) => {
    if (passionsId.includes(passionId)) {
      setPassionsId(passionsId.filter((n) => n !== passionId));
    } else {
      setPassionsId([...passionsId, passionId]);
    }
  };

  return (
    <>
      <PassionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedPassion={passionsId}
        togglePassion={togglePassion}
        passionNames={passionsName}
      />
      <form onSubmit={handleSubmit} className='mt-10 flex h-full flex-col'>
        <div className='flex h-full flex-col md:flex-row'>
          {/* Basic Info Section */}
          <div className='flex flex-col'>
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
            <div className='input-group top-label-textarea mt-4 w-2/3 min-w-[300px]'>
              <label>Biography</label>
              <textarea
                id='biography'
                rows={4}
                cols={50}
                onChange={(e) => setBio(e.target.value)}
                value={bio}
              />
            </div>
            <div className='input-group top-label mt-4'>
              <label>Gender</label>
              <div className='flex flex-row'>
                <label
                  onClick={() => setGender('male')}
                  className={`btn ${gender == 'male' ? 'btn-secondary' : 'btn-primary'}`}
                >
                  Male
                </label>
                <label
                  onClick={() => setGender('female')}
                  className={`btn ${gender == 'female' ? 'btn-secondary' : 'btn-primary'}`}
                >
                  Female
                </label>
              </div>
            </div>
            <div className='input-group top-label mt-4'>
              <label>Passion</label>
              <div className='flex flex-wrap gap-x-1 gap-y-2'>
                {passionsName.length > 0 &&
                  passionsName.map((passionName: string) => (
                    <div
                      key={passionName}
                      className='mx-1 rounded-3xl border border-gray-700 bg-white px-8 py-2 text-sm font-semibold text-gray-700
                   transition-all duration-200'
                    >
                      {passionName}
                    </div>
                  ))}
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
          <div className=''>
            <div className='top-label h-full'>
              <label className='text-sm font-bold text-gray-700'>
                Profile Photo
              </label>
              <div className='image-uploader-card'>
                <ImageUploaderCard
                  isUpdate={isUpdate}
                  image={image1}
                  setImage={setImage1}
                />
                <ImageUploaderCard
                  isUpdate={isUpdate}
                  image={image2}
                  setImage={setImage2}
                />
                <ImageUploaderCard
                  isUpdate={isUpdate}
                  image={image3}
                  setImage={setImage3}
                />
              </div>
              <div className='image-uploader-card mt-3'>
                <ImageUploaderCard
                  isUpdate={isUpdate}
                  image={image4}
                  setImage={setImage4}
                />
                <ImageUploaderCard
                  isUpdate={isUpdate}
                  image={image5}
                  setImage={setImage5}
                />
                <ImageUploaderCard
                  isUpdate={isUpdate}
                  image={image6}
                  setImage={setImage6}
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type='submit'
          className='btn btn-primary btn-solid mt-4'
          disabled={false}
        >
          {isUpdate ? 'Update Profile' : 'Create Profile'}
        </button>
      </form>
    </>
  );
};

export default ProfileForm;
