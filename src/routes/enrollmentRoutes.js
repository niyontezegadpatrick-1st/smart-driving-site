import express from "express";
import * as enrollmentController from "../controllers/enrollment.js";
import authenticate from "../middleware/auth.js";
import requireRole from "../middleware/role.js";

const router = express.Router();

// Student
router.post("/", authenticate, enrollmentController.createEnrollment);
router.get("/my", authenticate, enrollmentController.getMyEnrollments);
router.get("/:id", authenticate, enrollmentController.getEnrollmentById);
router.put("/:enrollmentId/unlock", authenticate, enrollmentController.unlockNextStage);

// Admin only
router.get("/", authenticate, requireRole("admin"), enrollmentController.getAllEnrollments);
router.delete("/:id", authenticate, requireRole("admin"), enrollmentController.deleteEnrollment);

export default router;