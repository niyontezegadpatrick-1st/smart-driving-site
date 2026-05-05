import express from "express";
import * as quizController from "../controllers/quiz.js";
import authenticate from "../middleware/auth.js";
import requireRole from "../middleware/role.js";

const router = express.Router();

// Student
router.get("/:courseId/stage/:stage", authenticate, quizController.getQuizByStage);
router.post("/:courseId/stage/:stage/submit", authenticate, quizController.submitQuiz);
router.get("/my/results", authenticate, quizController.getMyResults);

// Admin only
router.post("/", authenticate, requireRole("admin"), quizController.createQuizQuestion);
router.delete("/:id", authenticate, requireRole("admin"), quizController.deleteQuizQuestion);

export default router;