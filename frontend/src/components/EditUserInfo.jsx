import React, { useState } from "react";
import { ROLES } from "../utils/role";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import summaryAPI from "../utils/summaryAPIs";

const EditUserInfo = ({userID,name,email,role,onClose,getAllUser}) => {
    const [updateUserID,setUpdateUserID]=useState(userID)
    const [updateName,setUpdateName]=useState(name)
    const [updateEmail,setUpdateEmail]=useState(email)
    const [updateRole,setUpdateRole]=useState(role)



    const handleUpdate=async()=>{
        //console.log(updateUserID,updateName,updateEmail,updateRole);

        const res= await axios.put(`${summaryAPI.updateUserInfo.URL}`,{updateUserID,updateName,updateEmail,updateRole},{
            withCredentials: true,
          })

          console.log(res.data.success);
          onClose()
          getAllUser()
    }
  return (
    <div className="fixed bottom-0 top-0 left-0 right-0 w-full h-full z-10 flex items-center justify-center bg-slate-100 bg-opacity-40">
      <div className="mx-auto bg-white shadow-md p-2 w-full rounded-lg max-w-sm text-center ">

        <button className="block ml-auto text-xl" onClick={onClose}>
        <IoClose/>
        </button>

        <>

        <h1>Update User Info</h1>
        
        <div className=" m-2">
          <label>Name : </label>
          <input type="text" className=" outline-none bg-slate-300 rounded-md"
          value={updateName}
          onChange={(e)=>setUpdateName(e.target.value)}
          />
        </div>
        <div className="m-2">
          <label>Email : </label>
          <input type="text" className=" outline-none bg-slate-300 rounded-md"
          value={updateEmail}
          onChange={(e)=>setUpdateEmail(e.target.value)}
          />
        </div>
        <div className="m-2">
        <label htmlFor="">Select Role </label>
        <select name="" id="" className=" border " value={updateRole} onChange={(e)=>setUpdateRole(e.target.value) }>
          {Object.values(ROLES).map((role, index) => {
            return (
              <option value={role}  key={index} className=" outline-none bg-slate-300 rounded-md" >
                {role}
              </option>
            );
          })}
        </select>
        </div>
        <button className='bg-yellow-400 text-lg text-white px-1 rounded-xl cursor-pointer  max-w-[150px] hover:bg-yellow-500 hover:scale-110 transition-all ' onClick={handleUpdate}>
                      Update
                  </button>

        </>
        
      </div>
    </div>
  );
};

export default EditUserInfo;
