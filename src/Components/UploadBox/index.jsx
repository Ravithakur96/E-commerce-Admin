import React, { useContext, useState } from 'react';
import { FaRegImages } from 'react-icons/fa';
import { MyContext } from '../../App';
import { uploadImage } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';

const UploadBox = (props) => {

    const [uploading, setUploading] = useState(false);

    const context = useContext(MyContext);


   const onChangeFile = async (e, apiEndPointer) => {
  try {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png" ||
        file.type === "image/webp"
      ) {
        formData.append("images", file); // ✅ correct
      } else {
        context?.openAlertBox(
          "error",
          "Please select a valid JPG, PNG, or WEBP image file."
        );
        setUploading(false);
        return;
      }
    }

    const res = await uploadImage(apiEndPointer, formData);
setUploading(false);


const images = res?.images || []; // 👈 FIXED

if (images.length > 0) {
  props.setPreviews(prev => [...prev, ...images]); // 👈 add to existing previews
  context?.openAlertBox("success", "Images uploaded successfully!");
} else {
  context?.openAlertBox("error", "Image upload failed!");
}



  } catch (error) {
    console.error(error);
    setUploading(false);
    context?.openAlertBox("error", "Something went wrong while uploading!");
  }
};



    return (
    <div>
    <div className="uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[170px] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative" >
        {
          uploading ===true ? <>
          <CircularProgress size={30} color="inherit" className={`absolute z-50 ${uploading ? '' : 'hidden'}`} />
          <h4 className='text-center'>Uploading</h4></>
           : <> <FaRegImages className='text-[40px] opacity-35 pointer-events-none'/>
        <h4 className='text-[14px] pointer-events-none'>
            Images Upload </h4>

            <input type="file" accept="image/*"  multiple={props.multiple!==undefined ? props.multiple : false} className='absolute top-0 left-0 w-full h-full z-50 opacity-0' onChange={(e) => onChangeFile(e, props?.url)}
              name="images"/>
          </>
        }
        
        
    </div>
    </div>
    );
}

export default UploadBox;
