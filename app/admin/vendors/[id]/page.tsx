import VendorProfilePage from './vendor-profile-page';
import AdminBase from '@/app/components/admin-base';

const VendorProfile = () => {
  const component = <VendorProfilePage />;

  return <AdminBase content={component} />;
};

export default VendorProfile;
