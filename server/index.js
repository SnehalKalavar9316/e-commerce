import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken'

import { postSignup,postLogin } from './controllers/user.js';
import {postProducts, getProducts} from "./controllers/products.js";
import {postOrders,putOrders} from './controllers/orders.js';


const app = express();
app.use(express.json());
app.use(cors());

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    if (conn) {
        console.log("MongoDB connected succefully");
    }
}

app.get('/health',(req,res) =>{
    res.json({
        success:true,
        message:"Server is running"
    })

})

app.post('/signup',postSignup)

app.post('/login',postLogin)

//Product APIs

app.post("/products",postProducts)


app.get('/products', getProducts)

app.post('/orders',postOrders)

app.put('/orders/:id',putOrders)



app.get('/test',(req,res) =>{
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({
            success:false,
            message:"unothorized",
        })
    }

    const tokenValue = token.split("")[1];
    const decode = jwt.verify(tokenValue, process.env.JWT_SECRET);

    if(decode){
        return res.json({
            success:true,
            message:"token is valid",
            data:decode,
        })
    }
    else{
        return res.json({
            success:false,
            message:"token is invalid",
        })
    }
})














const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is running on port ${PORT}");
    connectDB();
})