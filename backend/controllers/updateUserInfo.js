import UserModel from "../models/userModel.js";

export  const  updateUserInfo=async(req,res)=>{
    try {
        const loggedInUser =req.userId
        console.log("logg",loggedInUser);
        const{updateUserID,updateName,updateEmail,updateRole}=req.body;
        console.log("userID",updateUserID);

        const checkUserAdmin =await UserModel.findById(loggedInUser)
        //console.log("Logged in user data",checkUserAdmin);
        const resdata= await UserModel.findByIdAndUpdate({_id:updateUserID},{name:updateName,email:updateEmail,role:updateRole},{new:true})
        console.log(resdata);
        return res.status(200).json({
            message: "User Info updated",
            error: false,
            success: true,
            data: resdata
          });
        
        
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false,
          });
    }
}