import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose  from 'mongoose';


import authRoute from './routes/auth';
import ugcRoute from './routes/ugc';
import ecoRoutes from './routes/ecoRoutes';


const app =  express();
app.use(cors());
app.use(express.json());
dotenv.config();


async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI!, {
            connectTimeoutMS: 10000,
            socketTimeoutMS: 30000
        });
        console.log("MongoDB connected successfully");

    }catch(error){
        console.error("MongoDB connection error: ", error);
        process.exit(1);
    }
}

connectDB();

console.log("Before cloudinary import, CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
import "./config/cloudinary"; // or wherever you put the config file
console.log("After cloudinary import:", process.env.CLOUDINARY_CLOUD_NAME);  

mongoose.connection.on('connected', () => {
    app.use('/api/auth', authRoute);
    app.use('/api/ugc', ugcRoute);
    app.use('/api/routes', ecoRoutes);

    
    app.listen(5000, () => {
        console.log("Server is running on port 5000");
    });
})
