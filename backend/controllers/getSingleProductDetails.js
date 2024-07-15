import ProductModel from '../models/productModel.js'

export const getSingleProductDetails=async(req,res)=>{
    try {
        const productId=req.body.prodId
        console.log("ProdID",productId);
        const  product =await ProductModel.findById({_id:productId})

        res.json({
            data : product,
            message : 'Product Details',
            error : false,
            success : true
        })

        
    } catch (error) {
        res.json({
            message : error?.message || error,
            error : true,
            success : false
        })
    }
}