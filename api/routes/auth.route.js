import express from "express";
import {signup,signInController} from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup",signup);
router.post("/sign-in",signInController);

export default router;
