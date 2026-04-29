import Course from "../database/model/course.js";

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      where: { isActive: true },
      attributes: ["id", "title", "description", "category", "price", "createdAt"],
    });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id, {
      where: { isActive: true },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCoursesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const courses = await Course.findAll({
      where: { category, isActive: true },
      attributes: ["id", "title", "description", "category", "price", "createdAt"],
    });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPracticeTests = async (req, res) => {
  try {
    const courses = await Course.findAll({
      where: { category: "practice_test", isActive: true },
    });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTrafficRules = async (req, res) => {
  try {
    const courses = await Course.findAll({
      where: { category: "traffic_rules", isActive: true },
    });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRoadSafety = async (req, res) => {
  try {
    const courses = await Course.findAll({
      where: { category: "road_safety", isActive: true },
    });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    const { title, description, content, category, price } = req.body;

    const course = await Course.create({ title, description, content, category, price });

    res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, content, category, price, isActive } = req.body;

    const course = await Course.findByPk(id);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    await course.update({ title, description, content, category, price, isActive });

    res.json({
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findByPk(id);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    await course.destroy();

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};