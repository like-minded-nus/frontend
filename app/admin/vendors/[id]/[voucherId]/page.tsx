import VoucherViewPage from './view-voucher-page';
import AdminBase from '@/app/components/admin-base';

const VoucherPage = () => {
  const component = <VoucherViewPage />;

  return <AdminBase content={component} />;
};

export default VoucherPage;
