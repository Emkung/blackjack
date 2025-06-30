import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import User from "./module/user.model.js"

dotenv.config();

const app = express();

app.use(express.json());

app.post("/api/users", async (req, res) => {
    const user = req.body; //user will send this data

    if(!user.username || !user.email || !user.password) {
        return res.status(400).json({success:false, message: "Please provide all fields"});
    }

    const newUser = new User(user);

    try {
        await newUser.save();
        res.status(201).json({ success: true, data:  newUser})
    }catch (error) {
        console.error("Error in Create user:", error.message);
        res.status(500).json({success: false, message: "server Error"});
    }
});

console.log(process.env.MONGO_URI);

app.delete("/api/user/:id", async (req, res) => {
    const {id}=req.params
    try{
        await User.findByIdAndDelete(id);
        res.json(200).json({ success: true, message: "user deleted"});
    }catch (error) {

    }
    console.log("id:", id);
    
})

app.listen(5000, () => {
    connectDB();
    console.log("Server started lol");
});

//9M7K5ocZ7bmS26Js
