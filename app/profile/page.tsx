import { getServerSession } from 'next-auth';
import Base from '../components/base';
import ProfileComponent from './profile-main-component';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import { redirect } from 'next/navigation';

const Browse = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }
  const component = <ProfileComponent />;

  return <Base content={component} />;
};

export default Browse;
