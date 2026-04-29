import express from "express";
import * as userController from "../controllers/users.js";
import { authenticate } from "../database/seeds/scripts/middleware/auth.js";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", authenticate, userController.getProfile);
router.put("/profile", authenticate, userController.updateProfile);
router.get("/courses", userController.getCourses);
router.get("/courses/:id", userController.getCourseById);

export default router;