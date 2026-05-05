import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import sequelize, { createDatabaseIfNotExists } from "../config/db.js";

// Routes
import userRoutes from "../routes/userRoutes.js";
import courseRoutes from "../routes/courseRoutes.js";
import enrollmentRoutes from "../routes/enrollmentRoutes.js";
import quizRoutes from "../routes/quizRoutes.js";
import paymentRoutes from "../routes/paymentRoutes.js";

// Models
import User from "./model/users.js";
import Course from "./model/course.js";
import Enrollment from "./model/enrollment.js";
import Quiz from "./model/quiz.js";
import QuizResult from "./model/quizResult.js";

// Associations
User.hasMany(Enrollment, { foreignKey: "userId" });
Enrollment.belongsTo(User, { foreignKey: "userId" });

Course.hasMany(Enrollment, { foreignKey: "courseId" });
Enrollment.belongsTo(Course, { foreignKey: "courseId" });

Course.hasMany(Quiz, { foreignKey: "courseId" });
Quiz.belongsTo(Course, { foreignKey: "courseId" });

User.hasMany(QuizResult, { foreignKey: "userId" });
QuizResult.belongsTo(User, { foreignKey: "userId" });

Course.hasMany(QuizResult, { foreignKey: "courseId" });
QuizResult.belongsTo(Course, { foreignKey: "courseId" });

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Smart Driving Site API", version: "1.0.0" });
});

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/payments", paymentRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await createDatabaseIfNotExists();
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync({ alter: true });
    console.log("Database synchronized");

    app.listen(PORT, () => {
      console.log("Database connected successfully 🔥🔥🔥🔥🔥🔥");
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();