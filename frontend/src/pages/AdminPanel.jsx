import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ROLES } from "../utils/role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate=useNavigate()

  useEffect(()=>{
    if(user?.role != ROLES.Admin)
      {
        navigate('/')
      }
  },[user])
  return (
    <div className="min-h-[calc(100vh-105px)] md:flex hidden mr-2 ">


      <aside className="bg-white min-h-full w-full max-w-60 rounded shadow-[0_0px_5px_0px_rgba(0,0,0,0.2)] ">
        <div className="h-36  flex justify-center items-center flex-col border-b-2 ">
          <div className=" cursor-pointer relative flex justify-center text-4xl pt-2">
            {user?.profilePicture ? (
              <img
                src={user?.profilePicture}
                alt={user?.name}
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <FaRegUserCircle size={55} />
            )}
          </div>
          <div className=" whitespace-nowrap flex items-center justify-center flex-col">
            <p className="text-lg font-medium">{user?.name}</p>
            <p>{user?.role}</p>

          </div>
        </div>

        {/* Menu */}
        <div>
          <ul>
            <Link to={'allUsers'}><li className="text-lg hover:bg-slate-200 p-2 cursor-pointer ">All Users</li></Link>
            <Link to={'allProducts'}><li className="text-lg hover:bg-slate-200 p-2 cursor-pointer ">All Products</li></Link>
            <Link to={'/'}><li className="text-lg hover:bg-slate-200 p-2 cursor-pointer ">Logout Admin Panel</li></Link>
          </ul>

        </div>

      </aside>



      <main className="w-full h-full  mt-0">
        
        <Outlet/>
      </main>
    </div>
  );
};

export default AdminPanel;
