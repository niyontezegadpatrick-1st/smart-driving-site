import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const Quiz = sequelize.define(
  "Quiz",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "courses", key: "id" },
    },
    stage: {
      type: DataTypes.ENUM("1", "2", "3"),
      allowNull: false,
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    optionA: { type: DataTypes.STRING, allowNull: false },
    optionB: { type: DataTypes.STRING, allowNull: false },
    optionC: { type: DataTypes.STRING, allowNull: false },
    optionD: { type: DataTypes.STRING, allowNull: false },
    correctAnswer: {
      type: DataTypes.ENUM("A", "B", "C", "D"),
      allowNull: false,
    },
  },
  {
    tableName: "quizzes",
    timestamps: true,
  }
);

export default Quiz;