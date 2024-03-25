import AdminBase from '@/app/components/admin-base';
import EditVoucherForm from './edit-voucher-form';

const EditVoucher = () => {
  const component = <EditVoucherForm />;
  return <AdminBase content={component} />;
};

export default EditVoucher;
