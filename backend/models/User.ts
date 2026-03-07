import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Traveller', 'Vendor', 'Guide', 'Admin'],
        required: true
    },
    ecoscore: {
        type: Number,
        default: 0
    },
    verified: {
        type: Boolean,
        default: false
    }
});


const User = mongoose.model("User", userSchema);

export default User;
