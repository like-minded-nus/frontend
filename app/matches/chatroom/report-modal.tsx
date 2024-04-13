import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Passion } from '@/models/passion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportedUserId: string;
  reportedByUserId: number;
}

const ReportModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  reportedUserId,
  reportedByUserId,
}) => {
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT ?? '';

  const [reportedReason, setReportedReason] = useState<string>('');

  const reportUser = async () => {
    if (reportedReason === '') {
      onClose();
      return;
    }

    const body = {
      userId: reportedUserId,
      reportedReason: reportedReason,
      reportedBy: reportedByUserId,
    };

    const res = await fetch(`${endpoint}/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const resJson = await res.json();

    if (resJson.status != 200) {
      console.error(resJson.status + ' ' + resJson.message);
    } else {
      onClose();
      console.log('user reported!');
    }
  };

  if (!isOpen) return <></>;

  return (
    <div className='fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-gray-500 bg-opacity-50'>
      <div className='w-[30%] rounded-lg bg-white p-6 text-center'>
        <div className='flex flex-col items-center justify-between '>
          <h2 className='text-xl font-bold'>Reason for Reporting</h2>
          <div className='w-[100%]'>
            <div className='mx-auto w-full max-w-md'>
              <select
                id='reason'
                name='reason'
                value={reportedReason}
                onChange={(e) => setReportedReason(e.target.value)}
                className='mt-1 mt-4 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-indigo-500 sm:text-sm'
              >
                <option value=''>Select a reason</option>
                <option value='Inappropriate Behavior'>
                  Inappropriate Behavior
                </option>
                <option value='Harrassment Or Bullying'>
                  Harassment or Bullying
                </option>
                <option value='Scam or Fraud'>Scam or Fraud</option>
                <option value='Fake Profile'>Fake Profile</option>
                <option value='Spam'>Spam</option>
              </select>
            </div>
          </div>
          <button
            className='btn btn-primary btn-solid mt-4 self-end'
            onClick={() => reportUser()}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
