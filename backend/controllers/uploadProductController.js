import { adminPermission } from "../helper/adminPermission.js";
import ProductModel from "../models/productModel.js";

export const uploadProductController=async(req,res)=>{
    try {

        const loggedInUser =req.userId

        if(!adminPermission(loggedInUser)){
            throw new Error("Permission denied ! You are not Admin")
        }

        console.log(req.body.data);
        const uploadProduct= new ProductModel(req.body.data)
        const saveProduct= await uploadProduct.save()
        res.status(200).json({
            message: "Product Uploaded",
            error: false,
            success: true,
            data: saveProduct
          });
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
          });
    }
}