import { useRef } from 'react';
import { IoMdAdd} from 'react-icons/io';
import { RxCross2 } from "react-icons/rx";

interface UploadImageProps {
  image: File | undefined | null; 
  setImage: (file : File | null) => void;
}



const ImageUploaderCard : React.FC<UploadImageProps> = ({image , setImage}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleImageClick = () =>{
      inputRef.current?.click();
  }

  const handleImageChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0] as File;
    console.log(file);
    console.log(new Blob([file as BlobPart],{type: file?.type}))
    setImage(file)
  }
  
  const clearImage = () => {
    setImage(null);
  }
  return (
    <div className='relative w-[220px] h-[100%]'>
    <div onClick={handleImageClick} className='cursor-pointer w-[220px] h-[100%]'>  
        <div className='image-uploader-card-container ' >
          {image ?  
          <img className="rounded-xl w-full h-full object-cover" src={URL.createObjectURL(image)} alt=""/> :   <IoMdAdd className='text-[50px] image-uploader-icon'/>}
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