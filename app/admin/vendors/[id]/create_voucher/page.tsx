import Base from '@/app/components/base';
import CreateVoucherForm from './create-voucher-form';

const CreateVoucher = () => {
  const component = <CreateVoucherForm />;

  return <Base content={component} />;
};

export default CreateVoucher;
