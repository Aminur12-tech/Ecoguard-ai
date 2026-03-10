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

        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET || "ecogaurd_secret", { expiresIn: "7d"});
        res.status(201).json({ token, user: { _id: user._id, role: user.role } });
    }catch(error){
        console.error("Error registering user:", error);
        res.status(500).json({message: "Error registering user"});
    }
});

//login
router.post("/login", async(req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({message: "Email and password are required"});
    }
    try{
        const user = await User.findOne({ email});
        if(!user){
            return res.status(400).json({message: "Invalid credentials"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Password is incorrect"});
        }
        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET || "ecogaurd_secret", { expiresIn: "7d"});
        res.json({token, user: {_id: user._id, role: user.role}});

    }catch(error){
        console.error("Error logging in user:", error);
        res.status(500).json({message: "Error logging in user"});
    }
});

//logout route (client should handle token deletion, this is just a placeholder)
router.post("/logout", (req, res) => {
    try {
        res.status(200).json({ 
            message: "Logged out successfully",
            token: null 
        });
    } catch (error: any) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Logout failed" });
    }
});

export default router;