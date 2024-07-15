import axios from "axios";
import React, { useEffect, useState } from "react";
import summaryAPI from "../utils/summaryAPIs";
import moment from 'moment';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import ChangeRole from "../components/EditUserInfo";
import DeleteUser from "../components/DeleteUser";
import { ROLES } from "../utils/role";
import EditUserInfo from "../components/EditUserInfo";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [updateUser,setUpdateUser]=useState()
  const [clickEdit,setClickEdit]=useState()
  const [clickDelete,setClickDelete]=useState(false)

  

  const getAllUser = async () => {
    try {
      const res = await axios.get(summaryAPI.allUser.URL, {
        withCredentials: true,
      });
      setAllUsers(res.data.data)
      //console.log("from all users", allUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div className="">
      <table className="w-full my-2 divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                  >
                    Account Created On 
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                  >
                    Action 
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
               {
                allUsers.map((user,index)=>{
                  return(
                    
                    <tr key={index}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap text-center">
                    {index+1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap text-center">{user?.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
                    {user?.email}
                  </td>
                  <td className="px-6 py-4 text-sm  text-gray-800 text-center whitespace-nowrap">
                    
                      {user?.role}
                    
                  </td>
                  <td className="px-6 py-4 text-sm  text-gray-800 text-center whitespace-nowrap">
                    
                    {moment(user?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                  
                  </td>
                  <td className="px-6 py-4 text-sm font-medium  whitespace-nowrap flex text-center items-center justify-center">
                    <p className="text-green-500 p-1 hover:text-green-800  hover:bg-slate-300 rounded-full cursor-pointer" 
                     onClick={()=>{setClickEdit(!clickEdit); setUpdateUser(user)}}
                    >
                      <MdEdit size={20}/> </p>
                     <span className="text-gray-500">&nbsp;&nbsp;</span>
                    <p className="text-red-500 p-1 hover:text-red-800  hover:bg-slate-300 rounded-full cursor-pointer" 
                    onClick={()=>{setClickDelete(!clickDelete);setUpdateUser(user)}}
                    > 
                    <MdDelete size={22} /></p>
                  </td>
                </tr>
                  
                  )
                })
               }
              </tbody>
            </table>
            {
              clickEdit && 
              <EditUserInfo 
              userID={updateUser?._id}
              name={updateUser?.name}
              email={updateUser?.email}
              role={updateUser?.role}
              onClose={()=>setClickEdit(!clickEdit)}
              getAllUser={getAllUser}

              />
            }
            {
              clickDelete &&
              <DeleteUser 
              userID={updateUser?._id}
              name={updateUser?.name}
              onClose={()=>setClickDelete(!clickDelete)}
              getAllUser={getAllUser}
              />
            }
            
      </div>
  );
};

export default AllUsers;
