import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './Routes/userRoute.js';
import productRouter from './Routes/productRoute.js';
import cartRouter from './Routes/cartsRoute.js';
import orderRouter from './Routes/orderRoute.js';

const app=express()
const port=process.env.PORT||4000
connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());

//Api Endpoints
app.get('/',(req,res)=>{
    res.send("API WORKING")
})
app.use('/api/user',userRouter)
app.use('/api/user/login',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.listen(port,()=>{
    console.log(`Server started on ${port}`)
})