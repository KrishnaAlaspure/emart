import ProductModel from "../models/productModel.js";


const getCategoryProductController = async(req,res) => {
  try {
    const getAllCategory =await ProductModel.distinct("category")

    const productByCategory =[]

    for (const category of getAllCategory) {

      const product =await ProductModel.findOne({category})

      if(product){
        productByCategory.push(product)
      }
    }
    return res.json({
      message: "Category Product",
      error: false,
      success: true,
      data: productByCategory
    });

  } catch (error) {
    return res.json({
        message: error.message || error,
        error: true,
        success: false,
      });
  }
}

export default getCategoryProductController
