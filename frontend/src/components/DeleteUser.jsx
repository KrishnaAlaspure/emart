import axios from 'axios';
import React from 'react'
import { IoClose } from "react-icons/io5";
import summaryAPI from '../utils/summaryAPIs';

const DeleteUser = ({userID,name,onClose,getAllUser}) => {

  const handleDelete=async()=>{
      try {
        const res = await axios.delete(`${summaryAPI.deleteUser.URL}/`+userID,{
          withCredentials: true,
        })

        console.log(res.data);
        onClose()
        getAllUser()
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <div className="fixed bottom-0 top-0 left-0 right-0 w-full h-full z-10 flex items-center justify-center bg-slate-100 bg-opacity-40">
      <div className="mx-auto bg-white shadow-md p-2 w-full rounded-lg max-w-sm text-center ">
      <form action="">

      <button className="block ml-auto text-xl" onClick={onClose} >
        <IoClose/>
        </button>
        <h1 className='m-2'>{`${name} is being deleted`}</h1>
      <button className='bg-red-600 text-lg text-white px-1 rounded-xl cursor-pointer  max-w-[100px] hover:bg-red-800 hover:scale-110 transition-all ' onClick={handleDelete}>
                        Delete
                    </button>

      </form>
      </div>
    </div>
  )
}

export default DeleteUser
