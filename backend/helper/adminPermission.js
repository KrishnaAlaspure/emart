import UserModel from "../models/userModel.js";

export const adminPermission=async(userID)=>{
    const user = await UserModel.findById(userID)
    if(user.role != 'ADMIN'){
        return false
    }
    return true


}