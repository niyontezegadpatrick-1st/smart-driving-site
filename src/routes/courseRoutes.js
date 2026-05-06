import express from "express";
import * as courseController from "../controllers/course.js";
import authenticate from "../middleware/auth.js";
import requireRole from "../middleware/role.js";

const router = express.Router();

router.get("/", courseController.getAllCourses);
router.get("/category/:category", courseController.getCoursesByCategory);
router.get("/practice/test", courseController.getPracticeTests);
router.get("/:id", courseController.getCourseById);
router.post("/", authenticate, requireRole("admin"), courseController.createCourse);
router.put("/:id", authenticate, requireRole("admin"), courseController.updateCourse);
router.delete("/:id", authenticate, requireRole("admin"), courseController.deleteCourse);

export default router;