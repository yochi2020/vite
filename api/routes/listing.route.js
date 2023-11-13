import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createListingController } from "../controllers/listing.controller.js";
const router = express.Router();

router.post("/create", verifyToken, createListingController);

export default router;
