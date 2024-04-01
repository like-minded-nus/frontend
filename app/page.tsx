import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const LikeMindedApp = async () => {
  const session = await getServerSession();
  console.log(session);
  if (!session) {
    redirect('/login');
  } else {
    if (session?.user.userRole === 2) {
      redirect('/home');
    } else {
      redirect('/admin');
    }
  }
};

export default LikeMindedApp;
