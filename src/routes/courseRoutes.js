import express from "express";
import * as courseController from "../controllers/course.js";
import authenticate from "../middleware/auth.js";
import requireRole from "../middleware/role.js";

const router = express.Router();

// Public
router.get("/", courseController.getAllCourses);
router.get("/category/:category", courseController.getCoursesByCategory);
router.get("/practice/test", courseController.getPracticeTests);
router.get("/:id", courseController.getCourseById);

export default router;