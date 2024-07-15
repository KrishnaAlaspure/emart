import AddToCartModel from "../models/addToCartModel.js";

export const addToCartController=async(req,res)=>{
    try {
        const userId = req?.userId;
        console.log("addtocart pid",req.userId);
        const productId =req?.body?.productId

        console.log("addtocart pid",req?.body);
        
        const isProductAvailable =await AddToCartModel.findOne({productId:productId})

        if(isProductAvailable){
            return res.json({
                message: "Product is already present",
                error : false,
                success : true
            })
        }

        const Data = new AddToCartModel({productId:productId,quantity:1,userId:userId})
        const resData =await Data.save()

        return res.json({
            message: "Product is added to cart",
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