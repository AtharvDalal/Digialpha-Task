import express from "express";
import {
  registerUser,
  getUserById,
  updateUser,
  listUsers,
  deleteUser,
} from "../controllers/userController.js";
import { checkRole } from "../middleware/checkRole.js";
import { verifyToken } from "../services/authService.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/allusers", listUsers);

router.put("/:id", verifyToken, checkRole("admin"), updateUser);

router.get("/:id", verifyToken, checkRole("user"), getUserById);

router.delete("/:id/delete", verifyToken, checkRole("admin"), deleteUser);

export default router;
