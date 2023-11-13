import express from "express";
import {signup,signInController, googleController,signOutController} from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup",signup);
router.post("/sign-in",signInController);
router.post("/google",googleController)
router.get("/sign-out",signOutController);

export default router;
