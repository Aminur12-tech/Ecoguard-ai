import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import User from '../models/User';

const router = express.Router();

//Register
router.post("/register", async(req, res) => {
    try{
        const { email, password, role } = req.body;
        console.error("Received registration data ", {email, password, role});
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({
            email, 
            password: hashedPassword,
            role
        });
        await user.save();

        const token = jwt.sign({ userId: user._id},'ecogaurd_secret');
        res.status(201).json({ token, user: { _id: user._id, role: user.role } });
    }catch(error){
        console.error("Error registering user:", error);
        res.status(500).json({message: "Error registering user"});
    }
});

export default router;