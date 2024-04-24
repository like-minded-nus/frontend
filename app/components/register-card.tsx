'use client';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import RegisterSuccess from './register-success';

const RegisterCard = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextResponse = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        confirmPassword,
      }),
    });
    const { status, message } = await nextResponse.json();

    if (status !== 200) {
      setError(message);
    } else {
      setRegisterSuccess(true);
    }
  };
  return (
    <>
      {registerSuccess ? null : (
        <div className='login-register-main-card'>
          <div className='login-register-main-card-padding'>
            <div className='login-register-image-logo-container'>
              <img
                className='login-register-image-logo'
                src='https://cdn-icons-png.flaticon.com/512/3939/3939748.png'
              ></img>
            </div>

            <form>
              <div>
                <div className='login-register-label-field'>Username</div>
                <div className='login-register-input-field-container'>
                  <input
                    className='login-register-input-field'
                    type='text'
                    name='username'
                    required
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div>
                <div className='login-register-label-field'>Email Address</div>
                <div className='login-register-input-field-container'>
                  <input
                    className='login-register-input-field'
                    type='text'
                    name='email'
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div>
                <div className='login-register-label-field'>Password</div>
                <div className='login-register-input-field-container'>
                  <input
                    className='login-register-input-field'
                    type='password'
                    name='password'
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div>
                <div className='login-register-label-field'>
                  Confirm Password
                </div>
                <div className='login-register-input-field-container'>
                  <input
                    className='login-register-input-field'
                    type='password'
                    name='confirmPassword'
                    required
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className='login-register-error-container'>
                <span className='login-register-font-size-color'>{error}</span>
              </div>
              <div className='login-register-button-container'>
                <button
                  className='login-register-button'
                  onClick={handleRegister}
                >
                  Register
                </button>
              </div>
              <div className='login-register-register-container'>
                <Link className='login-register-register' href='/login'>
                  Already have an account? Log in here.
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}

      {registerSuccess ? <RegisterSuccess /> : null}
    </>
  );
};

export default RegisterCard;
