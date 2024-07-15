
import AddToCartModel from "../models/addToCartModel.js"

export const countAddtoCartItems=async(req,res)=>{
    try {

        const userId=req?.userId

        const  count =await AddToCartModel.countDocuments({userId:userId})
        return res.json({
            message: 'Count of cart products',
            error : false,
            success : true,
            data : {count:count}
        })
    } catch (error) {
        res.json({
            message: error.message || error,
            error : true,
            success : false
        })
    }
}