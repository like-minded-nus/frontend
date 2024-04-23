import AdminBase from '../../components/admin-base';
import UsersTable from './users-table';

const Reports = () => {
  const component = <UsersTable />;
  return <AdminBase content={component} />;
};

export default Reports;
