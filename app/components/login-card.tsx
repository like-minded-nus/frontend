import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const LoginCard = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const LOGIN_API_URL = 'http://localhost:8080/api/v1/user/login';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter both username and password.');
    } else {
      setError('');
      try {
        const response = await fetch(LOGIN_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });

        const res = await response.json();
        if (res.status !== 200) {
          setError(res.message);
        }

        sessionStorage.setItem('userId', res.userId);
        console.log(sessionStorage.getItem('userId'));
        router.push('/home');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className='w-96 overflow-hidden rounded-[20px] bg-pink-200 shadow-lg'>
      <div className='px-6 py-4'>
        <div className='flex w-full justify-center p-2'>
          <img
            className='max-h-40 rounded-full'
            src='https://kpopping.com/documents/35/1/1440/211019-ITZY-Instagram-Update-Yeji-documents-3.jpeg?v=c7f9c'
          ></img>
        </div>

        <form>
          <div className='py-2 font-bold'>Username</div>
          <div className='w-full'>
            <input
              className='w-full rounded-md p-2'
              type='text'
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='py-2 font-bold'>Password</div>
          <div className='w-full'>
            <input
              className='w-full rounded-md p-2'
              type='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='max-w flex w-full justify-start pb-1 pt-1'>
            <span className='text-red-500'>{error}</span>
          </div>
          <div className='w-full pb-1 pt-5 '>
            <button
              className='h-10 w-full rounded-md bg-black text-white hover:bg-gray-800'
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <div className='flex w-full justify-end pb-1 pt-3 '>
            <Link className='hover:underline' href='https://google.com'>
              Don&apos;t have an account?
            </Link>
          </div>
        </form>
        {/* <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                    <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                </div> */}
      </div>
    </div>
  );
};

export default LoginCard;
