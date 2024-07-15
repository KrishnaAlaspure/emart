import axios from "axios";
import React, { useEffect, useState } from "react";
import summaryAPI from "../utils/summaryAPIs";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const catLoading = new Array(12).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const res = await axios.get(summaryAPI.getProductByCategory.URL);
    // console.log(res.data.data);
    setLoading(false);
    setCategoryProduct(res.data.data);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);
  return (
    <div className="container mx-auto p-2 ">
      <div className="flex justify-between gap-4 items-center overflow-scroll no-scrollbar">
        {loading
          ? catLoading.map((ele, index) => {
              return (
                <div className=" w-16 h-16 p-4 bg-slate-300  md:w-20 md:h-20 rounded-full overflow-hidden flex items-center justify-center animate-pulse " key={index}></div>
              );
            })
            : 
            categoryProduct.map((product, index) => {
              return (
                <Link
                  to={`/productCategory?categoryName=` + product?.category}
                  className="cursor-pointer "
                  key={index}
                >
                  <div className=" w-16 h-16 p-4 bg-slate-300  md:w-20 md:h-20 rounded-full overflow-hidden flex items-center justify-center ">
                    <img
                      src={product?.productImage[0]}
                      alt={product?.productName}
                      className="h-full object-scale-down mix-blend-multiply hover:scale-110 translate-all "
                    />
                  </div>
                  <p className="text-center capitalize  text-xs font-medium">
                    {product?.category}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;
