import { useRef } from 'react';
import { IoMdAdd} from 'react-icons/io';
import { RxCross2 } from "react-icons/rx";

interface UploadImageProps {
  image: string | undefined | null; 
  setImage: (base64Image : string | null) => void;
}



const ImageUploaderCard : React.FC<UploadImageProps> = ({image , setImage}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleImageClick = () =>{
      inputRef.current?.click();
  }

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

  const handleImageChange = async (event : React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0] as File;
    const base64Image = await convertBase64(file);
    console.log(base64Image)
    setImage(base64Image)
  }
  
  const clearImage = () => {
    setImage(null);
  }
  
  return (
    <div className='relative w-[220px] h-[100%]'>
    <div onClick={handleImageClick} className='cursor-pointer w-[220px] h-[100%]'>  
        <div className='image-uploader-card-container ' >
          {image ?  
          <img className="rounded-xl w-full h-full object-cover" src={image} alt=""/> :   <IoMdAdd className='text-[50px] image-uploader-icon'/>}
        </div>
        <input className='hidden' type="file" ref={inputRef} onChange={handleImageChange} />
    </div>
        {image && <div title="Remove this image" onClick={clearImage} className='image-remover'>
          <RxCross2 className='text-[15px] image-remover-icon'/>
          </div>}
    </div>
  );
};

export default ImageUploaderCard;