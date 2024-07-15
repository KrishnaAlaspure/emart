import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        minlength:6
    },
    profilePicture:{
        type:String
    },
    role:{
        type:String
    }
},{timestamps:true})

const UserModel=mongoose.model("User",userSchema);
export default UserModel;