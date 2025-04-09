import express from "express";
import { createRole, getAllRoles } from "../controllers/roleController.js";

const router = express.Router();

router.get("/", getAllRoles);
router.post("/create", createRole);

export default router;
