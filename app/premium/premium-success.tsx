import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const GetPremiumSuccess = () => {
  return (
    <div className='premium-success-main-div'>
      <div className='login-register-main-card'>
        <div className='premium-success-top-section'>
          <div className='premium-success-top-inner'>
            <span className='mt-5 flex justify-center text-5xl text-white'>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className='mt-9 text-2xl font-bold text-white'>
              Thank you for joining the Premium Family!
            </span>
          </div>
        </div>
        <div className='premium-success-bottom-section'>
          <div className='premium-success-bot-inner'>
            <span className='premium-success-message'>
              Congratulations! Your premium purchase is successful.
            </span>
            <button className='premium-home-button'>
              <Link href='/home'>Back to Home</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetPremiumSuccess;
