import express from "express";
import { CreateUser, DeleteUser, GetUser, UpdateUser } from "../controller/user.controller.js";


const router = express.Router();

router.get("/", GetUser);

router.post("/", CreateUser);

router.put("/:id", UpdateUser);

router.delete("/:id", DeleteUser);

export default router;