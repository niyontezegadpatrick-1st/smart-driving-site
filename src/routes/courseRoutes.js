import express from "express";
import * as courseController from "../controllers/course.js";

const router = express.Router();

router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
router.get("/category/:category", courseController.getCoursesByCategory);
router.get("/practice/test", courseController.getPracticeTests);
router.get("/category/traffic-rules", courseController.getTrafficRules);
router.get("/category/road-safety", courseController.getRoadSafety);

export default router;