import { getServerSession } from 'next-auth';
import LoginCard from './login-card';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await getServerSession();
  if (session) {
    console.log(session);
    if (session?.user.userRole === 2) {
      redirect('/home');
    } else {
      redirect('/admin');
    }
  }
  return (
    <>
      <div className='body-blur'></div>
      <div className='login-register-page-div'>
        <LoginCard />
      </div>
    </>
  );
}
