import { useEffect, useRef } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';

interface UploadImageProps {
  isUpdate: boolean;
  image: string | undefined | null;
  setImage: (base64Image: string | null) => void;
}

const ImageUploaderCard: React.FC<UploadImageProps> = ({
  isUpdate,
  image,
  setImage,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleImageClick = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    if (isUpdate && image) {
      setImage(`data:image/jpeg;base64,${image}`);
    }
  }, [isUpdate]);
  const convertBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      // Set onload event handler
      fileReader.onload = () => {
        resolve(fileReader.result as string);
      };

      // Set onerror event handler
      fileReader.onerror = (error) => {
        reject(error);
      };

      fileReader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event?.target?.files?.[0] as File;
    const base64Image = await convertBase64(file);
    console.log(base64Image);
    setImage(base64Image);
  };

  const clearImage = () => {
    setImage(null);
  };

  return (
    <div className='relative h-[100%] w-[220px]'>
      <div
        onClick={handleImageClick}
        className='h-[100%] w-[220px] cursor-pointer'
      >
        <div className='image-uploader-card-container '>
          {image ? (
            <img
              className='h-full w-full rounded-xl object-cover'
              src={image}
              alt=''
            />
          ) : (
            <IoMdAdd className='image-uploader-icon text-[50px]' />
          )}
        </div>
        <input
          className='hidden'
          type='file'
          ref={inputRef}
          onChange={handleImageChange}
        />
      </div>
      {image && (
        <div
          title='Remove this image'
          onClick={clearImage}
          className='image-remover'
        >
          <RxCross2 className='image-remover-icon text-[15px]' />
        </div>
      )}
    </div>
  );
};

export default ImageUploaderCard;
