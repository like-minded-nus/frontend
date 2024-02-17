import { getServerSession } from 'next-auth';
import RegisterCard from '../components/register-card';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
  const session = await getServerSession();
  if (session) {
    redirect('/home');
  }
  return (
    <div className='login-register-page-div'>
      <RegisterCard />
    </div>
  );
}
