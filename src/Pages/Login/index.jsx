import React, { useContext, useState } from 'react';
import { CgLogIn } from 'react-icons/cg';
import { FaEyeSlash, FaRegUser } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import { FaRegEye } from 'react-icons/fa6';


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {  useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import { CircularProgress } from "@mui/material";
import { postData } from '../../utils/api';

const Login = () => {
  const context = useContext(MyContext);
  const history = useNavigate();

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


  const [formFields, setFormFields] = useState({ email: "", password: "" });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const validValue = Object.values(formFields).every((el) => el.trim() !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (!formFields.email.trim()) {
      return context?.openAlertBox("error", "Please enter your email id");
    }
    if (!formFields.password.trim()) {
      return context?.openAlertBox("error", "Please enter your password");
    }

    try {
      setIsLoading(true);
      const response = await postData("/api/user/login", formFields, { withCredentials: true });
      console.log("Login Response:", response);
      setIsLoading(false);

      if (response && !response.error) {
        context?.openAlertBox("success", response?.message || "Logged in successfully!");
        setFormFields({ email: "", password: "" });

        localStorage.setItem('accesstoken', response?.data?.accesstoken);
        localStorage.setItem('refreshtoken', response?.data?.refreshtoken);

        const userEmail = response?.data?.user?.email || formFields.email;
        const userName = response?.data?.user?.name || "user";

        context.setUserData({ name: userName, email: userEmail });
        localStorage.setItem("userEmail", userEmail);

        context.setIsLogin(true);
        history("/");
      } else {
        context?.openAlertBox("error", response?.message || "Enter Valid details!");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setIsLoading(false);
      context?.openAlertBox("error", "Something went wrong!");
    }
  };

  const ForgotPassword = () => {
    if(formFields.email===""){
      context.openAlertBox("error","Please enter email id");
      return false;
    }

    else{
      context.openAlertBox("success",`OTP send to ${formFields.email}`);
      localStorage.setItem("userEmail",formFields.email);
      localStorage.setItem("actionType",'forgot-password');


      postData("/api/user/forgot-password",{
            email:formFields.email,
            }).then((res)=>{
            if(res?.error===false){
            context.openAlertBox("succcess", res?.message);
            history('/verifyEmail')
            }else{
            context.openAlertBox("error", res?.message);
            }
        })

    }
  };

  return (
    <div>
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
        <span className='text-[#3872ff]'>Sign in with your credentials.</span>
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

<form className='w-full px-8 mt-3' onSubmit={handleSubmit}>
        <div className="form-group mb-4 w-full">
            <h4 className='text-[14px] font-[500] mb-1'>Email</h4>
            <TextField
                  id="email"
                  type="email"
                  label="Email Id *"
                  name="email"
                  value={formFields.email}
                  disabled={isLoading}
                  variant="outlined"
                   className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
                  onChange={onChangeInput}
                />
        </div>





               <div className="form-group mb-4 w-full">
  <h4 className='text-[14px] font-[500] mb-1'>Password</h4>

  <div className="relative w-full">
    <TextField
      id="password"
      type={isPasswordShow ? 'text' : 'password'}
      label="Password *"
      variant="outlined"
      name="password"
      value={formFields.password}
      disabled={isLoading}
      onChange={onChangeInput}
      className="w-full"
    />

    <Button
      type="button"
      onClick={() => setIsPasswordShow(!isPasswordShow)}
      className="!absolute top-[10px] right-[10px] !min-w-[35px] !w-[35px] !h-[35px] !rounded-full"
    >
      {isPasswordShow ? (
        <FaEyeSlash className="text-[18px]" />
      ) : (
        <FaRegEye className="text-[18px]" />
      )}
    </Button>
  </div>
</div>




            
              {/* forgot Password */}


              <div className="form-group mb-4 w-full flex items-center justify-between">
            <FormControlLabel
            control={<Checkbox defaultChecked />} label="Remember Me" />
            <Link className='text-[#3872ff] font-[700] texy-[15px] hover:underline hover:text-gray-700' onClick={ForgotPassword}>forgot Password ?</Link>
        </div>



            

              

              {/* Login Button */}
              <div className="flex items-center w-full !mt-3 !mb-3">
                <Button
                  type="submit"
                  disabled={!validValue || isLoading}
                  className="btn-blue btn-lg w-full"
                >
                  {isLoading ? (
                    <CircularProgress size={22} color="inherit" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>

            
            
            </form>
          </div>
      </section>
      </div>

  );
};

export default Login;
