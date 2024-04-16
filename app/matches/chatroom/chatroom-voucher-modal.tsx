import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Passion } from '@/models/passion';
import { Vendor } from '@/models/vendor';
import { Voucher } from '@/models/voucher';

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
  const [reportedReason, setReportedReason] = useState<string>('');
  const [vendors, setVendors] = useState<any[]>([]);
  const [vouchers, setVouchers] = useState<any[]>([]);

  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT ?? '';

  useEffect(() => {
    if (!isOpen) return;

    console.log(passionIdList);
    const passionIdsQueryParam = passionIdList.join(',');
    const fetchVendorList = async () => {
      try {
        const response = await fetch(
          `${endpoint}/vendors/byPassionIds?passionIds=${passionIdsQueryParam}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch vendors');
        }

        const vendorsData = await response.json();
        setVendors(vendorsData);
        const vouchersData = vendorsData.map((vendor: any) => vendor.vouchers);
        setVouchers(vouchersData.flat());
        console.log('Vouchers:', vouchersData);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };

    fetchVendorList();
  }, [isOpen, passionIdList]);

  const handleVoucherRedeem = () => {
    alert('Voucher Redeemed!');
  };

  if (!isOpen) return <></>;

  return (
    <div className='fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-gray-500 bg-opacity-50'>
      <div className='w-[70%] rounded-lg bg-white p-6 text-center'>
        <div className='flex flex-col items-center justify-between '>
          <h2 className='mb-3 text-xl font-bold'>
            Kickstart your date with a sponsored voucher!
          </h2>
          <div>
            {vouchers.map((voucher, index) => (
              <div
                className='m-1 flex w-[30rem] justify-between rounded-lg border border-gray-700 bg-gray-500 p-2 px-4 pt-2 shadow-md'
                key={index}
              >
                <div className='flex w-[20rem] flex-col items-center'>
                  <label className='font-semibold text-gray-200'>
                    {voucher.voucherName}
                  </label>
                  <label className='font-extralight text-gray-200'>
                    {voucher.voucherAmount}
                    {voucher.voucherType.voucherTypeDesc == 'Discount'
                      ? '%'
                      : ''}{' '}
                    {voucher.voucherType.voucherTypeDesc}
                  </label>
                </div>
                <button
                  onClick={handleVoucherRedeem}
                  className='btn btn-secondary mb-1 justify-end'
                >
                  Redeem
                </button>
              </div>
            ))}
          </div>
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
