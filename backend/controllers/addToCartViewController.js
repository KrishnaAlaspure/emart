import AddToCartModel from "../models/addToCartModel.js"

export const addToCartViewController=async(req,res)=>{
    try {

        const userId =req?.userId

        const resData=await AddToCartModel.find({userId:userId}).populate('productId')
        
        return res.json({
            message: "Product are from cart",
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