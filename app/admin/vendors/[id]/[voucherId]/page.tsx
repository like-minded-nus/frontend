import Base from '@/app/components/base';
import VoucherViewPage from './view-voucher-page';

const VoucherPage = () => {
  const component = <VoucherViewPage />;

  return <Base content={component} />;
};

export default VoucherPage;
