import axios from 'axios';
import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useRouter } from 'next/navigation';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedId: number | string | null;
  confirmationText: string;
  itemType: string;
  vendorId?: string;
}

const DeleteModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  selectedId,
  confirmationText,
  itemType,
  vendorId,
}) => {
  const [isLoading, setLoading] = useState(true);
  const [headerText, setHeaderText] = useState('');
  const router = useRouter();

  const headerTextMap: { [key: string]: string } = {
    voucher: 'Delete Voucher?',
    vendor: 'Delete Vendor?',
  };

  useEffect(() => {
    if (selectedId) {
      setLoading(false);
      setHeaderText(headerTextMap[itemType] || 'Confirm Delete?');
    }
  }, [selectedId, itemType, headerTextMap]);

  if (!isOpen || !selectedId) return null;

  const handleDelete = async () => {
    try {
      const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT ?? '';
      if (!endpoint) {
        throw new Error('API endpoint is not defined.');
      }
      switch (itemType) {
        case 'voucher':
          await axios.delete(`${endpoint}/vouchers/${selectedId}`);
          alert('Voucher deleted successfully!');
          router.push(`/admin/vendors/${vendorId}`);
          break;
        case 'vendor':
          await axios.delete(`${endpoint}/vendors/${selectedId}`);
          alert('Vendor deleted successfully!');
          router.push(`/admin/vendors`);
          break;
        default:
          throw new Error('Invalid itemType.');
      }
      onClose();
    } catch (error) {
      console.error(`Error deleting ${itemType}:`, error);
      alert(`Failed to delete ${itemType}. Please try again.`);
    }
  };

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
          <div className='sm:pb-4items-center justify-center border-gray-700 bg-gray-600 px-4 py-3 sm:p-6'>
            {isLoading ? (
              <Skeleton height={40} count={5} />
            ) : (
              <>
                <div className='justify-center sm:flex'>
                  <div className='m-4 text-center'>
                    <h3
                      className='mb-4 text-3xl font-bold leading-6 text-gray-200'
                      id='modal-headline'
                    >
                      {headerText}
                    </h3>
                    <div className='mt-6'>
                      <p className='my-2 text-sm text-gray-200'>
                        {`Are you sure you want to delete ${confirmationText}?`}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className='justify-evenly bg-gray-600 pb-4 pt-2 sm:flex sm:px-3'>
            <button
              onClick={onClose}
              type='button'
              className='btn btn-secondary btn-solid'
            >
              No
            </button>
            <button
              onClick={handleDelete}
              type='button'
              className='btn btn-delete'
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
