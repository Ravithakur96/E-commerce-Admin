import React, { useContext, useState } from 'react';
import './App.css'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import Header from './Components/Header'
import Sidebar from './Components/Sidebar';
import { createContext } from 'react';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Products from './Pages/Products';
import Button from "@mui/material/Button";
import Slide from '@mui/material/Slide';

import HomeSliderBanners from './Pages/HomeSliderBanners';

import Category from './Pages/Category';
import SubCategoryList from './Pages/Category/SubCatList';
import Users from './Pages/Users';
import Orders from './Pages/Orders';
import ForgotPassword from './Pages/ForgotPassword';
import VerifyAccount from './Pages/VerifyAccount';
import ChangePassword from './Pages/ChangePassword';
import  { useEffect} from "react";

import toast, { Toaster } from "react-hot-toast";
import { fetchDataFromApi } from "./utils/api";
import Profile from './Pages/Profile';
import ProductDetails from './Pages/Products/productDetails';
import AddRAMS from './Pages/Products/addRAMs';
import AddWEIGHT from './Pages/Products/addWEIGHT';
import AddSIZE from './Pages/Products/addSIZE';
export const MyContext = createContext();




const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function App() {
 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
    const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
    open:false,
    model:'',
    id:""
  })



  const [userData, setUserData] = useState(null);
  const [openCartPanel, setOpenCartPanel] = useState(false);
  const [catData, setCatData] = useState([]);



  const toggleCartPanel = (newOpen) => () => {
    setOpenCartPanel(newOpen);
  };


  const openAlertBox = (status, msg) => {
    if (status === "success") toast.success(msg);
    else if (status === "error") toast.error(msg);
  };


  

useEffect(() => {
  const token = localStorage.getItem("accesstoken");


  if (token) {
    setIsLogin(true);

fetchDataFromApi("/api/user/user-details")
  .then((res) => {
    if (res && res.success) {
      setUserData(res.data || res.success);
      setIsLogin(true);
    } else {
      localStorage.removeItem("accesstoken");
      setUserData(null);
      setIsLogin(false);
    }
  })

      .catch((err) => {
        console.error("Error fetching user details:", err);
        setIsLogin(false);
        setUserData(null);
      });
  } else {
    setIsLogin(false);
    setUserData(null);
  }
}, []);


useEffect(()=>{
  fetchDataFromApi("/api/category").then((res) => {
    setCatData(res.data);
  });
}, []);

useEffect(()=>{
  getCat();
},[])

const getCat = () =>{
  fetchDataFromApi("/api/category").then((res) => {
    setCatData(res?.data);
  });
}

 const values = {

    setOpenCartPanel,
    toggleCartPanel,
    openCartPanel,
    openAlertBox,
    isLogin,
    setIsLogin,
    userData,
    setUserData,
    isSidebarOpen,
    setIsSidebarOpen,
    isOpenFullScreenPanel,
    setIsOpenFullScreenPanel,
    catData,
    setCatData,  
    getCat,
  };


  const router =  createBrowserRouter([
    {
      path :'/',
      exact:true,
      element:<>
    <section className="main">
    <Header/>
    <div className="contentMain flex">
      <div className={`overflow-hidden sidebarWrapper transition-all duration-300 
  ${isSidebarOpen ? 'w-[18%] opacity-100' : 'w-0 opacity-0'}`}>
  <Sidebar/>
</div>

      <div className={`contentRight !py-4 !px-5 ${isSidebarOpen==false ?  'w-[100%]' : 'w-[82%]'} transition-all`}>
        <Dashboard/>
      </div>
    </div>
    </section>
    </>
  },
  {
      path :'/login',
      exact:true,
      element:<>
   <Login/>
    </>
  },
  {
      path :'/sign-up',
      exact:true,
      element:<>
   <SignUp/>
    </>
  },
  {
      path :'/products',
      exact:true,
      element:<>
    <section className="main">
    <Header/>
    <div className="contentMain flex">
      <div className={`overflow-hidden sidebarWrapper transition-all duration-300 
  ${isSidebarOpen ? 'w-[18%] opacity-100' : 'w-0 opacity-0'}`}>
  <Sidebar/>
</div>

      <div className={`contentRight !py-4 !px-5 ${isSidebarOpen==false ?  'w-[100%]' : 'w-[82%]'} transition-all`}>
        <Products/>
      </div>
    </div>
    </section>
    </>
  },
  {
      path :'/forgot-password',
      exact:true,
      element:<>
    <ForgotPassword/>
    </>
  },
  {
      path :'/verifyEmail',
      exact:true,
      element:<>
    <VerifyAccount/>
    </>
  },
  {
      path :'/change-password',
      exact:true,
      element:<>
    <ChangePassword/>
    </>
  },
  {
      path :'/homeSlider/list',
      exact:true,
      element:<>
    <section className="main">
    <Header/>
    <div className="contentMain flex">
      <div className={`overflow-hidden sidebarWrapper transition-all duration-300 
  ${isSidebarOpen ? 'w-[18%] opacity-100' : 'w-0 opacity-0'}`}>
  <Sidebar/>
</div>

      <div className={`contentRight !py-4 !px-5 ${isSidebarOpen==false ?  'w-[100%]' : 'w-[82%]'} transition-all`}>
        <HomeSliderBanners/>
      </div>
    </div>
    </section>
    </>
  },
  {
      path :'/category/list',
      exact:true,
      element:<>
    <section className="main">
    <Header/>
    <div className="contentMain flex">
      <div className={`overflow-hidden sidebarWrapper transition-all duration-300 
  ${isSidebarOpen ? 'w-[18%] opacity-100' : 'w-0 opacity-0'}`}>
  <Sidebar/>
</div>

      <div className={`contentRight !py-4 !px-5 ${isSidebarOpen==false ?  'w-[100%]' : 'w-[82%]'} transition-all`}>
        <Category/>
      </div>
    </div>
    </section>
    </>
  },
  {
      path :'/subcategory/list',
      exact:true,
      element:<>
    <section className="main">
    <Header/>
    <div className="contentMain flex">
      <div className={`overflow-hidden sidebarWrapper transition-all duration-300 
  ${isSidebarOpen ? 'w-[18%] opacity-100' : 'w-0 opacity-0'}`}>
  <Sidebar/>
</div>

      <div className={`contentRight !py-4 !px-5 ${isSidebarOpen==false ?  'w-[100%]' : 'w-[82%]'} transition-all`}>
        <SubCategoryList/>
      </div>
    </div>
    </section>
    </>
  },
  {
      path :'/users',
      exact:true,
      element:<>
    <section className="main">
    <Header/>
    <div className="contentMain flex">
      <div className={`overflow-hidden sidebarWrapper transition-all duration-300 
  ${isSidebarOpen ? 'w-[18%] opacity-100' : 'w-0 opacity-0'}`}>
  <Sidebar/>
</div>

      <div className={`contentRight !py-4 !px-5 ${isSidebarOpen==false ?  'w-[100%]' : 'w-[82%]'} transition-all`}>
        <Users/>
      </div>
    </div>
    </section>
    </>
  },
  {
      path :'/orders',
      exact:true,
      element:<>
    <section className="main">
    <Header/>
    <div className="contentMain flex">
      <div className={`overflow-hidden sidebarWrapper transition-all duration-300 
  ${isSidebarOpen ? 'w-[18%] opacity-100' : 'w-0 opacity-0'}`}>
  <Sidebar/>
</div>

      <div className={`contentRight !py-4 !px-5 ${isSidebarOpen==false ?  'w-[100%]' : 'w-[82%]'} transition-all`}>
        <Orders/>
      </div>
    </div>
    </section>
    </>
  },
  {
      path :'/profile',
      exact:true,
      element:<>
    <section className="main">
    <Header/>
    <div className="contentMain flex">
      <div className={`overflow-hidden sidebarWrapper transition-all duration-300 
  ${isSidebarOpen ? 'w-[18%] opacity-100' : 'w-0 opacity-0'}`}>
  <Sidebar/>
</div>

      <div className={`contentRight !py-4 !px-5 ${isSidebarOpen==false ?  'w-[100%]' : 'w-[82%]'} transition-all`}>
        <Profile/>
      </div>
    </div>
    </section>
    </>
  },
  {
      path :'/product/:id',
      exact:true,
      element:<>
    <section className="main">
    <Header/>
    <div className="contentMain flex">
      <div className={`overflow-hidden sidebarWrapper transition-all duration-300 
  ${isSidebarOpen ? 'w-[18%] opacity-100' : 'w-0 opacity-0'}`}>
  <Sidebar/>
</div>

      <div className={`contentRight !py-4 !px-5 ${isSidebarOpen==false ?  'w-[100%]' : 'w-[82%]'} transition-all`}>
        <ProductDetails/>
      </div>
    </div>
    </section>
    </>
  },
  {
      path :'/product/addRams',
      exact:true,
      element:<>
    <section className="main">
    <Header/>
    <div className="contentMain flex">
      <div className={`overflow-hidden sidebarWrapper transition-all duration-300 
  ${isSidebarOpen ? 'w-[18%] opacity-100' : 'w-0 opacity-0'}`}>
  <Sidebar/>
</div>

      <div className={`contentRight !py-4 !px-5 ${isSidebarOpen==false ?  'w-[100%]' : 'w-[82%]'} transition-all`}>
        <AddRAMS/>
      </div>
    </div>
    </section>
    </>
  },
  {
      path :'/product/addWeight',
      exact:true,
      element:<>
    <section className="main">
    <Header/>
    <div className="contentMain flex">
      <div className={`overflow-hidden sidebarWrapper transition-all duration-300 
  ${isSidebarOpen ? 'w-[18%] opacity-100' : 'w-0 opacity-0'}`}>
  <Sidebar/>
</div>

      <div className={`contentRight !py-4 !px-5 ${isSidebarOpen==false ?  'w-[100%]' : 'w-[82%]'} transition-all`}>
        <AddWEIGHT/>
      </div>
    </div>
    </section>
    </>
  },
    {
      path :'/product/addSIZE',
      exact:true,
      element:<>
    <section className="main">
    <Header/>
    <div className="contentMain flex">
      <div className={`overflow-hidden sidebarWrapper transition-all duration-300 
  ${isSidebarOpen ? 'w-[18%] opacity-100' : 'w-0 opacity-0'}`}>
  <Sidebar/>
</div>

      <div className={`contentRight !py-4 !px-5 ${isSidebarOpen==false ?  'w-[100%]' : 'w-[82%]'} transition-all`}>
        <AddSIZE/>
      </div>
    </div>
    </section>
    </>
  },
]);


  return (
    <>




    

        <Toaster position="top-center" reverseOrder={false} />





    <MyContext.Provider value={values}>
    <RouterProvider router={router} />
    



    




    </MyContext.Provider>
    </>
  )
}

export default App;
