import { getServerSession } from 'next-auth';
import LoginCard from '../components/login-card';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await getServerSession();
  if (session) {
    redirect('/home');
  }
  return (
    <div className='login-register-page-div'>
      <LoginCard />
    </div>
  );
}
