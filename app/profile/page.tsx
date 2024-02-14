import ProfileForm from './profile-form';
const Profile = () => {
  return (
    <>
      <div className='mx-40 my-10 flex w-screen flex-col items-center justify-start '>
        <h1 className='text-4xl font-semibold italic'>CREATE YOUR PROFILE</h1>
        <ProfileForm />
      </div>
    </>
  );
};

export default Profile;
