import React, { useEffect, useState } from "react";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import UploadProduct from "../components/UploadProduct";
import axios from "axios";
import summaryAPI from "../utils/summaryAPIs";
import AdminProductCart from "../components/AdminProductCart";

const AllProducts = () => {
  const [uploadProduct,setUploadProduct]=useState(false)
  const [allProducts,setAllProducts]=useState()


  const getAllProducts=async()=>{
    const res=await axios.get(`${summaryAPI.getAllProducts.URL}`,{
      withCredentials:true
    })

    console.log(res.data.data);
    setAllProducts(res.data.data)
  }

  useEffect(()=>{
    getAllProducts()
  },[])
  return (
    <div>
      <div className="bg-white py-1 px-2  flex justify-between items-center">
        <h1 className="text-black font-bold text-xl">All Products</h1>
        <div className="flex items-center justify-between">
          <h1 className=" text-md mr-4">Add New Product</h1>
          <button className="text-lg hover:bg-slate-200 rounded-full p-1" onClick={()=>setUploadProduct(!uploadProduct)}>
            <MdOutlineAddCircleOutline size={28} />
          </button>
        </div>
      </div>
        <div className="flex flex-wrap items-center gap-4 px-2 py-4 w-full h-[calc(100vh-200px)] overflow-y-scroll scrollbar ">
          {
              allProducts?.map((product,index)=>{
                return(
                  <AdminProductCart data={product} key={index} getAllProducts={getAllProducts}/>
                )
              })
          }

        </div>

      {
          uploadProduct &&
          <UploadProduct onClose={()=>setUploadProduct(!uploadProduct)} getAllProducts={getAllProducts}/>
      }
    </div>
  );
};

export default AllProducts;
