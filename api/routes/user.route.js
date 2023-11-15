import express from "express";
import {verifyToken} from "../utils/verifyUser.js"
import { test,updateUserController,deleteUserController, getUserListingsController } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/test", test);
router.post("/update/:id",verifyToken,updateUserController);
router.delete("/delete/:id",verifyToken,deleteUserController)
router.get("/listings/:id",verifyToken,getUserListingsController);

export default router;
