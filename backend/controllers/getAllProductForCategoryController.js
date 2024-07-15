import ProductModel from "../models/productModel.js";

export const getAllProductForCategoryController=async(req,res)=>{
    try {
        const resCategory=req?.body.category || req?.query
        console.log("resCategory",resCategory);
        const product = await ProductModel.find({category:resCategory})
        //console.log("product=======",product);
        return res.json({
            message: "Product for specific category ",
            error: false,
            success: true,
            data: product
          });

    } catch (error) {
        return res.json({
            message: error.message || error,
            error: true,
            success: false,
          });
    }
}