import React, { useContext, useState } from 'react';
import { Button } from '@mui/material';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { MyContext } from '../../App';
import { postData } from "../../utils/api"; 


const AddAddress = () => {

  const context = useContext(MyContext);

  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(true);

  const [formFields, setFormFields] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    status: true,
   
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(prev => ({ ...prev, [name]: value }));
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    setFormFields(prev => ({ ...prev, status: event.target.value }));
  };




const handleSubmit = async (e) => {
  e.preventDefault();

    if (!formFields.address_line1.trim()) {
      return context.openAlertBox("error", "Please enter address line");
    }
    if (!formFields.city.trim()) {
      return context.openAlertBox("error", "Please enter city");
    }
    if (!formFields.state.trim()) {
      return context.openAlertBox("error", "Please enter state");
    }
    if (!formFields.pincode.trim()) {
      return context.openAlertBox("error", "Please enter pincode");
    }
    if (!formFields.country.trim()) {
      return context.openAlertBox("error", "Please enter country");
    }
    // handleSubmit ke andar
if (!phone || String(phone).trim().length < 10) {
  return context.openAlertBox("error", "Please enter a valid mobile number");
}


     try {
    setIsLoading(true);

    const finalData = {
      ...formFields,
      mobile: phone,
      status: status,
    };

    const token = localStorage.getItem("accesstoken");

const response = await postData(
  "/api/address/add",
  finalData,
  {
    headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  }
);


    console.log("Add Address Response:", response); // ✅ debug

    setIsLoading(false);

    if (response && response.success) {
      context.openAlertBox("success", "Address Saved Successfully!");
      context.setRefreshAddress(prev => !prev);
      context.setIsOpenFullScreenPanel({ open:false });

      // form reset
      setFormFields({
        address_line1: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        mobile: "",
        status: true,
      });
      setPhone("");
      setStatus(true);

    } else {
      context.openAlertBox("error", response.message || "Something went wrong!");
    }

  } catch (err) {
    setIsLoading(false);
    
  }
};


  return (
    <section className='p-5 bg-gray-50'>
      <form onSubmit={handleSubmit} className="form py-3 p-8 bg-white shadow rounded">

        {/* GRID 1: 2 Columns */}
        <div className="grid grid-cols-2 gap-6 my-4">

          <div>
            <h3 className='text-sm font-medium mb-1 text-black'>Address Line</h3>
            <input
              type="text"
              name="address_line1"
              value={formFields.address_line1}
              onChange={onChangeInput}
              placeholder="House No, Street, Area"
              className='w-full h-[40px] p-3 border border-gray-300 rounded-sm text-sm'
            />
          </div>

          <div>
            <h3 className='text-sm font-medium mb-1 text-black'>City</h3>
            <input
              type="text"
              name="city"
              value={formFields.city}
              onChange={onChangeInput}
              className='w-full h-[40px] p-3 border border-gray-300 rounded-sm text-sm'
            />
          </div>

        </div>

        {/* GRID 2: 3 Columns */}
        <div className="grid grid-cols-3 gap-6">

          <div>
            <h3 className='text-sm font-medium mb-1 text-black'>State</h3>
            <input
              type="text"
              name="state"
              value={formFields.state}
              onChange={onChangeInput}
              className='w-full h-[40px] p-3 border border-gray-300 rounded-sm text-sm'
            />
          </div>

          <div>
            <h3 className='text-sm font-medium mb-1 text-black'>Pincode</h3>
            <input
              type="text"
              name="pincode"
              value={formFields.pincode}
              onChange={onChangeInput}
              className='w-full h-[40px] p-3 border border-gray-300 rounded-sm text-sm'
            />
          </div>

          <div>
            <h3 className='text-sm font-medium mb-1 text-black'>Country</h3>
            <input
              type="text"
              name="country"
              value={formFields.country}
              onChange={onChangeInput}
              className='w-full h-[40px] p-3 border border-gray-300 rounded-sm text-sm'
            />
          </div>

          <div className="col-span-2">
            <h3 className='text-sm font-medium mb-1 text-black'>Mobile Number</h3>
            <PhoneInput
              defaultCountry="in"
              value={phone}
              disabled={isLoading}
              className="w-full"
              onChange={(value) => {
                setPhone(value);
                setFormFields(prev => ({ ...prev, mobile: value }));
              }}
            />
          </div>

          <div>
            <h3 className='text-sm font-medium mb-1 text-black'>Status</h3>
            <Select
              value={status}
              onChange={handleChangeStatus}
              size='small'
              className="w-full"
            >
              <MenuItem value={true}>Active</MenuItem>
              <MenuItem value={false}>Inactive</MenuItem>
            </Select>
          </div>

        </div>

        <div className="w-[250px] mt-8">
          <Button
            type="submit"
            className="btn-blue btn-lg w-full flex gap-2 !bg-blue-600 !text-white"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Address"}
          </Button>
        </div>

      </form>
    </section>
  );
};

export default AddAddress;
