import Base from '@/app/components/base';
import VendorProfilePage from './vendor-profile-page';

const VendorProfile = () => {
  const component = <VendorProfilePage />;

  return <Base content={component} />;
};

export default VendorProfile;
