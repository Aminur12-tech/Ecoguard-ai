import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose  from 'mongoose';
import "./config/cloudinary"; 

import authRoute from './routes/auth';
import ugcRoute from './routes/ugc';
import ecoRoutes from './routes/ecoRoutes';
import homestayRoutes from "./routes/homestayRoutes";
import bookingRoutes from "./routes/booking.routes";
import pricingRoutes from "./routes/pricingRoutes";

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





mongoose.connection.on('connected', () => {
    app.use('/api/auth', authRoute);
    app.use('/api/ugc', ugcRoute);
    app.use('/api/routes', ecoRoutes);
    app.use('/api/homestays', homestayRoutes);
    app.use("/api/bookings", bookingRoutes);
    app.use("/api/pricing", pricingRoutes);
    app.listen(5000, () => {
        console.log("Server is running on port 5000");
    });
})
