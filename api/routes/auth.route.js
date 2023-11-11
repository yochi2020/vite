import express from "express";
import {signup,signInController, googleController} from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup",signup);
router.post("/sign-in",signInController);
router.post("/google",googleController)

export default router;
