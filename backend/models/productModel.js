import mongoose from "mongoose";



const productSchema= new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    brandName:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    productImage:{
        type:[],
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    sellingPrice:{
        type:Number,
        required:true
    }
},{timestamps:true})

const ProductModel=mongoose.model("Product",productSchema);
export default ProductModel;
