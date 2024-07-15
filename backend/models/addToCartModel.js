import mongoose from "mongoose";



const addToCartSchema= new mongoose.Schema({
    productId:{
        ref:'Product',
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    userId:{
        type:String,
    }
    },{timestamps:true})

const AddToCartModel=mongoose.model("AddToCart",addToCartSchema);
export default AddToCartModel;
