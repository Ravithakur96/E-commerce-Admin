
import React, { useState } from 'react';
import { CgLogIn } from 'react-icons/cg';
import { FaEyeSlash, FaRegUser } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import { FaRegEye } from 'react-icons/fa6';


const ChangePassword = () => {

const[isPasswordShow, setIsPasswordShow] = useState(false);
const[isPasswordShow2, setIsPasswordShow2] = useState(false);

return (
    <section className='bg-white w-full'>
        <header className="w-full fixed top-0 left-0 px-4 py-2 flex items-center justify-between z-50">
            <Link to="/"><img
              src="https://ecme-react.themenate.net/img/logo/logo-light-full.png"
              className="w-[120px]"
            /></Link>

            <div className="flex items-center gap-0">
                <NavLink to="/login" exact={true} activeClassName="isActive">
                <Button className='!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1'><CgLogIn className='text-[18px] '/> Login</Button>
                </NavLink>
                
                <NavLink to="/sign-up" exact={true} activeClassName="isActive">
                <Button className='!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1'><FaRegUser className='text-[15px] '/> Signup</Button></NavLink>
            </div>
        </header>
      <img src="/login_bgi.jpg" className='w-full fixed top-0 left-0 opacity-5'/>

      <div className="loginBox card w-[600px] h-[auto] pb-20 mx-auto mt-20 relative z-50">
        <div className="text-center ">
        <img src="/logo-light-streamline.png" className='m-auto w-[12%]'/>
        </div>
        <h1 className='text-center text-[35px] font-[800] mt-4'>Welcome Back! <br/>
        <span className='text-[#3872ff]'>You can change password from here.</span>
        </h1>


        <br/>

        <form className='w-full px-8 mt-3'>

        <div className="form-group mb-4 w-full">
            <h4 className='text-[14px] font-[500] mb-1'>New Password</h4>
            <div className="relative w-full">
              <input 
              type={isPasswordShow === false ? 'password' :'text'}
               className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"/>
            <Button className='!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px] !text-gray-600' onClick={()=>setIsPasswordShow(!isPasswordShow)}>
              {
              isPasswordShow === false ? (
                <FaRegEye className='text-[18px]'/> 
              ) : (
                <FaEyeSlash className='text-[18px]'/> 
              )
              }
              </Button>
            </div>
        </div>
        <div className="form-group mb-4 w-full">
            <h4 className='text-[14px] font-[500] mb-1'>Confirm Password</h4>
            <div className="relative w-full">
              <input 
              type={isPasswordShow2 === false ? 'password' :'text'}
               className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"/>
            <Button className='!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px] !text-gray-600' onClick={()=>setIsPasswordShow2(!isPasswordShow2)}>
              {
              isPasswordShow2 === false ? (
                <FaRegEye className='text-[18px]'/> 
              ) : (
                <FaEyeSlash className='text-[18px]'/> 
              )
              }
              </Button>
            </div>
        </div>
        <Button className='btn-blue btn-lg w-full '>Change Password</Button>
        </form>

      </div>
    </section>
);
}

export default ChangePassword;
