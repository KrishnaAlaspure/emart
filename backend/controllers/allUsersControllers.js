import UserModel from "../models/userModel.js";

export const allUsersControllers=async(req,res)=>{
    try {
        const allusers =await UserModel.find()
        console.log("alluser",req.userId);
        res.json({
            message:"All users are here",
            data: allusers,
            success:true,
            error:false
        })

    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false,
          });
    }
}