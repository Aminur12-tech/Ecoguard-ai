import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose  from 'mongoose';
import authRoute from './routes/auth';


const app =  express();
app.use(cors());
app.use(express.json());
dotenv.config();

mongoose.connect(process.env.MONGO_URI!).then(() => {
    console.log("Connected to MongoDB");
}).catch((error)=> {
    console.error("Error connecting to MongoDB:", error);
});   


app.use('/api/auth', authRoute);

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});