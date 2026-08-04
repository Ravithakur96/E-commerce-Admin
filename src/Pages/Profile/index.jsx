import React, { useContext, useEffect, useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MyContext } from '../../App';

import { Button, CircularProgress, TextField } from '@mui/material';
import {
  editData,
  fetchDataFromApi,
  postData,
  uploadImage,
} from '../../utils/api';

import { useNavigate } from 'react-router-dom';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { Collapse } from 'react-collapse';

const Profile = () => {
      const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);


      const [isLoading, setIsLoading] = useState(false);
      const [isLoading2, setIsLoading2] = useState(false);
      const [userId, setUserId] = useState("");
      const [isChangePasswordFormShow, setIsChangePasswordFormShow] = useState(false);
      const [phone, setPhone] = useState('');
      const [addresses, setAddresses] = useState([]);
      const [selectedAddressId, setSelectedAddressId] = useState(null);

  
      const [formFields, setFormFields] = useState({ 
          name:"",
          email: "",
          mobile: "" });
  
          const [changePassword, setChangePassword] = useState({ 
            email: "",
          oldPassword:"",
          newPassword: "",
          confirmPassword: "" });
  
  
      const context = useContext(MyContext);
      const navigate  = useNavigate();

const getAddresses = async () => {
  try {
    const res = await fetchDataFromApi("/api/address");
    if (res?.success) {
      setAddresses(res.data);

      // Set default address on fetch
      const defaultAddr = res.data.find(addr => addr.isDefault);
      if (defaultAddr) {
        setSelectedAddressId(defaultAddr._id);  // <-- set default selected address
      } else if (res.data.length > 0) {
        setSelectedAddressId(res.data[0]._id); // fallback: first address
      }

    } else {
      setAddresses([]);
      setSelectedAddressId(null);
    }
  } catch (error) {
    console.log(error);
    setAddresses([]);
    setSelectedAddressId(null);
  }
};


      useEffect(()=>{
  
      const token = localStorage.getItem("accesstoken")
      if(token===null){
          navigate ('/login');
      }
  
      },[])
  
      useEffect(()=>{
          if(context?.userData?._id !== "" && context?.userData?._id !== undefined){
              setUserId(context?.userData?._id);
              setFormFields({
                  name:context?.userData?.name,
                  email:context?.userData?.email,
                  mobile:context?.userData?.mobile
              })

              setPhone(String(context?.userData?.mobile || ""));

  
              setChangePassword({
                email:context?.userData?.email
              })
          }
      },[context?.userData])

      useEffect(() => {
  if (context?.userData?._id) {
    getAddresses();
  }
}, [context?.userData]);

useEffect(() => {
  getAddresses();
}, [context.refreshAddress]);


  
      const onChangeInput = (e) => {
  const { name, value } = e.target;
  setFormFields(prev => ({ ...prev, [name]: value }));
  // update changePassword only if key exists there
  if (["email", "oldPassword", "newPassword", "confirmPassword"].includes(name)) {
    setChangePassword(prev => ({ ...prev, [name]: value }));
  }
};

  
    const validValue = Object.values(formFields).every(
    (el) => String(el).trim() !== ""
  );









  
    const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
  
    if (!formFields.name.trim()) {
      return context?.openAlertBox("error", "Please enter your full name");
    }
    if (!formFields.email.trim()) {
      return context?.openAlertBox("error", "Please enter your email id");
    }
    if (!String(formFields.mobile).trim()) {
      return context?.openAlertBox("error", "Please enter your mobile number");
    }
  
    try {
      setIsLoading(true);
  
      const response = await editData(
        `/api/user/${userId}`,
        formFields,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`
          },
          withCredentials: true
        }
      );
  
      setIsLoading(false);
  
      if (response && !response.error) {
        context?.openAlertBox("success", response?.message || "Profile updated!");
  
        setFormFields({
          name: response?.data?.user?.name || formFields.name,
          email: response?.data?.user?.email || formFields.email,
          mobile: response?.data?.user?.mobile || formFields.mobile
        });
  
  
        context.setUserData({
          name: response?.data?.user?.name,
          email: response?.data?.user?.email,
          mobile: response?.data?.user?.mobile
        });
  
      } else {
        context?.openAlertBox("error", response?.message || "Enter Valid details!");
      }
  
    } catch (err) {
      console.error("Error:", err);
      setIsLoading(false);
      context?.openAlertBox("error", "Something went wrong!");
    }
  };
  
 const validValue2 = Object.values(changePassword).every(
  (el) => el !== null && el !== undefined && String(el).trim() !== ""
);

  
const handleSubmitChangePassword = async (e) => {
  e.preventDefault();
  if (isLoading2) return;

  // Basic client-side validation
  if (!String(changePassword.oldPassword || "").trim()) {
    return context?.openAlertBox("error", "Please enter your old password");
  }
  if (!String(changePassword.newPassword || "").trim()) {
    return context?.openAlertBox("error", "Please enter your new password");
  }
  if (!String(changePassword.confirmPassword || "").trim()) {
    return context?.openAlertBox("error", "Please enter your confirm password");
  }
  if (changePassword.confirmPassword !== changePassword.newPassword) {
    return context?.openAlertBox("error", "Password and confirm password do not match");
  }

  try {
    setIsLoading2(true);

    // Ensure all payload fields are strings and include email
    const payload = {
      email: String(changePassword.email || context?.userData?.email || ""),
      oldPassword: String(changePassword.oldPassword),
      newPassword: String(changePassword.newPassword),
      confirmPassword: String(changePassword.confirmPassword)
    };

    // DEBUG: log payload (remove in production)
    console.log("Change password payload:", payload);

    const response = await postData(
      `/api/user/reset-password`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`
        },
        withCredentials: true
      }
    );

    // DEBUG: log server response to inspect what backend returns
    console.log("Change password response:", response);

    setIsLoading2(false);

    // Adjust this condition based on your backend's response shape.
    // Many APIs use response.success or response.error; inspect and adapt if needed.
    if (response && !response.error) {
      // Prefer server message if provided
      context?.openAlertBox("success", response?.message || "Password changed successfully!");
      // Optionally clear password fields
      setChangePassword(prev => ({
        ...prev,
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      }));
    } else {
      // If server sends message, show it — otherwise show fallback
      context?.openAlertBox("error", response?.message || "Old password is wrong or change failed!");
    }
  } catch (err) {
    console.error("Error:", err);
    setIsLoading2(false);
    context?.openAlertBox("error", "Something went wrong!");
  }
};





  useEffect(() => {
  if (context?.userData?.avatar) {
  setPreviews([context.userData.avatar]);
}

}, [context?.userData]);

  const onChangeFile = async (e, apiEndPointer) => {
    try {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      setUploading(true);

      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (
          file &&
          (file.type === "image/jpeg" ||
            file.type === "image/jpg" ||
            file.type === "image/png" ||
            file.type === "image/webp")
        ) {
          formData.append("avatar", file);
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

      if (res?.data?.avatar) {
  setPreviews([res.data.avatar]);

 
 context.setUserData(prev => ({
  ...prev,
  avatar: res.data.avatar
}));


  context?.openAlertBox("success", "Avatar updated successfully!");
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
    <>
    <div className="card px-4 py-4 !my-4 w-[65%] shadow-md sm:rounded-lg bg-white">
       <div className='flex items-center justify-between'>
         <h2 className="text-[18px] font-[600] !px-5 ">
                    User Profile
                    
                </h2>


                 <Button className='!ml-auto' onClick={() => setIsChangePasswordFormShow(!isChangePasswordFormShow)}>
  Change Password
</Button>
       </div>

                <br/>

                 <div className="w-[110px] h-[110px] rounded-full overflow-hidden !mb-4 relative group flex items-center justify-center bg-gray-200">

          {uploading ? (
  <CircularProgress color="inherit" />
) : (
  <>
    {previews.length !== 0 ? (
      previews.map((img, index) => (
        <img
          src={img}
          key={index}
          className="w-full h-full object-cover"
          alt="avatar"
        />
      ))
    ) : (
      <img
        src={"/user_image.jpg"}
        className="w-full h-full object-cover"
        alt="default avatar"
      />
    )}
  </>
)}


          <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100">
            <FaCloudUploadAlt className="text-[#fff] text-[25px]" />
            <input
              type="file"
              className="absolute top-0 left-0 w-full h-full opacity-0"
              accept="image/*"
              onChange={(e) => onChangeFile(e, "/api/user/user-avatar")}
              name="avatar"
            />
          </div>
        </div>

     

         <form className='form !mt-8' onSubmit={handleSubmit}>
                <div className="flex items-center gap-5">
                <div className="w-[50%]">
                  <input type="text" className='w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm' name="name"
                  value={formFields.name}
                  disabled={isLoading}  onChange={onChangeInput}/>
               
                </div>

                <div className="w-[50%]">
                  <input type="email" className='w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm' name="email"
                  value={formFields.email}
                  disabled={true}  onChange={onChangeInput}/>
                </div>
              
                </div>

                <div className="flex items-center gap-5 !mt-4 mb-4">
                <div className="w-[50%]">
                  <PhoneInput
  defaultCountry="in"
  value={phone || ""}
  disabled={isLoading}
  className="w-full"
  onChange={(phone) => {
    const ph = String(phone || "");
    setPhone(ph);
    setFormFields(prev => ({
      ...prev,
      mobile: ph
    }));
  }}
/>

                </div>
                </div>

                <div
  className="
    flex items-center justify-center 
    p-5 
    border border-dashed border-gray-300 
    bg-[#f9f9f9] 
    rounded-md 
    cursor-pointer 
    hover:bg-gray-200 
    transition-all
  "
 onClick={()=>context.setIsOpenFullScreenPanel({
                    open:true,
                    model:"Add New Address"
                  })}>
  <span className="text-[14px] text-gray-600">+ Add Address</span>
</div>


<div className="mt-4 space-y-3">
  {addresses.map((addr) => (
    <div
      key={addr._id}
      onClick={() => setSelectedAddressId(addr._id)}
      className={`border p-3 rounded-md flex gap-3 cursor-pointer
        ${selectedAddressId === addr._id
          ? "border-blue-500 bg-blue-50"
          : "bg-gray-50"}
      `}
    >
      <input
        type="radio"
        checked={selectedAddressId === addr._id}
        onChange={() => setSelectedAddressId(addr._id)}
      />

      <div>
        <p className="font-medium">{addr.address_line1}</p>
        <p className="text-sm text-gray-600">
          {addr.city}, {addr.state} - {addr.pincode}
        </p>
        <p className="text-sm text-gray-600">{addr.country}</p>
        <p className="text-sm text-gray-600">📞 {addr.mobile}</p>

        {addr.isDefault && (
          <span className="text-xs text-green-600 font-semibold">
            Default Address
          </span>
        )}
      </div>
    </div>
  ))}
</div>




                <br/>

                <div className="flex items-center gap-4">
                    <Button type='submit' disabled={!validValue || isLoading} className='btn-blue btn-lg w-full '>

                        {isLoading ? (
                                            <CircularProgress size={22} color="inherit" />
                                          ) : (
                                            "Update Profile"
                                          )}
                    </Button>
                    
                </div>
                </form>
    </div>


    <Collapse isOpened ={isChangePasswordFormShow}>
                <div className="card w-[65%] bg-white !p-5 shadow-md rounded-md">
                    <div className="flex items-center !pb-3">
                      <h2 className='text-[18px] font-[600]  !pb-0'>Change Password</h2>
                      
                    </div>
                    <hr/>
    
    
                    <form className='!mt-8' onSubmit={handleSubmitChangePassword}>
                    <div className="flex items-center gap-5">
                    <div className="w-[50%]">
                    <TextField  label="Old Password" variant="outlined" size='small' className='w-full'  name="oldPassword"
                      value={changePassword.oldPassword || ""}
                      disabled={isLoading2}  onChange={onChangeInput}/>
                    </div>
    
                    <div className="w-[50%]">
                    <TextField type='text'  label="New Password" variant="outlined" size='small' className='w-full'  name="newPassword"
                      value={changePassword.newPassword || ""}
                        onChange={onChangeInput}/>
                    </div>
                   
                    </div>
    
                    <div className="flex items-center gap-5 !mt-4">
                    <div className="w-[50%]">
                    <TextField  label="Confirm Password" variant="outlined" size='small' className='w-full'  name="confirmPassword"
                      value={changePassword.confirmPassword || ""}
                       onChange={onChangeInput}/>
                    </div>
                    </div>
    
    
                    <br/>
                    <div className="flex items-center gap-4">
                        <Button type='submit' disabled={!validValue2 || isLoading} className='btn-blue btn-lg w-[100%] '>
    
                            {isLoading2 ? (
                                                <CircularProgress size={22} color="inherit" />
                                              ) : (
                                                "Change Password"
                                              )}
                        </Button>
                        
                    </div>
                    </form>
                    </div></Collapse>
    </>
  );
}

export default Profile;
