import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Passion } from '@/models/passion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  passionIdList: number[];
}

const ChatroomVouchertModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  passionIdList,
}) => {
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT ?? '';

  const [reportedReason, setReportedReason] = useState<string>('');

  if (!isOpen) return <></>;

  return (
    <div className='fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-gray-500 bg-opacity-50'>
      <div className='w-[70%] rounded-lg bg-white p-6 text-center'>
        <div className='flex flex-col items-center justify-between '>
          <h2 className='text-xl font-bold'>
            Kickstart your date with a sponsored voucher!
          </h2>
          <label>{passionIdList.join(', ')}</label>
          <div className='w-[100%]'>
            <div className='mx-auto w-full max-w-md'></div>
          </div>
          <button
            className='btn btn-primary btn-solid mt-4 self-end'
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatroomVouchertModal;
