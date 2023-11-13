import express from "express";
import {verifyToken} from "../utils/verifyUser.js"
import { test,updateUserController } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/test", test);
router.post("/update/:id",verifyToken,updateUserController);

export default router;
