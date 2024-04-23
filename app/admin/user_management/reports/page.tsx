import AdminBase from '../../../components/admin-base';
import ReportTable from './report-table';

const Reports = () => {
  const component = <ReportTable />;
  return <AdminBase content={component} />;
};

export default Reports;
