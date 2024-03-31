import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaEdit } from 'react-icons/fa';
import Link from 'next/link';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVoucher: Voucher | null;
}

interface Voucher {
  voucherId: string;
  voucherName: string;
  voucherEndDate: string;
  voucherDescription: string;
}

const VoucherModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  selectedVoucher,
}) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedVoucher) {
      setLoading(false);
    }
  }, [selectedVoucher]);

  if (!isOpen || !selectedVoucher) return null;

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      <div className='flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0'>
        <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
          <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
        </div>
        <span
          className='hidden sm:inline-block sm:h-screen sm:align-middle'
          aria-hidden='true'
        >
          &#8203;
        </span>
        <div
          className='inline-block transform overflow-hidden rounded-lg border-gray-700 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle'
          role='dialog'
          aria-modal='true'
          aria-labelledby='modal-headline'
        >
          <Link
            href={`/admin/vendors/2/edit_voucher?selectedVoucher=${JSON.stringify(selectedVoucher)}`}
          >
            <button className='btn-square btn-secondary absolute right-0 top-2 mr-2 '>
              <FaEdit />
            </button>
          </Link>
          <div className='sm:pb-4items-center justify-center border-gray-700 bg-gray-600 px-4 py-3 sm:p-6'>
            {isLoading ? (
              <Skeleton height={40} count={5} />
            ) : (
              <>
                <div className='justify-center sm:flex'>
                  <div className='m-4 text-center'>
                    <h3
                      className='mb-4 text-3xl font-semibold leading-6 text-gray-300'
                      id='modal-headline'
                    >
                      {selectedVoucher.voucherName}
                    </h3>
                    <div className='mt-6'>
                      <p className='my-2 text-sm text-gray-200'>
                        Id: {selectedVoucher.voucherId}
                      </p>
                      <p className='my-2 text-sm text-gray-200'>
                        End Date: {selectedVoucher.voucherEndDate}
                      </p>
                      <p className='text-sm text-gray-200'>
                        Description: {selectedVoucher.voucherDescription}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className='bg-gray-600 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-3'>
            <button
              onClick={onClose}
              type='button'
              className='btn btn-secondary btn-solid'
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherModal;
