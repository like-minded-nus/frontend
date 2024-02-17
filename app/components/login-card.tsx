'use client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LoginCard = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  // const LOGIN_API_URL = 'http://localhost:8080/api/v1/user/login';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter both username and password.');
    } else {
      setError('');
      // try {
      const nextResponse = await signIn('credentials', {
        username: username,
        password: password,
        redirect: false,
      });

      // const response = await nextResponse?.json()
      console.log({ nextResponse });
      if (nextResponse?.error !== null) {
        setError('Login unsuccessful. Please try again.');
      } else {
        router.push('/home');
        router.refresh();
      }
    }
  };

  return (
    <div className='login-register-main-card'>
      <div className='login-register-main-card-padding'>
        <div className='login-register-image-logo-container'>
          <img
            className='login-register-image-logo'
            src='https://1409791524.rsc.cdn77.org/data/images/full/654186/le-sserafim-chaewon.jpg?w=600?w=430'
          ></img>
        </div>

        <form>
          <div className='login-register-label-field'>Username</div>
          <div className='login-register-input-field-container'>
            <input
              className='login-register-input-field'
              type='text'
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='login-register-label-field'>Password</div>
          <div className='login-register-input-field-container'>
            <input
              className='login-register-input-field'
              type='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='login-register-error-container'>
            <span className='login-register-font-size-color'>{error}</span>
          </div>
          <div className='login-register-button-container'>
            <button className='login-register-button' onClick={handleLogin}>
              Login
            </button>
          </div>
          <div className='login-register-register-container'>
            <Link className='login-register-register' href='/register'>
              Don&apos;t have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginCard;
