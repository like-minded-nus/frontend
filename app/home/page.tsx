import { getServerSession } from 'next-auth';
import Base from '../components/base';
import Demo from '../components/demo';
import NextAuth from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';

const Home = async () => {
  const session = await getServerSession(authOptions);
  console.log(session?.user.id);
  const component = <Demo />;

  return <Base content={component} />;
};

export default Home;
