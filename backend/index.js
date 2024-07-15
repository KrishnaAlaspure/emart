import express from 'express'
import dotenv from 'dotenv'
import connectToDB from './db/db.js'
import cors from 'cors'
import userRoute from './routes/userRoute.js'
import cookieParser from 'cookie-parser'
import allUsersRoutes from './routes/allUsersRoutes.js'
import adminProductsRoute from './routes/adminProductsRoute.js'
import productRoute from './routes/productRoutes.js'
import addToCartRoute from './routes/addToCartRoute.js'


dotenv.config()
const app=express()
const PORT =process.env.PORT || 4000;



app.use(express.json())
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
app.use(cookieParser())


app.use('/api',userRoute)
app.use('/api',allUsersRoutes)
app.use('/api',adminProductsRoute)
app.use('/api',productRoute)
app.use('/api',addToCartRoute)


app.get("/",(req,res)=>{
    console.log("Hello");
    res.status(200).json({
        message:"Hello get method"
    })
})


app.listen(PORT,()=>{
    connectToDB()
    console.log(`Server is runnning on ${PORT}`);
    console.log(`http://localhost:${PORT}/`);
})
