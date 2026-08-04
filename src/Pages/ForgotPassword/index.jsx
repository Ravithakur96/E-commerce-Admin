import React, { useContext } from 'react';
import TextField from '@mui/material/TextField';
import  Button  from '@mui/material/Button';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import {useState} from 'react';
import {  useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import { CircularProgress } from '@mui/material';
import { postData } from '../../utils/api';

 

const ForgotPassword = () => {

    const[isShowPassword, setIsShowPassword] = useState(false); 
    const[isShowPassword2, setIsShowPassword2] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const[formFields, setFormFields]= useState({
        email: localStorage.getItem("userEmail"),
        newPassword:'',
        confirmPassword:''
    });

    const context = useContext(MyContext)
    const history = useNavigate();



    const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

const validValue = Object.values(formFields).every((el) => el.trim() !== "");

const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    if (!formFields.newPassword) {
     context?.openAlertBox("error", "Please enter new password");
      setIsLoading(false);
      return false;
    }

    if (!formFields.confirmPassword) {
         context?.openAlertBox("error", "Please enter confirm password");
      setIsLoading(false);
      return false;
    }

    if (formFields.confirmPassword !== formFields.newPassword) {
      context?.openAlertBox("error", "Please enter confirm password not match");
      setIsLoading(false);
      return false;
    }


    postData(`/api/user/reset-password`,formFields).then((res)=>{
        if(res?.error===false){
        localStorage.removeItem("userEmail")
        localStorage.removeItem("actionType")
        context.openAlertBox("success",res?.message)
        setIsLoading(false)
        history('/login')
        }
        else{
            context.openAlertBox("error",res?.message)
        }
    })
    


  };


    return (
    <div>
    <section className='section !py-10'> 
    <div className="container">
        <div className="card shadow-ms w-[400px] !m-auto rounded-md bg-white !p-5 !px-10">
            <h3 className='text-center text-[18px]  text-black'>Forgot Password</h3>
                
                <form className='w-full !mt-5' onSubmit={handleSubmit}>
                    <div className="form-group w-full !mb-5 relative">
                        <TextField 
                        id="password"
                        type={isShowPassword===false ? 'password' : 'text'}
                         label="New Password *" 
                        variant="outlined"
                        className="w-full"
                        name="newPassword"
                        onChange={onChangeInput}
                        value={formFields.newPassword}
                  disabled={isLoading}
                        />

                        <Button className='!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black' onClick={()=>setIsShowPassword(!isShowPassword)}>
                            {
                            isShowPassword===false ? <IoMdEye className='text-[20px] opacity-75'/> : <IoMdEyeOff className='text-[20px] opacity-75'/>
                            }
                            </Button>
                    </div>

                    <div className="form-group w-full !mb-5 relative">
                        <TextField id="confirm_password"
                        type={isShowPassword2===false ? 'password' : 'text'}
                         label="Confirm Password *" 
                        variant="outlined"
                        className="w-full"
                        name="confirmPassword"
                        onChange={onChangeInput}
                        value={formFields.confirmPassword}
                        disabled={isLoading}
                        />
                        <Button className='!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black' onClick={()=>setIsShowPassword2(!isShowPassword2)}>
                            {
                            isShowPassword2===false ? <IoMdEye className='text-[20px] opacity-75'/> : <IoMdEyeOff className='text-[20px] opacity-75'/>
                            }
                            </Button>
                    </div>

                    

                    <div className="flex items-center w-full !mt-3 !mb-3">
                <Button
                  type="submit"
                  disabled={!validValue || isLoading}
                  className="btn-org btn-lg w-full flex gap-3 justify-center"
                >
                  {isLoading ? (
                    <CircularProgress size={22} color="inherit" />
                  ) : (
                    "Change Password"
                  )}
                </Button>
              </div>
                    
                </form>
        </div>
        </div>
    </section>
    </div>
    );
}

export default ForgotPassword;
