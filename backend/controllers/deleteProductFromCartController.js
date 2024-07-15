import AddToCartModel from "../models/addToCartModel.js"

export const deleteProductFromCartController=async(req,res)=>{
    try {
        const userId=req.userId
        const cartId=req?.params?._id
        

        console.log("del",req?.params?._id);

        const resData=await AddToCartModel.findByIdAndDelete(cartId)
        

        return res.json({
            message: "Product removed from cart",
            error : false,
            success : true,
            data:resData
        })
    } catch (error) {
        return res.json({
            message: error.message || error,
            error : true,
            success : false
        })
    }
}