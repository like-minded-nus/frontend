import CreateVendorForm from './create-vendor-form';
import AdminBase from '@/app/components/admin-base';

const CreateVendor = () => {
  const component = <CreateVendorForm />;
  return <AdminBase content={component} />;
  //   return (
  //     <>
  //       <div className='mx-40 my-10 flex w-screen flex-col items-center justify-start '>
  //         <h1 className='text-4xl font-semibold italic'>REGISTER VENDOR</h1>
  //         <CreateVendorForm />
  //       </div>
  //     </>
  //   );
};

export default CreateVendor;
