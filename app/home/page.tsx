import { getServerSession } from 'next-auth';
import Base from '../components/base';
import Demo from '../components/demo';
import NextAuth from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import { redirect } from 'next/navigation';

const Home = async () => {
  // const session = await getServerSession(authOptions);
  // console.log(session);
  // const userId = session?.user.id;
  // console.log(userId);
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  const component = <Demo />;

  return <Base content={component} />;
};

export default Home;
