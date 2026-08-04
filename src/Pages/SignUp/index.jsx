import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { CircularProgress } from "@mui/material";
import { postData } from "../../utils/api";
import { MyContext } from "../../App";

import { CgLogIn } from 'react-icons/cg';
import { FaEyeSlash, FaRegUser } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { BsFacebook } from 'react-icons/bs';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import { FaRegEye } from 'react-icons/fa6';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  

  const [loadingGoogle, setLoadingGoogle] = useState(false);
const [loadingFb, setLoadingFb] = useState(false);

const[isPasswordShow, setIsPasswordShow] = useState(false);

    function handleClickGoogle() {
    setLoadingGoogle(true);
  }

  function handleClickFb() {
    setLoadingFb(true);
  }


  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
  });

  const context = useContext(MyContext);
  const navigate = useNavigate();
 
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const validValue = Object.values(formFields).every((el) => el.trim() !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (!formFields.name.trim()) {
      return context.openAlertBox("error", "Please add full name");
    }
    if (!formFields.email.trim()) {
      return context.openAlertBox("error", "Please enter your email id");
    }
    if (!formFields.password.trim()) {
      return context.openAlertBox("error", "Please enter your password");
    }

    setIsLoading(true);
    const response = await postData("/api/user/sign-up", formFields);
    setIsLoading(false);

    if (response?.error !== true) {
      context.openAlertBox("success", response?.message || "Registered successfully!");
      localStorage.setItem("userEmail", formFields.email);
      setFormFields({
        name: "",
        email: "",
        password: "",
      });
      navigate("/verifyEmail");
    } else {
      context.openAlertBox("error", response?.message || "Registration failed!");
    }
  };

  return (
    <section className="bg-white w-full">


      <header className="w-full  fixed top-0 left-0 px-4 py-2 flex items-center justify-between z-50">
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
        <h1 className='text-center text-[35px] font-[800] mt-4'>Join us todat! Get special<br/>
        <span className='text-[#3872ff]'> benefits and stay up-to-date</span>
        </h1>


         <div className="flex items-center justify-center w-full mt-5 gap-4">
            <Button
          size="small"
          onClick={handleClickGoogle}
          endIcon={<FcGoogle />}
          loading={loadingGoogle}
          loadingPosition="end"
          variant="outlined"
          className='!bg-none !py-2 !text-[15px] !capitalize !px-5 !text-[rgba(0,0,0,0.7)]'
        >
          Signin with Google
        </Button>


        <Button
          size="small"
          onClick={handleClickFb}
          endIcon={<BsFacebook />}
          loading={loadingFb}
          loadingPosition="end"
          variant="outlined"
          className='!bg-none !py-2 !text-[15px] !capitalize !px-5 !text-[rgba(0,0,0,0.7)]'
        >
          Signin with Facebook
        </Button>
        </div>



        <br/>


        <div className="w-full flex items-center justify-center gap-3">
            <span className='flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]'></span>
            <span className='text-[14px] font-[500]'> or, Sign in with your email</span>
            <span className='flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]'></span>
        </div>

<br/>


          <form className="w-full px-8 mt-3" onSubmit={handleSubmit}>
            <div className="form-group mb-4 w-full">
              

              <TextField
                id="name"
                type="text"
                name="name"
                value={formFields.name}
                disabled={isLoading == true ? true : false}
                label="Full Name *"
                variant="outlined"
                className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
                onChange={onChangeInput}
              />
            </div>

            <div className="form-group mb-4 w-full">
              

              <TextField
                id="email"
                type="email"
                name="email"
                value={formFields.email}
                disabled={isLoading == true ? true : false}
                label="Email Id *"
                variant="outlined"
                className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
                onChange={onChangeInput}
              />
            </div>

            <div className="form-group mb-4 w-full relative">
              

              <TextField
                id="password"
                type={isPasswordShow ? "text" : "password"}
                label="Password *"
                name="password"
                value={formFields.password}
                disabled={isLoading == true ? true : false}
                variant="outlined"
                className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
                onChange={onChangeInput}
                
              />
              <Button
                type="button"
                className="!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px] !text-gray-600"
                onClick={() => setIsPasswordShow(!isPasswordShow)}
              >
                {
              isPasswordShow === false ? (
                <FaRegEye className='text-[18px]'/> 
              ) : (
                <FaEyeSlash className='text-[18px]'/> 
              )
              }



              </Button>
            </div>

            <div className="flex items-center w-full !mt-3 !mb-3">
              <Button
                type="submit"
                disabled={!validValue || isLoading}
                className="btn-blue btn-lg w-full"
              >
                {isLoading ? (
                  <CircularProgress size={22} color="inherit" />
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>

           
          </form>

      </div>
    </section>
  );
};

export default Register;
