import AdminBase from '../components/admin-base';
import AdminPage from './admin-page';

const Admin = () => {
  const component = <AdminPage />;
  return <AdminBase content={component} />;
};

export default Admin;
