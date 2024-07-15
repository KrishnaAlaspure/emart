import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import summaryAPIs from "../utils/summaryAPIs.js";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import { Discount } from "../helper/Discount.js";
import IndianCurrencyConverter from "../helper/IndianCurrencyConverter.js";
import HorizontolProductCart from "./HorizontolProductCart.jsx";
import VerticalProductCart from "./VerticalProductCart.jsx";
import { AddToCart } from "../helper/AddToCart.js";
import SuggestionProducts from "./SuggestionProducts.jsx";
import Context from "../contextAPI/contextIndex";

const ProductDetialCart = () => {
  const context=useContext(Context)
  const navigate=useNavigate()
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState();
  const [zoomImg, setZoomImg] = useState(false);
  const [activeImgZoom,setActiveImgZoom]=useState({
    x:0,
    y:0
  })

  const productImgLoading = new Array(4).fill(null);

  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const prodId = params.prodId;
  console.log("ProductId", prodId);
  const fetchProduct = async () => {
    setLoading(true);

    const res = await axios.post(summaryAPIs.getSingleProductDetails.URL, {
      prodId,
    });
    //console.log("Single Product Details", res.data.data);
    setData({
      productName: res?.data?.data?.productName,
      brandName: res?.data?.data?.brandName,
      category: res?.data?.data?.category,
      productImage: res?.data?.data?.productImage,
      description: res?.data?.data?.description,
      price: res?.data?.data?.price,
      sellingPrice: res?.data?.data?.sellingPrice,
    });
    setActiveImg(data?.productImage[0])
    setLoading(false);
    console.log("Single Product Details data", data);
    setActiveImg(data?.productImage[0])
  };
  
  useEffect(() => {
    fetchProduct();
    setActiveImg(data?.productImage[0])
  }, [params]);

  const handleImageHover = (imgUrl) => {
    setActiveImg(imgUrl);
  };

  const handleZoomEffect=(e)=>{
    setZoomImg(true)
    const {left,top,width,height}=e.target.getBoundingClientRect()
    console.log(e.target.getBoundingClientRect());
    const x= (e.clientX -left)/width
    const y= (e.clientY -top)/height
    setActiveImgZoom({x,y})
    
  }

  useCallback(()=>{
    
    handleZoomEffect()
},[activeImgZoom])

  const handleLeaveImageZoom = ()=>{
    setZoomImg(false)
  }

  const handleAddToCart=async(e,id)=>{
    await AddToCart(e,id);
   context.fetchAddToCartCount()
}

const handleBuy=async(e,id)=>{
  await AddToCart(e,id);
 context.fetchAddToCartCount()
 navigate('/cart')
}

  return (
    <div className="container mx-auto p-2 mt-4">
      <div className=" min-h-[180px] flex flex-col md:flex md:flex-row gap-6">
        {/* Product image */}
        <div className=" h-96 flex flex-col items-center  md:flex md:flex-row-reverse gap-2">
          <div className="h-[300px] w-[300px] md:h-96 md:w-96 bg-white rounded relative">
            {
              loading ?
              (<div
                className="h-full w-full object-scale-down mix-blend-multiply p-2 rounded animate-pulse bg-slate-300 "
              />)
              :
              (
                <>
                <img
              src={activeImg || data?.productImage[0]}
              alt=""
              className="h-full w-full object-scale-down mix-blend-multiply rounded cursor-crosshair" onMouseMove={(e)=>handleZoomEffect(e)} onMouseLeave={handleLeaveImageZoom}/>
             
            <div>
            {
              zoomImg &&
              <div className=" hidden md:block absolute overflow-hidden bg-slate-200 min-w-[500px] min-h-[400px] top-0 -right-[510px] ">
              <div className="w-full h-full min-w-[500px] min-h-[400px]  mix-blend-multiply scale-150 " style={{background :`url(${activeImg})`, backgroundRepeat: 'no-repeat', backgroundPosition : `${(activeImgZoom.x)*100}% ${(activeImgZoom.y)*100}%`}}>

              </div>
              </div>
            
          }
            </div>
                </>
              )
            }
          </div>
          <div className="">
            {loading ? (
              <div className="flex gap-2 md:flex-col justify-end items-center  overflow-scroll no-scrollbar h-full ">
                {productImgLoading.map((el, index) => {
                  return (
                    <div className="h-20 w-20 rounded bg-slate-300 animate-pulse"></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 md:flex-col overflow-scroll no-scrollbar overflow-y-scroll  h-full ">
                {data.productImage.map((el, index) => {
                  return (
                    <div className="h-20  w-20 rounded bg-white" key={index}>
                      <img
                        src={el}
                        alt=""
                        className="w-full h-full object-scale-down mix-blend-multiply rounded cursor-pointer "
                        onClick={() => handleImageHover(el)}
                        onMouseEnter={() => handleImageHover(el)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Product Description */}
        {
          loading ?
          (<div className="flex flex-col gap-2">
            <p className=" text-2xl md:text-3xl p-4 rounded animate-pulse bg-slate-300 text-black">
              
            </p>
            <div className="flex gap-4 items-center">
              <p className="text-md font-normal p-2  rounded animate-pulse bg-slate-300 w-fit ">
               
              </p>
              <p className="text-md text-slate-500 p-2 rounded animate-pulse bg-slate-300 capitalize">
                
              </p>
            </div>
            
            <div className="flex text-md text-yellow-400 mt-2 gap-0.5 ">
              <p className="text-sm text-black p-4 rounded  bg-slate-300 animate-pulse "></p>
              
            </div>
            <p className="border-b border-gray-400 p-1 w-full animate-pulse"></p>
            <div>
              <div className="flex gap-2">
                <p className="text-red-500 text-2xl p-4 rounded animate-pulse bg-slate-300 ">
                  
                </p>
                <p className="text-2xl p-4 rounded animate-pulse bg-slate-300 font-medium">
                 
                </p>
              </div>
              <div className="flex text-lg gap-2  ">
                <p className="px-2  rounded  bg-slate-300 my-1 animate-pulse" > </p>
                <p className="line-through text-slate-600 p-4 rounded my-1 bg-slate-300 animate-pulse">
                  
                </p>
              </div>
              <p className="text-md font-medium p-2 my-1 rounded  bg-slate-300 animate-pulse"></p>
            </div>
            <p className="border-b border-gray-400 p-1 mb-1 w-full animate-pulse"></p>
            <div className=" flex gap-2 mt-4">
              <button className="p-2 my-1   bg-slate-300 text-white text-md  min-w-[120px] animate-pulse rounded-full hover:bg-red-700  transition-all">
                
              </button>
              <button className="p-4 my-1  bg-slate-300 text-white text-md min-w-[120px] animate-pulse rounded-full hover:bg-yellow-600  transition-all">
                
              </button>
  
            </div>
            <p className="ml-4 p-2 my-1 rounded  bg-slate-300  animate-pulse"> </p>
            <p className="border-b border-gray-400 p-1 w-full animate-pulse"></p>
            <div className="mt-2">
              <h2 className="text-xl p-2 my-1 rounded  bg-slate-300 animate-pulse"></h2>
              <p className="p-2 my-1 rounded  bg-slate-300 w-full animate-pulse"></p>
            </div>
          </div>)
          :
          (
            <div>
          <p className=" text-2xl md:text-3xl py-1 text-black">
            {data?.productName}
          </p>
          <div className="flex gap-4 items-center">
            <p className="text-md font-normal bg-yellow-400 rounded w-fit px-1">
              {data?.brandName}
            </p>
            <p className="text-md text-slate-500 capitalize">
              {data?.category}
            </p>
          </div>
          
          <div className="flex text-md text-yellow-400 mt-2 gap-0.5">
            <p className="text-sm text-black">4.5</p>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalf />
          </div>
          <p className="border-b border-gray-400 p-1 w-full"></p>
          <div>
            <div className="flex gap-2">
              <p className="text-red-500 text-2xl">
                {Discount(data?.sellingPrice, data?.price)}%
              </p>
              <p className="text-2xl font-medium">
                {IndianCurrencyConverter(data?.sellingPrice)}
              </p>
            </div>
            <div className="flex text-lg gap-2  ">
              <p>M.R.P. : </p>
              <p className="line-through text-slate-600">
                {IndianCurrencyConverter(data?.price)}
              </p>
            </div>
            <p className="text-md font-medium  ">Inclusive of all taxes</p>
          </div>
          <p className="border-b border-gray-400 p-1 mb-1 w-full"></p>
          <div className=" flex gap-2 mt-4">
            <button className="bg-red-500 text-white text-md px-2 py-1 min-w-[120px] rounded-full hover:bg-red-700  transition-all" onClick={(e)=>handleBuy(e,prodId)}>
              Buy Now
            </button>
            <button className="bg-yellow-500 text-white text-md px-2 py-1 min-w-[120px] rounded-full hover:bg-yellow-600  transition-all" onClick={(e)=>handleAddToCart(e,prodId)}>
              Add to Cart
            </button>

          </div>
          <p className="ml-4 text-slate-600 my-2 ">Fast & Free Delevery </p>
          <p className="border-b border-gray-400 p-1 w-full"></p>
          <div className="mt-2">
            <h2 className="text-xl ">About the product</h2>
            <p className="text-sm">{data?.description}</p>
          </div>
        </div>
          )
        }
      </div>
      {
        data?.category &&
        <SuggestionProducts category={data?.category} heading={'Suggestions'}/>
      }
    </div>
  );
};

export default ProductDetialCart;
