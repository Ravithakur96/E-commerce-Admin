import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { FaRegBell } from "react-icons/fa";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { FaRegUser } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { MyContext } from '../../App';
import { useContext } from 'react';
import { MdMenuOpen } from 'react-icons/md';
import { RiMenu2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IoMdClose } from 'react-icons/io';
import { fetchDataFromApi } from '../../utils/api';
import AddProduct from '../../Pages/Products/addProduct';
import AddCategory from '../../Pages/Category/addCategory';
import AddSubCategory from '../../Pages/Category/addSubCategory';
import AddAddress from '../../Pages/address/addAddress';
import EditCategory from '../../Pages/Category/editCategory';
import { Slide } from '@mui/material';
import EditProduct from '../../Pages/Products/editProduct';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMyAcc = Boolean(anchorEl);
  

  const handleClickMyAcc = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMyAcc = () => {
    setAnchorEl(null);
  };

  const context = useContext(MyContext);
  const navigate = useNavigate();


   const logout = async () => {

      setAnchorEl(null);
      try {
        const token = localStorage.getItem("accesstoken");
        await fetchDataFromApi(`/api/user/logout?token=${token}`, { withCredentials: true });
  
        // clear local data
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("refreshtoken");
        localStorage.removeItem("userEmail");
  
        // reset context data
        context.setUserData(null);
        context.setIsLogin(false);
        context.openAlertBox("success", "Logout successful!");
  
        // redirect to login
        navigate("/login");
  
      } catch (error) {
        console.error("Logout error:", error);
        context.openAlertBox("error", "Something went wrong while logging out!");
      }
    };

  return (
    <>
    <header className={`w-full h-[auto] !py-2 ${context.isSidebarOpen===true ? '!pl-79' : 'pl-5'} shadow-md !pr-7 bg-[#fff] flex items-center justify-between transition-all fixed top-0 left-0 z-[50]`}>
      <div className="part1">
        <Button className='!w-[40px] !h-[40px] !rounded-full !min-w-[40px] text-[18px] !text-[rgba(0,0,0,0.8)]' onClick={()=>context.setIsSidebarOpen(!context.isSidebarOpen)} >
          {
            context.isSidebarOpen===true ? <RiMenu2Line className='text-[18px] text-[rgba(0,0,0,0.8)]' /> : <MdMenuOpen className='text-[18px] text-[rgba(0,0,0,0.8)]' />
          }
          </Button>
      </div>

      <div className="part2 w-[40%] flex items-center justify-end gap-5">
        <IconButton aria-label="cart">
      <StyledBadge badgeContent={4} color="secondary">
        <FaRegBell />
      </StyledBadge>
    </IconButton>

    {
      context.isLogin === true ? 

      <div className="relative">
        <div className="rounded-full w-[35px] h-[35px] overflow-hidden cusror-pointer" onClick={handleClickMyAcc}>
        <img src="https://ecme-react.themenate.net/img/avatars/thumb-1.jpg" className="w-full h-full object-cover"/>
      </div>

      


      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openMyAcc}
        onClose={handleCloseMyAcc}
        onClick={handleCloseMyAcc}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleCloseMyAcc} className='!bg-white'>
          <div className="flex items-center gap-3">
            <div className="rounded-full w-[35px] h-[35px] overflow-hidden cusror-pointer">
        <img src="https://ecme-react.themenate.net/img/avatars/thumb-1.jpg" className="w-full h-full object-cover"/>
      </div>

      <div className="info">
        <h3 className='text-[15px] font-[500] leading-5'>{context?.userData?.name}</h3>
        <p className='text-[12px] font-[400] opacity-70'>{context?.userData?.email || localStorage.getItem("userEmail")}</p>
      </div>
          </div>

        </MenuItem>
        <Divider/>
        <Link to='/profile'>
        <MenuItem onClick={handleCloseMyAcc} className='flex items-center gap-3'>
        <FaRegUser className='text-[16px]'/> <span className="text-[14px]">Profile</span>
        </MenuItem>
        </Link>


        <MenuItem onClick={logout} className='flex items-center gap-3'>
        <IoMdLogOut className='text-[18px]'/> <span className="text-[14px]">Sign Out</span>
        </MenuItem>

      </Menu>

      </div>

      :
<Link to="/sign-up">
      <Button className='btn-blue btn-sm !rounded-full'>Sign In</Button>
      </Link>
    }
    
      
      </div>
    </header>


     <Dialog
        fullScreen
        open={context?.isOpenFullScreenPanel.open}
        onClose={()=>context?.setIsOpenFullScreenPanel({
          open:false,
        })}
        slots={{
          transition: Transition,
        }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={()=>context?.setIsOpenFullScreenPanel({
          open:false,
        })}
              aria-label="close"
            >
              <IoMdClose className='text-gray-800'/>
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              <span className='text-gray-800'>{context?.isOpenFullScreenPanel?.model}</span>
            </Typography>
            
          </Toolbar>
        </AppBar>
        {context?.isOpenFullScreenPanel?.model=== "Add Product" && <AddProduct/>
        }

        {context?.isOpenFullScreenPanel?.model=== "Add Home Slide" && <AddHomeSlide/>
        }

        {context?.isOpenFullScreenPanel?.model=== "Add New Category" && <AddCategory/>
        }

        {context?.isOpenFullScreenPanel?.model=== "Add New Sub Category" && <AddSubCategory/>
        }

        {context?.isOpenFullScreenPanel?.model === "Add New Address" && <AddAddress />}
          
          {context?.isOpenFullScreenPanel?.model === "Edit Category" && <EditCategory />}

        {context?.isOpenFullScreenPanel?.model === "Edit Product" && <EditProduct />}
        


        


      </Dialog>
    </>
  );
}

export default Header;