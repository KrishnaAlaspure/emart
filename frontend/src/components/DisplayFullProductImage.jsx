import React from 'react'
import { IoClose } from "react-icons/io5";


const DisplayFullProductImage = ({imgurl,onClose}) => {
  return (
    <div className="fixed bottom-0 top-0 left-0 right-0 w-full h-full z-10 flex items-center justify-center bg-slate-100 bg-opacity-40">
        <div className="mx-auto bg-white shadow-md p-2 w-full h-full rounded-lg max-w-3xl max-h-[80%] text-center overflow-hidden ">
        <button className="block ml-auto text-2xl mb-2" onClick={onClose} >
        <IoClose/>
        </button>
      <img src={imgurl} alt="imgurl"  className='w-full h-full'/>
      </div>
    </div>
  )
}

export default DisplayFullProductImage
