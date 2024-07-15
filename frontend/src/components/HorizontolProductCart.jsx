import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import summaryAPI from "../utils/summaryAPIs";
import fetchProductsByCategory from "../helper/fetchProductsByCategory";
import IndianCurrencyConverter from "../helper/IndianCurrencyConverter";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { AddToCart } from "../helper/AddToCart";
import Context from "../contextAPI/contextIndex";

const HorizontolProductCart = ({ category, heading }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [scroll, setScroll] = useState();
  const context = useContext(Context);

  const scrollElement = useRef();

  const loadingcart = new Array(13).fill(null);
  //const res= await axios.post(summaryAPI.getProductsForCategory.URL,{category})

  const fetchData = async () => {
    setLoading(true);
    const res = await fetchProductsByCategory(category);
    setLoading(false);
    console.log("h", res.data.data);
    setData(res.data.data);
    console.log("data", data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  const handleAddToCart = async (e, id) => {
    await AddToCart(e, id);
    context.fetchAddToCartCount();
  };

  return (
    <div className="contianer mx-auto px-4 my-4 h-full relative ">
      <h2 className="text-2xl font-semibold ">{heading}</h2>
      <div
        className="flex gap-4 md:gap-6 items-center overflow-y-hidden  overflow-x-scroll scroll-smooth no-scrollbar transition-all "
        ref={scrollElement}
      >
        <button
          onClick={scrollLeft}
          className="hover:bg-slate-100 rounded-full absolute left-2 text-2xl hidden md:block "
        >
          {" "}
          <IoIosArrowBack />
        </button>
        <button
          onClick={scrollRight}
          className="hover:bg-slate-100 rounded-full absolute right-2 text-2xl hidden md:block  "
        >
          {" "}
          <IoIosArrowForward />
        </button>
        {loading
          ? loadingcart?.map((el, index) => {
              return (
                <div
                  key={index}
                  className="w-full min-w-[300px] md:min-w-[340px] max-w-[300px] md:max-w-[340px] h-36 bg-white rounded-xl shadow-md flex"
                >
                  <div className="bg-slate-300 h-full min-w-[120px] md:min-w-[145px] p-4 rounded-l-xl"></div>
                  <div className="p-2 px-4 my-2 w-full flex flex-col gap-4">
                    <div className="bg-gray-200 p-1 rounded  text-black w-full ">
                      <h2 className="font-medium text-base text-ellipsis line-clamp-1 bg-slate-300 p-2 md:text-sm"></h2>
                    </div>
                    <h2 className="text-gray-800 bg-slate-300 p-2"></h2>
                    <div className="flex gap-2 w-full">
                      <p className="text-red-500 font-semibold bg-slate-300 p-2"></p>
                      <p className="  text-slate-600 line-through bg-slate-300 p-2"></p>
                    </div>
                    <button className="bg-slate-300 text-white text-lg rounded-full mb-2 p-2 animate-pulse "></button>
                  </div>
                </div>
              );
            })
          : data?.map((el, index) => {
              return (
                <Link
                  to={"productDetailCart/" + el?._id}
                  onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}
                  key={index}
                  className="w-full min-w-[300px] md:min-w-[340px] max-w-[300px] md:max-w-[340px] h-36 bg-white rounded-xl shadow-md flex">
                  <div className="bg-slate-300 h-full min-w-[120px] md:min-w-[145px] p-4 rounded-l-xl">
                    <img
                      src={el.productImage[0]}
                      alt=""
                      className="object-scale-down h-full hover:scale-110 transition-all "
                    />
                  </div>
                  <div className="p-2 px-4 my-2 flex flex-col gap-1">
                    <div className="bg-gray-200 p-1 rounded  text-black w-full ">
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
                      onClick={(e) => handleAddToCart(e, el?._id)}
                    >
                      Add to Cart!
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default HorizontolProductCart;
