import React, { useState } from "react";
import AdminEditProductDetails from "./AdminEditProductDetails";
import AdminProductDelete from "./AdminProductDelete";
import { MdCurrencyRupee } from "react-icons/md";
import IndianCurrencyConverter from "../helper/IndianCurrencyConverter";



const AdminProductCart = ({ data,getAllProducts }) => {
  const [editProduct, setEditProduct] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [pId, setPId] = useState(false)

  return (
    <div className="bg-white p-4 rounded ">
      <div className=" w-40">
       <div className="grid justify-center items-center" >
         <div className="w-32 h-32 items-center  ">
            <img
                  src={data?.productImage[0]}
                  className="rounded mx-auto object-fill h-full  "
                  alt=""
                />
         </div>
        <p className=" truncate  ">{data?.productName}</p>
        </div>
          <div className=" flex items-center justify-center pb-1">
            {
              IndianCurrencyConverter(data?.price)
            }
          </div>
          <div className="flex items-center justify-center gap-2">
          <button
            className="bg-green-500 text-lg text-white px-2 rounded-xl cursor-pointer hover:bg-green-600 hover:scale-110 transition-all "
            onClick={() => {setEditProduct(!editProduct),setPId(data?._id)}}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-lg text-white px-2 rounded-xl cursor-pointer hover:bg-red-600 hover:scale-110 transition-all "
            onClick={() => {setDeleteProduct(!deleteProduct),setPId(data?._id)}}
          >
            Delete
          </button>
        </div>
      </div>
      {
        editProduct && 
        <AdminEditProductDetails propData={data} pid={pId} getAllProducts={getAllProducts}
        onClose={() => setEditProduct(!editProduct)}
      />
      }
      {
        deleteProduct &&
        <AdminProductDelete pid={pId} getAllProducts={getAllProducts}
        onClose={() => setDeleteProduct(!deleteProduct)}
        />
       }
    </div>
  );
};

export default AdminProductCart;
