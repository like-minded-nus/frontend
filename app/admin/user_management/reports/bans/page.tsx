import AdminBase from '../../../../components/admin-base';
import BanTable from './bans-table';

const Reports = () => {
  const component = <BanTable />;
  return <AdminBase content={component} />;
};

export default Reports;
