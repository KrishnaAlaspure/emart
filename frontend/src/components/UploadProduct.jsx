import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { productCategory } from "../utils/productCategory";
import { MdOutlineCloudUpload } from "react-icons/md";
import { uploadImage } from "../helper/uploadImage";
import DisplayFullProductImage from "./DisplayFullProductImage";
import axios from "axios";
import summaryAPI from '../utils/summaryAPIs';
import toast from 'react-hot-toast'

const UploadProduct = ({ onClose,getAllProducts }) => {

    const [data,setData]=useState({
        productName:"",
        brandName:"",
        category:"",
        productImage:"",
        description:"",
        price:"",
        sellingPrice:""
    })
    
    const [makeBigIMG,setMakeBigIMG]=useState(false)
    const [imgURLForBig,setImgURLForBig]=useState("")

    const handleAllOnChanges=(e)=>{
      const { name, value} = e.target

      setData((preve)=>{
        return{
          ...preve,
          [name]  : value
        }
      })
    }
    const handleUploadImageCloudinary=async(e)=>{
      const file =e.target.files[0]
      const uploadImageCloudinary=await uploadImage(file)
      console.log("uploaded img",uploadImageCloudinary);
      setData((pre)=>{
        return {
          ...pre,
          productImage:[...pre.productImage,uploadImageCloudinary.url]
        }
      })
    }

    const handleDeleteProductIMG=async(idx)=>{

      const newProductImage=[...data.productImage]
      newProductImage.splice(idx,1)
      setData((pre)=>{
        return {
          ...pre,
          productImage:[...newProductImage]
        }
      })


    }

    const handleUploadSubmit=async(e)=>{
      e.preventDefault()
      console.log(data);

      const res=await axios.post(`${summaryAPI.uploadProduct.URL}`,{data},{
        withCredentials: true
      })

      console.log(res.data.success);
      
      if(res.data.success){
        toast.success(res.data.message)
        onClose()
        getAllProducts()
      }

      if(res.data.error){
        toast.error(res.data.message)
      }
      
      


    }

  return (
    <div className="fixed bottom-0 top-0 left-0 right-0 w-full h-full z-10 flex items-center justify-center bg-slate-100 bg-opacity-40">
      <div className="mx-auto bg-white shadow-md p-2 w-full h-full rounded-lg max-w-3xl max-h-[80%] text-center overflow-hidden ">
        <div className="flex items-center justify-between mx-2 pb-4">
           <h1 className="text-md font-semibold"> Upload Products</h1>
        <button className="text-2xl font-bold" onClick={onClose} >
        <IoClose/>
        </button>
        </div>


        <form onSubmit={handleUploadSubmit} className="grid p-4 gap-2 overflow-y-scroll h-full overflow-x-hidden scrollbar mb-10">
            <label htmlFor="productName" className="mr-auto">Product Name :</label>
            <input  type="text" id="productName" 
            placeholder="Enter Product Name"
            name="productName"
            required
            value={data.productName}
            className="  p-1 bg-slate-100 border rounded"
            onChange={handleAllOnChanges}/>


            <label htmlFor="brandName" className="mr-auto">Brand Name :</label>
            <input type="text" id="brandName" 
            placeholder="Enter Brand Name"
            name="brandName"
            required
            value={data.brandName}
            className="  p-1 bg-slate-100 border rounded"
            onChange={handleAllOnChanges}/>


            <label htmlFor="category" className="mr-auto">Category :</label>
            <select name="category"  value={data.category} onChange={handleAllOnChanges} required className=" p-1 bg-slate-100 border rounded">
            <option value={""}>Select Category</option>
                {
                  productCategory.map((product,index)=>{
                    return(
                      <option key={product.value+index} value={product.value}>{product.label}</option>
                    )
                  })
                }
            </select>

            <label htmlFor="productImage" className="mr-auto">Product Image :</label>
            <label htmlFor="uploadImageInput">
            <div className="p-2 h-40 w-full bg-slate-100 rounded border flex items-center justify-center cursor-pointer">
                
                <div className="text-slate-500 flex items-center justify-center flex-col">
                <MdOutlineCloudUpload size={70}/>
                <h1 className="text-sm ">Upload Product Images Here</h1>
                <input type="file" id="uploadImageInput" required className=" hidden" onChange={handleUploadImageCloudinary}/>
                </div>
                
            </div>
            </label>
            <div className=" flex gap-5  ">
              {
                data?.productImage[0] ?
                (
                  data?.productImage.map((el,index)=>{
                    return(
                      <div className="relative group">

                        <img src={el} alt="el" width={90} height={90}  className=" bg-slate-100" onClick={()=>{setMakeBigIMG(!makeBigIMG);setImgURLForBig(el) }}/>
                        <div className="absolute top-0 right-0 bg-red-600 rounded-full text-white text-lg hidden cursor-pointer group-hover:block"
                         onClick={()=>handleDeleteProductIMG(index)}
                        >
                        <IoClose/>
                          </div>
                      </div>
                        
                      
                    )
                  })
                ):(
                  <p className="text-slate-300">**Please upload Product Image</p>
                ) 
              }
                  
            </div>



            <label htmlFor="price" className="mr-auto ">Price :</label>
            <input type="number" id="price" 
            placeholder="Enter Product Price"
            name="price"
            required
            value={data.price}
            className="required p-1 bg-slate-100 border rounded"
            onChange={handleAllOnChanges}/>


            <label htmlFor="sellingPrice" className="mr-auto ">Selling Price :</label>
            <input type="number" id="sellingPrice" 
            placeholder="Enter Product Actual Selling Price"
            name="sellingPrice"
            required
            value={data.sellingPrice}
            className="required p-1 bg-slate-100 border rounded"
            onChange={handleAllOnChanges}/>

            
            <label htmlFor="description" className="mr-auto">Description :</label>
            <textarea rows={4}  
            placeholder="Enter Product Description"
            name="description"
            required
            value={data.description}
            className="required p-1 h-32 resize-none bg-slate-100 border rounded"
            onChange={handleAllOnChanges}></textarea>


            <button className='bg-red-600 text-lg text-white p-1 rounded-sm cursor-pointer  w-full hover:bg-red-800 hover:scale-110 transition-all mb-10'>
                        Upload Product
            </button>
        </form>
      </div>
      {
        makeBigIMG && <DisplayFullProductImage imgurl={imgURLForBig} onClose={()=>setMakeBigIMG(!makeBigIMG)}/>
      }
    </div>
  );
};

export default UploadProduct;
