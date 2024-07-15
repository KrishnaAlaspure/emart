import ProductModule from '../models/productModel.js'

export const filterProductController=async(req,res)=>{
    try {

        const categoryList=req?.body?.filterCategoryList ||[]
        console.log("filterc",req?.body?.filterCategoryList);
        const resData=await ProductModule.find({
            category:{
                "$in": categoryList
            }
        })
        return res.json({
            message: "All products from filter",
            error : false,
            success : true,
            data:resData
        })


    } catch (error) {
        res.json({
            message: error.message || error,
            error : true,
            success : false
        })
    }
}