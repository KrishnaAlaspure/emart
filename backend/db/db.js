import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()


const connectToDB=async()=>{
    try {
        mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to DB");
        
    } catch (error) {
        console.log(error);
    }
}

export default connectToDB