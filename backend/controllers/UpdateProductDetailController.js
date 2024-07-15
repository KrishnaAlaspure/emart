import mongoose from "mongoose";
import { adminPermission } from "../helper/adminPermission.js";
import ProductModel from "../models/productModel.js";

export const UpdateProductDetailController=async(req,res)=>{
    try {

        const loggedInUser =req.userId

        // if(!adminPermission(loggedInUser)){
        //     throw new Error("Permission denied ! You are not Admin")
        // }

        
        const {_id}=req
        const {...resBodyData}=req?.body?.data
        console.log(mongoose.Types.ObjectId.isValid(req.body.data.pid)); 
        console.log("update",req.body.data.pid);
        
        const updateProduct = await ProductModel.findByIdAndUpdate({_id:resBodyData?.pid},{productName:resBodyData.productName,brandName:resBodyData.brandName,category:resBodyData.category,productImage:resBodyData.productImage,description:resBodyData.description,price:resBodyData.price,sellingPrice:resBodyData.sellingPrice},{new:true})
        res.status(200).json({
            message: "Product Uploaded",
            error: false,
            success: true,
            data: updateProduct
          });
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
          });
    }
}