import React, { useContext, useState } from 'react';

import 'react-lazy-load-image-component/src/effects/blur.css';

import { Button, CircularProgress } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MyContext } from '../../App';
import { postData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';


const AddSubCategory = () => {
  const context = useContext(MyContext);

  const [productCat, setProductCat] = useState('');
  const [productCat2, setProductCat2] = useState('');

  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const [formFields, setFormFields] = useState({
    name: '',
    parentCatName: null,
    parentId: null,
  });
  const history = useNavigate();

  const [formFields2, setFormFields2] = useState({
    name: '',
    parentCatName: null,
    parentId: null,
  });

  const handleChangeProductCat = (e) => {
    const id = e.target.value;
    setProductCat(id);

    const cat = context?.catData?.find(c => c._id === id);

    setFormFields(prev => ({
      ...prev,
      parentId: id,
      parentCatName: cat?.name || "",
    }));
  };

  const handleChangeProductCat2 = (e) => {
    const id = e.target.value;
    setProductCat2(id);

    context?.catData?.forEach(cat => {
      cat?.children?.forEach(child => {
        if (child._id === id) {
          setFormFields2(prev => ({
            ...prev,
            parentId: id,
            parentCatName: child.name,
          }));
        }
      });
    });
  };

  const onChangeInput = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const onChangeInput2 = (e) => {
    setFormFields2({ ...formFields2, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading1) return;
    setIsLoading1(true);

    try {
      if (!formFields.name.trim() || !formFields.parentId) {
        context.openAlertBox("error", "All fields required");
        return;
      }

      const res = await postData("/api/category/create", formFields);

      if (res?.success) {
        context.openAlertBox("success", "Sub Category created");
        setFormFields({ name: "", parentCatName: null, parentId: null });
        setProductCat("");
        context.getCat();
        history("/subcategory/list")
      }
    } finally {
      setIsLoading1(false);
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    if (isLoading2) return;
    setIsLoading2(true);

    try {
      if (!formFields2.name.trim() || !formFields2.parentId) {
        context.openAlertBox("error", "All fields required");
        return;
      }

      const res = await postData("/api/category/create", formFields2);

      if (res?.success) {
        context.openAlertBox("success", "Third Level Category created");
        setFormFields2({ name: "", parentCatName: null, parentId: null });
        setProductCat2("");
        context.getCat();
      }
    } finally {
      setIsLoading2(false);
    }
  };


  return (
    <section className='p-5 bg-gray-50 grid grid-cols-2 gap-10'>
    <form className="form py-3 p-8 " onSubmit={handleSubmit}>
      <h4 className='font-[600]'>Add Sub Category</h4>
      <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4">
<div className="grid grid-cols-2 mb-3 gap-5">
        <div className="col ">
            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Category</h3>
          <Select
          labelId="demo-simple-select-label"
          id="productCatDrop1"
          size="small"
          className='w-full'
          value={productCat}
          label="Age"
          onChange={handleChangeProductCat}
          
        >
          {
            context?.catData?.length!==0 && context?.catData?.map((item,index)=>{
              return(
                <MenuItem key={index} value={item?._id}>{item.name}</MenuItem>
              )
            })
          }
          
        </Select>
        </div>

        <div className="col">
            <h3 className='text-[14px] font-[500] mb-1 text-black'>Sub Category Name</h3>
            <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm' name='name' value={formFields.name} onChange={onChangeInput}/>
        </div>
        </div>
        <br/>

      </div>

 
      <div className="w-[250px]">
              <Button type="submit" className="btn-blue btn-lg w-full flex gap-2">
                 {
                isLoading1 ? <CircularProgress size={20} color="inherit" /> :
                <>
                <FaCloudUploadAlt className="text-white text-xl" />
                            Publish and View
                </>
                            }
                            
            </Button></div>
      </form>


      <form className="form py-3 p-8 " onSubmit={handleSubmit2}>
        <h4 className='font-[600]'>Add Third Level Category</h4>
      <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4">
<div className="grid grid-cols-2 mb-3 gap-5">
        <div className="col ">
            <h3 className='text-[14px] font-[500] mb-1 text-black'>SecondSubCategory</h3>
          <Select
          labelId="demo-simple-select-label"
          id="productCatDrop2"
          size="small"
          className='w-full'
          value={productCat2}
          label="Age"
          onChange={handleChangeProductCat2}
          
        >
          {
  context?.catData?.map((item) =>
    item?.children?.map((child, idx) => (
      <MenuItem key={idx} value={child._id}>
        {child.name}
      </MenuItem>
    ))
  )
}

          
        </Select>
        </div>

        <div className="col">
            <h3 className='text-[14px] font-[500] mb-1 text-black'>Sub Category Name</h3>
            <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm' name='name' value={formFields2.name} onChange={onChangeInput2}/>
        </div>
        </div>
        <br/>

      </div>

 
      <div className="w-[250px]">
              <Button type="submit" className="btn-blue btn-lg w-full flex gap-2">
                 {
                isLoading2 ? <CircularProgress size={20} color="inherit" /> :
                <>
                <FaCloudUploadAlt className="text-white text-xl" />
                            Publish and View
                </>
                            }
                            
            </Button></div>
      </form>


    </section>                            
  );
}

export default AddSubCategory;
