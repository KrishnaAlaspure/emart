import UserModel from "../models/userModel.js";

export const deleteUserController=async(req,res)=>{
    try {
        const userID=req.params.userID
        console.log("deleted",userID);
        const resData=await UserModel.findByIdAndDelete(userID)
        return res.status(200).json({
            message: "User Deleted",
            error: false,
            success: true,
            data: resData
          });
    } catch (error) {
        return res.json({
            message: error.message || error,
            error: true,
            success: false,
          });
    }
}