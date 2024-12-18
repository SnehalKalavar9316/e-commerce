import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


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



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log("Server is running on port ${PORT}");
    connectDB();
})