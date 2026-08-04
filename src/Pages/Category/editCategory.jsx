import React, { useContext, useEffect, useState } from 'react';
import UploadBox from '../../Components/UploadBox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from 'react-icons/io';
import { Button } from '@mui/material';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { deleteImages, editData, fetchDataFromApi, postData } from '../../utils/api';
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';


const EditCategory = () => {
  const [formFields, setFormFields] = useState({
    name: '',
    images: [],
  });

  const [previews, setPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
 const context = useContext(MyContext);

useEffect(() => {
  const id = context?.isOpenFullScreenPanel?.id;

  if (!id) return;

  fetchDataFromApi(`/api/category/${id}`).then((res) => {
    if (res?.success) {
      setFormFields({
        name: res.category.name,
        images: res.category.images,
      });
      setPreviews(res.category.images);
    }
  });
}, [context?.isOpenFullScreenPanel?.id]);



  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(prev => ({
      ...prev,
      [name]: value,
    }));
  };

const removeImage = async (index) => {
  const imageUrl = previews[index];
  try {
    await deleteImages(imageUrl);
    
    setTimeout(() => {
      setPreviews(prev => prev.filter((_, i) => i !== index));
    }, 1000);
  } catch (err) {
    console.error("Error deleting image:", err);
  }
};






  const setPreviewsFun = (previewsArr) => {
    setPreviews(previewsArr);
  };

useEffect(() => {
  setFormFields(prev => ({
    ...prev,
    images: previews
  }));
}, [previews]);


const handleSubmit = async (e) => {
  e.preventDefault();

  if (isLoading) return; // 🔥 prevent double submit
  setIsLoading(true);

  try {
    if (!formFields.name.trim()) {
      context?.openAlertBox("error", "Category name is required.");
      return;
    }

    if (formFields.images.length === 0) {
      context?.openAlertBox("error", "At least one category image is required.");
      return;
    }

 editData(`/api/category/${context?.isOpenFullScreenPanel?.id}`, formFields).then((res)=>{
    setTimeout(() => {
      context.setIsOpenFullScreenPanel({
                open: false,
                model: "Add New Category",
              }); 
    }, 1500);
    })

    

  } catch (error) {
    console.error(error);
    context?.openAlertBox("error", "Something went wrong");
  } finally {
    setIsLoading(false); // 🔥 always stop loading
  }
};


  return (
    <section className="p-5 bg-gray-50">
      <form className="form py-3 p-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 mb-3">
          <div className="col w-[25%]">
            <h3 className="text-[14px] font-[500] mb-1 text-black">
              Category Name
            </h3>
            <input
              type="text"
              name="name"
              value={formFields.name}
              onChange={onChangeInput}
              className="w-full h-[40px] p-3 border rounded-sm text-sm"
            />
          </div>
        </div>

        <h3 className="text-[18px] font-[500] mb-2">Category Image</h3>

        <div className="grid grid-cols-7 gap-4">
          {previews.map((img, index) => (
            <div key={index} className="relative">
              <span
               
                className="absolute -top-1 -right-1 bg-red-600
                w-5 h-5 rounded-full flex items-center justify-center cursor-pointer" onClick={() => removeImage(index)}
              >
                <IoMdClose className="text-white text-sm" />
              </span>

              <div className="h-[150px] border rounded-md overflow-hidden">
                <img
                  src={img}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}

          <UploadBox
            multiple={true}
            name="images"
            url="/api/category/uploadImages"
            setPreviews={setPreviewsFun}
          />
        </div>

        <div className="w-[250px] mt-6">
          <Button
  type="submit"
  disabled={isLoading}
  className="btn-blue w-full flex gap-2"
>

            {
isLoading ? <CircularProgress size={20} color="inherit" /> :
<>
<FaCloudUploadAlt className="text-white text-xl" />
            Publish and View
</>
            }
            
          </Button>
        </div>
      </form>
    </section>
  );
};

export default EditCategory;
