import express from "express";
import * as enrollmentController from "../controllers/enrollment.js";
import authenticate from "../database/seeds/scripts/middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/", enrollmentController.createEnrollment);

// Protected routes (require authentication)
router.get("/", authenticate, enrollmentController.getEnrollments);
router.get("/:id", authenticate, enrollmentController.getEnrollmentById);

export default router;