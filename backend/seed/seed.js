import mongoose from "mongoose";
import User from "../module/user.model.js";
import users from "./data/test.users.json" with { type: "json" };


const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/test";

const seedDatabase = async () => {
    try{
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");

        await User.deleteMany({});
        await User.insertMany(users);
        console.log("User inserted succesfully");
        
    }catch(error){
        console.error("seeding failed:", error.message);
        process.exit(1);
    }
};

seedDatabase();