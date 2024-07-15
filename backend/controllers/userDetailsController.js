import UserModel from "../models/userModel.js";

export const userDetailsController = async (req, res) => {
    try {
        console.log("userID",req.userId);

        const user=await UserModel.findById(req.userId)
        
        
            res.status(200).json({
                data:user,
                error:false,
                success:true,
                message:"user data"
            })
        
        
    } catch (error) {
        return res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
          });
    }
};