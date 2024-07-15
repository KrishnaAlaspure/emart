import ProductModel from "../models/productModel.js";

export const searchProductController=async(req,res)=>{

    try {
        const query=req.query.q
        console.log("query==========",query);

        const regex= new RegExp(query,"i","g")

        const resData=await ProductModel.find({
            '$or':[
                {
                    productName:regex
                },
                {
                    category:regex
                }
            ]
        })

        return res.json({
            message: "Search",
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