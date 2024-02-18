import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const LikeMindedApp = async () => {
  const session = await getServerSession();
  if (session) {
    redirect('/home');
  } else {
    redirect('/login');
  }
};

export default LikeMindedApp;
