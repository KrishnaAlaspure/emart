import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import Context from "../contextAPI/contextIndex";
import { AddToCart } from "../helper/AddToCart";
import IndianCurrencyConverter from "../helper/IndianCurrencyConverter";

const SearchProductList = ({data=[],loading}) => {
    const loadingcart = new Array(13).fill(null);
    const context=useContext(Context)

    const handleAddToCart=async(e,id)=>{
        await AddToCart(e,id);
       context.fetchAddToCartCount()
    }
    return(

        <div className="contianer mx-auto px-4 my-4 h-full relative  ">
   
    <div className=" grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] mt-4 justify-center  md:justify-between  md:gap-4 items-center overflow-y-hidden  overflow-x-scroll scroll-smooth no-scrollbar transition-all ">
      {loading
        ? loadingcart?.map((el, index) => {
            return (
              <div
                key={index}
                className="w-full min-w-[320px] md:min-w-[320px] max-w-[320px] md:max-w-[320px] bg-white rounded-xl shadow-md "
              >
                <div className="bg-slate-300 h-44 min-w-[120px] md:min-w-[145px] p-4 rounded-t-xl flex justify-center items-center"></div>
                <div className="p-2 px-4 my-2 flex flex-col w-full gap-2">
                  <div className="bg-gray-200 p-1 rounded  text-black w-full mr-2 ">
                    <h2 className="font-medium text-base text-ellipsis line-clamp-1 p-2 bg-slate-300   md:text-sm"></h2>
                  </div>
                  <h2 className="text-gray-800 p-2 bg-slate-300"></h2>
                  <div className="flex gap-2 w-full">
                    <p className="text-red-500 font-semibold p-2 bg-slate-300"></p>
                    <p className="  text-slate-600 line-through p-2 bg-slate-300"></p>
                  </div>
                  <button className="p-2 bg-slate-300 text-white text-lg rounded-full mb-2 animate-pulse"></button>
                </div>
              </div>
            );
          })
        : data?.map((el, index) => {
            return (
              <Link
                to={"/productDetailCart/" + el?._id}
                onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}
                key={index}
                className="w-full min-w-[320px] md:min-w-[300px] max-w-[320px] md:max-w-[300px] bg-white rounded-xl shadow-md "
              >
                <div className="bg-slate-300 h-44 min-w-[120px] md:min-w-[145px] p-4 rounded-t-xl flex justify-center items-center">
                  <img
                    src={el.productImage[0]}
                    alt=""
                    className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply "
                  />
                </div>
                <div className="p-2 px-4 my-2 flex flex-col gap-1">
                  <div className="bg-gray-200 p-1 rounded  text-black w-full mr-2 ">
                    <h2 className="font-medium text-base text-ellipsis line-clamp-1    md:text-sm">
                      {el.productName}
                    </h2>
                  </div>
                  <h2 className="text-gray-800">{el?.brandName}</h2>
                  <div className="flex gap-2">
                    <p className="text-red-500 font-semibold">
                      {IndianCurrencyConverter(el?.sellingPrice)}
                    </p>
                    <p className="  text-slate-600 line-through">
                      {IndianCurrencyConverter(el?.price)}
                    </p>
                  </div>
                  <button
                    className="bg-red-500 text-white text-lg rounded-full mb-2"
                    onClick={(e)=>handleAddToCart(e,el?._id)}
                  >
                    Add to Cart!
                  </button>
                </div>
              </Link>
            );
          })}
    </div>
  </div>
    )

}

export default SearchProductList
