import Enrollment from "../database/model/enrollment.js";
import Course from "../database/model/course.js";
import User from "../database/model/users.js";
import QuizResult from "../database/model/quizResult.js";

export const createEnrollment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;

    console.log("userId:", userId, "courseId:", courseId);

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const course = await Course.findOne({
      where: { id: Number(courseId), isActive: true },
    });
    if (!course) {
      return res.status(404).json({ error: "Course not found or inactive" });
    }

    const existingEnrollment = await Enrollment.findOne({
      where: { userId, courseId: Number(courseId) },
    });
    if (existingEnrollment) {
      return res.status(400).json({ error: "Already enrolled in this course" });
    }

    const enrollment = await Enrollment.create({
      userId,
      courseId: Number(courseId),
      currentStage: "1",
      isPaid: course.price == 0 ? true : false,
      status: course.price == 0 ? "active" : "pending",
    });

    res.status(201).json({
      message: "Enrolled successfully",
      enrollment,
    });
  } catch (error) {
    console.error("Enrollment error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Course,
          attributes: ["id", "title", "description", "stage"],
        },
      ],
    });

    res.json(enrollments);
  } catch (error) {
    console.error("getMyEnrollments error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getEnrollmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const enrollment = await Enrollment.findOne({
      where: { id, userId: req.user.id },
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: Course, attributes: ["id", "title", "description"] },
      ],
    });

    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found" });
    }

    res.json(enrollment);
  } catch (error) {
    console.error("getEnrollmentById error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const unlockNextStage = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const userId = req.user.id;

    const enrollment = await Enrollment.findOne({
      where: { id: enrollmentId, userId },
    });

    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found" });
    }

    const currentStage = enrollment.currentStage;

    const quizResult = await QuizResult.findOne({
      where: {
        userId,
        courseId: enrollment.courseId,
        stage: currentStage,
        passed: true,
      },
    });

    if (!quizResult) {
      return res.status(403).json({
        error: `You must pass the Stage ${currentStage} quiz before continuing`,
      });
    }

    if (currentStage === "3") {
      await enrollment.update({ status: "completed", completedAt: new Date() });
      return res.json({ message: "Congratulations! You completed the course! 🎉" });
    }

    const nextStage = String(Number(currentStage) + 1);
    await enrollment.update({ currentStage: nextStage });

    res.json({
      message: `Stage ${nextStage} unlocked!`,
      currentStage: nextStage,
    });
  } catch (error) {
    console.error("unlockNextStage error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: Course, attributes: ["id", "title"] },
      ],
    });

    res.json(enrollments);
  } catch (error) {
    console.error("getAllEnrollments error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteEnrollment = async (req, res) => {
  try {
    const { id } = req.params;

    const enrollment = await Enrollment.findByPk(id);
    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found" });
    }

    await enrollment.destroy();
    res.json({ message: "Enrollment deleted successfully" });
  } catch (error) {
    console.error("deleteEnrollment error:", error.message);
    res.status(500).json({ error: error.message });
  }
};