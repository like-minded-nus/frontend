import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import { redirect } from 'next/navigation';
import PremiumPage from './premium-page';
import Base from '../components/base';

const Premium = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  const component = <PremiumPage />;

  return <Base content={component} />;
};

export default Premium;
