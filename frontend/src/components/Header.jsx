import React, { useContext, useEffect, useState } from "react";
import Logo from "./Logo";
import { IoMdSearch } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import summaryAPI from "../utils/summaryAPIs";
import { toast } from "react-hot-toast";
import axios from "axios";
import { setUserDetails } from "../reduxStore/userSlice";
import { ROLES } from "../utils/role";
import Context from "../contextAPI/contextIndex";

const Header = () => {
  const [profileMenu,setProfileMenu]=useState(false)
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const context=useContext(Context)
  const [searchText,setSearchText]=useState()
  const navigate=useNavigate()

  const handleLogout = async (e) => {
    try {
      const res = await axios.get(summaryAPI.logout.URL, {
        withCredentials: true,
      });
      //console.log(res.data.success);
      if (res.data.success) {
        toast.success(res.data.message);
        //window.location.reload();
        dispatch(setUserDetails(""));
      }
      if (res.error) {
        toast.success(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch=(e)=>{
    const {value}=e.target
    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate('/search')
    }

  }

  return (
    <header className="h-16 shadow-md  bg-white  mb-2 rounded-md sticky top-0 z-20  " >
      <div className=" h-full container mx-auto flex items-center px-2 justify-between ">
        <div>
          <Link to={"/"}>
            <Logo w={100} h={60} />
            <p className="text-xs font-semibold pl-2 text-yellow-500 -mt-5">Electronic Mart</p>
          </Link>
        </div>

        <div className="hidden lg:flex justify-between max-w-sm items-center border rounded-full pl-2 focus-within:shadow-lg ">
          <input
            type="text"
            placeholder="serach..."
            className=" w-full outline-none  "
        
            onChange={(e)=>handleSearch(e)}
          />
          <div className=" text-white min-w-[50px] h-8 bg-yellow-400 rounded-r-full flex items-center justify-center">
            <IoMdSearch size={25} />
          </div>
        </div>

        <div className="flex gap-8">
          {
            user?._id && 
            (
              <div className="relative  flex justify-center" onClick={()=>setProfileMenu(!profileMenu)}>
            <div className=" cursor-pointer ">
              {user?.profilePicture ? (
                <img
                  src={user?.profilePicture}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <FaRegUserCircle size={25} />
              )}
            </div>
            
            {
              profileMenu &&
              (
                <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded ">
              <nav>
                {
                  user?.role === ROLES.Admin && 
                  ( <Link to={'/adminPanel'} className="whitespace-nowrap p-2 rounded hover:bg-slate-200 hidden md:block " onClick={()=>setProfileMenu(!profileMenu)}>Admin Panel</Link>)
                }
               
              </nav>
            </div>
          
              )
              
            }
            </div>

            )
          }
          <div>
            {
              user?._id && 
              <Link to={'/cart'} className=" relative cursor-pointer ">
              <span>
                <FaShoppingCart size={25} />
              </span>
              
              <div className="bg-yellow-400 rounded-full h-5 w-5 flex items-center justify-center text-sm text-white absolute -top-2 -right-3">
                <p>{context?.cartProductCount}</p>
              </div>
            </Link>
            }
          </div>

          <div>
            {user?._id ? (
              <Link to={"/login"}>
                <button
                  className="text-lg text-white bg-yellow-400 px-2 rounded-full  hover:bg-yellow-500 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </Link>
            ) : (
              <Link to={"/login"}>
                <button className="text-lg text-white bg-yellow-400 px-2 rounded-full  hover:bg-yellow-500 cursor-pointer">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
Header;
