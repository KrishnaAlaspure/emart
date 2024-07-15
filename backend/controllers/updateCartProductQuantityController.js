import AddToCartModel from "../models/addToCartModel.js"

export const updateCartProductQuantityController=async(req,res)=>{
    try {
        const userId=req.userId
        const cartId=req?.body?._id
        const quantity=req?.body?.quantity

        console.log("qty",req?.body?._id,req?.body?.quantity);

        const resData=await AddToCartModel.updateOne({_id:cartId},{...(quantity&&{quantity:quantity})})
        

        return res.json({
            message: "Product are from cart",
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