import ProductModel from "../models/productModel.js";


export const deleteProductController=async(req,res)=>{
    try {
        const productID=req.params.pid
        console.log("deleted",req.params.pid);
        const resData=await ProductModel.findByIdAndDelete(productID)
        return res.status(200).json({
            message: "User Deleted",
            error: false,
            success: true,
            data: resData
          });
    } catch (error) {
        return res.json({
            message: error.message || error,
            error: true,
            success: false,
          });
    }
}