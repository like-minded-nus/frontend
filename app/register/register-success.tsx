import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const RegisterSuccess = () => {
  return (
    <div className='login-register-main-card'>
      <div className='register-success-top-section'>
        <div className='register-success-top-inner'>
          <span className='mt-5 flex justify-center text-5xl text-white'>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className='mt-9 text-2xl font-bold text-white'>
            Registration Successful!
          </span>
        </div>
      </div>
      <div className='register-success-bottom-section'>
        <div className='register-success-bot-inner'>
          <span className='register-success-message'>
            Congratulations! Your registration is successful.
          </span>
          <button className='login-register-button'>
            <Link href='/login'>Back to Login</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterSuccess;
