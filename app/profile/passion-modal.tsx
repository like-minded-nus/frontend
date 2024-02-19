import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Passion } from '@/models/passion';

interface ModalProps {
  isOpen: boolean;
  onClose: (passionsNameList: string[]) => void;
  selectedPassion: number[];
  togglePassion: (passionId: number) => void;
  passionNames: string[];
}

const PassionModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  selectedPassion,
  togglePassion,
  passionNames,
}) => {
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT ?? '';

  const [passionOptions, setPassionOptions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [passionsNameList, setPassionsNameList] = useState<string[]>([]);

  useEffect(() => {
    setPassionsNameList(passionNames);

    fetch(`${endpoint}/passion`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        setPassionOptions(data.payload.passionList);
        setLoading(false);
      });
  }, [endpoint, passionNames]);

  if (!isOpen) return <></>;

  const togglePassionNames = (passionName: string) => {
    if (passionsNameList.includes(passionName)) {
      setPassionsNameList(passionsNameList.filter((n) => n !== passionName));
    } else {
      setPassionsNameList([...passionsNameList, passionName]);
    }
  };

  return (
    <div className='fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-gray-500 bg-opacity-50'>
      <div className='w-[30%] rounded-lg bg-white p-6 text-center'>
        <div className='flex flex-col items-center justify-between '>
          <h2 className='text-xl font-bold'>Passions</h2>
          <p className='mb-8'>
            Share your passions with everyone by adding them to your profile.
          </p>
          <div className='w-[100%]'>
            {isLoading && (
              <Skeleton
                count={8}
                borderRadius={50}
                height={30}
                style={{ marginBottom: '.6rem' }}
              />
            )}
            {!isLoading &&
              passionOptions.map((passion: Passion) => (
                <button
                  className={`btn mx-2 my-2 ${
                    selectedPassion.includes(passion.passionId)
                      ? 'btn-secondary'
                      : 'btn-primary'
                  }`}
                  onClick={() => {
                    togglePassion(passion.passionId);
                    togglePassionNames(passion.passionName);
                  }}
                  key={passion.passionId}
                >
                  {passion.passionName}
                </button>
              ))}
          </div>
          <button
            className='btn btn-primary btn-solid self-end'
            onClick={() => onClose(passionsNameList)}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default PassionModal;
