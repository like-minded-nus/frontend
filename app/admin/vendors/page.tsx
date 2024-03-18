import Base from '@/app/components/base';
import VendorsPage from './vendors-page';

const Vendors = () => {
  const component = <VendorsPage />;
  return <Base content={component} />;
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
