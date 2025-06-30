import mongoose from "mongoose";
import User from "../module/user.model.js";

export const GetUser = async(req, res) => {
    try {
        const users = await User.find({});
        res.status(201).json({ success: true, data: users})
    }catch(error){
        console.log("error in fetching users:", error.message);
        res.status(500).json({success: false, message: "server Error"}); 
    }
};

export const CreateUser = async (req, res) => {
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
};

export const UpdateUser = async(req, res) =>{
    const{id} = req.params;
    const user = req.body;

    try{
       const updateUser = await User.findByIdAndUpdate(id, user, {new:true});
        res.status(201).json({ success: true, data:  updateUser});
    }catch (error){
        res.status(500).json({success: false, message: "server Error"});
    }
};

export const DeleteUser = async (req, res) => {
    const {id}=req.params
    try{
        await User.findByIdAndDelete(id);
        res.json(200).json({ success: true, message: "user deleted"});
    }catch (error) {

    }
    console.log("id:", id);
    
};
