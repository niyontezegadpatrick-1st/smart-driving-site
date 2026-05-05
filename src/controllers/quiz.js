import Quiz from "../database/model/quiz.js";
import QuizResult from "../database/model/quizResult.js";
import Enrollment from "../database/model/enrollment.js";

export const getQuizByStage = async (req, res) => {
  try {
    const { courseId, stage } = req.params;
    const userId = req.user.id;

    // Check enrollment and stage access
    const enrollment = await Enrollment.findOne({
      where: { userId, courseId, status: "active" },
    });

    if (!enrollment) {
      return res.status(403).json({ error: "You are not enrolled in this course" });
    }

    if (Number(enrollment.currentStage) < Number(stage)) {
      return res.status(403).json({
        error: `You must complete Stage ${enrollment.currentStage} first`,
      });
    }

    const questions = await Quiz.findAll({
      where: { courseId, stage },
      attributes: ["id", "question", "optionA", "optionB", "optionC", "optionD"],
      // correctAnswer is NOT sent to frontend
    });

    if (questions.length === 0) {
      return res.status(404).json({ error: "No quiz found for this stage" });
    }

    res.json({ courseId, stage, questions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const submitQuiz = async (req, res) => {
  try {
    const { courseId, stage } = req.params;
    const { answers } = req.body; // { questionId: "A", questionId: "B", ... }
    const userId = req.user.id;

    // Check enrollment
    const enrollment = await Enrollment.findOne({
      where: { userId, courseId, status: "active" },
    });

    if (!enrollment) {
      return res.status(403).json({ error: "You are not enrolled in this course" });
    }

    // Get all questions with correct answers
    const questions = await Quiz.findAll({ where: { courseId, stage } });

    if (questions.length === 0) {
      return res.status(404).json({ error: "No quiz found for this stage" });
    }

    // Calculate score
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    const score = Math.round((correct / questions.length) * 100);
    const passed = score >= 70; // 70% passing threshold

    // Save result
    await QuizResult.create({
      userId,
      courseId,
      stage,
      score,
      passed,
    });

    if (passed) {
      // Unlock next stage if passed
      if (stage === "3") {
        await enrollment.update({ status: "completed", completedAt: new Date() });
      } else {
        const nextStage = String(Number(stage) + 1);
        await enrollment.update({ currentStage: nextStage });
      }

      return res.json({
        message: `You passed! Score: ${score}% ✅`,
        score,
        passed: true,
        correct,
        total: questions.length,
      });
    } else {
      return res.json({
        message: `You failed. Score: ${score}%. You need 70% to continue ❌`,
        score,
        passed: false,
        correct,
        total: questions.length,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMyResults = async (req, res) => {
  try {
    const userId = req.user.id;

    const results = await QuizResult.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin only - add quiz questions
export const createQuizQuestion = async (req, res) => {
  try {
    const { courseId, stage, question, optionA, optionB, optionC, optionD, correctAnswer } = req.body;

    const quiz = await Quiz.create({
      courseId,
      stage,
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
    });

    res.status(201).json({ message: "Question created successfully", quiz });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin only - delete question
export const deleteQuizQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const quiz = await Quiz.findByPk(id);
    if (!quiz) {
      return res.status(404).json({ error: "Question not found" });
    }

    await quiz.destroy();
    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};