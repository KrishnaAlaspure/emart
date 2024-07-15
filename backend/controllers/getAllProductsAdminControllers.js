import ProductModel from "../models/productModel.js";

export const getAllProductsAdminControllers=async(req,res)=>{

    try {
        const allProduct= await ProductModel.find().sort({crreatedAt:-1})
        res.status(200).json({
            message: 'All Products are here',
            error: false,
            success: true,
            data:allProduct
          });
        
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
          });
    }

}