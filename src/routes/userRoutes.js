import express from "express";
import * as userController from "../controllers/users.js";
import authenticate from "../middleware/auth.js";
import requireRole from "../middleware/role.js";

const router = express.Router();

// Public
router.post("/register", userController.register);
router.post("/login", userController.login);

// Student
router.get("/profile", authenticate, userController.getProfile);
router.put("/profile", authenticate, userController.updateProfile);

// Admin only
router.get("/", authenticate, requireRole("admin"), userController.getAllUsers);
router.put("/:id/status", authenticate, requireRole("admin"), userController.updateUserStatus);
router.delete("/:id", authenticate, requireRole("admin"), userController.deleteUser);

export default router;