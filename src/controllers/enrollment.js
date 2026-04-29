import Enrollment from "../database/model/enrollment.js";
import Course from "../database/model/course.js";
import User from "../database/model/users.js";

export const createEnrollment = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if course exists and is active
    const course = await Course.findByPk(courseId, {
      where: { isActive: true },
    });
    if (!course) {
      return res.status(404).json({ error: "Course not found or inactive" });
    }

    // Check if enrollment already exists
    const existingEnrollment = await Enrollment.findOne({
      where: { userId, courseId },
    });
    if (existingEnrollment) {
      return res.status(400).json({ error: "Already enrolled in this course" });
    }

    const enrollment = await Enrollment.create({ userId, courseId });

    res.status(201).json({
      message: "Enrollment created successfully",
      enrollment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: Course, attributes: ["id", "title"] },
      ],
    });

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEnrollmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const enrollment = await Enrollment.findByPk(id, {
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
    res.status(500).json({ error: error.message });
  }
};

export const updateEnrollmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const enrollment = await Enrollment.findByPk(id);
    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found" });
    }

    await enrollment.update({ status });

    res.json({
      message: "Enrollment status updated successfully",
      enrollment,
    });
  } catch (error) {
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
    res.status(500).json({ error: error.message });
  }
};