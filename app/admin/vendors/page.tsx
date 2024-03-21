import VendorsPage from './vendors-page';
import AdminBase from '@/app/components/admin-base';

const Vendors = () => {
  const component = <VendorsPage />;
  return <AdminBase content={component} />;
  // return (
  //   <>
  //     <div className='mx-40 my-10 flex w-screen flex-col items-center justify-start '>
  //       <h1 className='text-4xl font-semibold italic'>REGISTER VENDOR</h1>
  //       <VendorsPage />
  //     </div>
  //   </>
  // );
};

export default Vendors;
